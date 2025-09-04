/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BiSolidChevronLeftSquare, BiSolidChevronRightSquare } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";
import MainContainer from "../../../components/MainContainer/MainContainer";

import useGetAskBoardQuery from "../../../queries/useGetAskBoardQuery";
import { reqRegisterAnswer } from "../../../api/Admin/adminApi";
import Pagination from "../../../components/Pagination/Pagination";

function AskAnswer() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchText = searchParams.get("searchText") || "";
  const [searchInput, setSearchInput] = useState(searchText);
  const size = 10;

  const { data, isLoading, isError, refetch } = useGetAskBoardQuery({ page, size, searchText });
  const body = data?.data?.body;
  
  const totalPages = body?.totalPages ?? 1;
  const totalElements = body?.totalElements ?? 0;
  const start = (page - 1) * size;
  const askLists = useMemo(() => body?.contents ?? [], [body]);

  const [answers, setAnswers] = useState({});
  const onChangeAnswer = (askId, v) => setAnswers((prev) => ({ ...prev, [askId]: v }));

  const handleRegister = async (askId) => {
    const content = (answers[askId] || "").trim();
    if (!content) {
      alert("내용을 입력하세요.");
      return;
    }
    try {
      await reqRegisterAnswer({ askId, content });
      alert("답변 등록 성공");
      await refetch();
    } catch (e) {
      alert(e?.response?.data?.message ?? "답변 등록 실패");
    }
  };


  const handleSearchOnClick = () => {
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("page", "1");
      p.set("searchText", searchInput);
      return p;
    });
  };

  const goPage = (next) => {
    const nextPage = Math.min(Math.max(1, next), totalPages);
    setSearchParams({ page: String(nextPage), searchText });
  };

  if (isLoading) return <MainContainer>불러오는 중…</MainContainer>;
  if (isError) return <MainContainer>문제가 발생했어요.</MainContainer>;

  return (
    <MainContainer>
      <div css={s.container}>
        <h2>문의 관리 (Admin)</h2>

        <div css={s.searchBox}>
          <div css={s.inputGroup}>
            <input
              type="text"
              placeholder="검색어를 입력하세요."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              css={s.searchInput}
              onKeyDown={(e) => e.key === "Enter" && handleSearchOnClick()}
            />
            <button css={s.searchButton} onClick={handleSearchOnClick}>
              <IoSearch />
            </button>
          </div>
        </div>

        <table css={s.table}>
          <thead>
            <tr>
              <th css={s.th}>번호</th>
              <th css={s.th}>제목</th>
              <th css={s.th}>작성자</th>
              <th css={s.th}>등록일</th>
              <th css={s.th}>답변</th>
              <th css={s.th}>상태</th>
            </tr>
          </thead>
          <tbody>
            {askLists.map((board, index) => {
              const number = totalElements - (start + index);
              const askId = board.askId;

              // ✅ 작성자 이름 (fullName → 닉네임 → fallback)
              const authorName =
                board?.user?.fullName ??
                board?.user?.nickname ??
                board?.nickname ??
                "-";

              // ✅ 등록일 포맷 (예: 2025. 9. 3. 오후 2:58)
              const createdAtText = board?.createdAt
                ? new Date(board.createdAt).toLocaleString("ko-KR", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })
                : "";

              const value = answers[askId] ?? "";

              return (
                <tr key={askId} css={s.tr}>
                  <td css={s.td}>{number}</td>

                  <td
                    css={s.tdTitle}
                    style={{ cursor: "pointer" }}
                    title="문의 상세 보기"
                    onClick={() => navigate(`/ask/${askId}`)}
                  >
                    {board.title}
                  </td>

                  {/* ✅ 작성자 / 시간 */}
                  <td css={s.td}>{authorName}</td>
                  <td css={s.td}>{createdAtText}</td>

                  {/* 답변 입력/등록 */}
                  <td css={s.td} style={{ minWidth: 320 }}>
                    <input
                      type="text"
                      placeholder="답변 내용을 입력하세요"
                      value={value}
                      onChange={(e) => onChangeAnswer(askId, e.target.value)}
                      style={{ width: "100%" }}
                    />
                    <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                      <button onClick={() => handleRegister(askId)}>등록</button>
                      {board.isAnswer && (
                        <span style={{ fontSize: 12, color: "#888" }}>
                          (기존 답변 있음)
                        </span>
                      )}
                    </div>
                  </td>

                  <td css={s.td}>{board.isAnswer ? "답변완료" : "대기"}</td>
                </tr>
              );
            })}

            {askLists.length === 0 && (
              <tr>
                <td className={s.td} colSpan={6} style={{ textAlign: "center", color: "#888" }}>
                  문의가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Pagination
          page={page}                // 1-base 현재 페이지
          totalPages={totalPages}    // 총 페이지 수
          onChange={(p) => goPage(p)}// 페이지 변경 핸들러
          windowSize={1}
        />
      </div>
    </MainContainer>
  );
}

export default AskAnswer;
