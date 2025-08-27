/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import usePrincipalQuery from "../../../queries/usePrincipalQuery";
import useGetCrewNotoiceQuery from "../../../queries/useGetCrewNoticeQuery";
import { IoSearch } from "react-icons/io5";
import { BiSolidChevronLeftSquare, BiSolidChevronRightSquare } from "react-icons/bi";
import useGetCrewRoleId from "../../../queries/useGetCrewRoleIdQuery";

function Notice({ crewId }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchText = searchParams.get("searchText") || "";
  const [searchInput, setSearchInput] = useState(searchText);
  const size = 10;

  const { data: principalData, isSuccess: isPrincipalReady } = usePrincipalQuery();
  const userId = principalData?.data?.body?.user?.userId;

  const numericCrewId = Number(crewId);

  const {
    data: roleRes,
    isLoading: isRoleLoading,
    isError: isRoleError,
  } = useGetCrewRoleId(numericCrewId);

  const roleId = Number(roleRes?.data?.body);
  const canRegister = !isRoleLoading && [1, 2].includes(roleId);

  const { data, isLoading, isError } = useGetCrewNotoiceQuery({
    crewId: numericCrewId,
    page,
    size,
    searchText,
  });

  // useEffect(() => {
  //   if (roleRes) {
  //     console.log("role raw:", roleRes?.data?.body, typeof roleRes?.data?.body);
  //     console.log("parsed roleId:", roleId, "canRegister:", canRegister);
  //   }
  // }, [roleRes, roleId, canRegister]);


  useEffect(() => {
    if (isPrincipalReady && !userId) {
      alert("로그인 후 이용 부탁드립니다.");
      navigate("/auth/oauth2/signin");
    }
  }, [isPrincipalReady, userId, navigate]);

  const body = data?.data?.body;
  const totalPages = body?.totalPages ?? 1;
  const noticeList = useMemo(() => body?.contents ?? [], [body]);

  const handleSearchOnClick = () => {
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("page", "1");
      p.set("searchText", searchInput);
      return p;
    });
  };

  if (isLoading) return <div>불러오는 중…</div>;
  if (isError) return <div>문제가 발생했어요.</div>;

  const goPage = (next) => {
    const nextPage = Math.min(Math.max(1, next), totalPages);
    setSearchParams({ page: nextPage, searchText });
  };

  return (
    <div css={s.container}>
      <h2>공지사항</h2>

      <div css={s.searchBox}>
        <div css={s.inputGroup}>
          <input
            type="text"
            placeholder="검색어를 입력하세요."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            css={s.searchInput}
          />
          <button css={s.searchButton} onClick={handleSearchOnClick}>
            <IoSearch />
          </button>

          {/* ✅ roleId가 1 또는 2일 때만 버튼 노출 */}
          {canRegister && (
            <button css={s.registerButton} onClick={() => navigate(`./register`)}>
              공지글 등록
            </button>
          )}
        </div>
      </div>

      <table css={s.table}>
        <thead>
          <tr>
            <th css={s.th}>번호</th>
            <th css={s.th}>제목</th>
            <th css={s.th}>작성자</th>
            <th css={s.th}>등록일</th>
          </tr>
        </thead>
        <tbody>
          {noticeList.map((notice) => (
            <tr key={notice.noticeId}>
              <td css={s.td}>{notice.noticeId}</td>
              <td css={s.tdTitle} onClick={() => navigate(`./${notice.noticeId}`)}>
                {notice.title}
              </td>
              <td css={s.td}>{notice?.user?.nickname}</td>
              <td css={s.td}>{notice.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: "flex", justifyContent: "center", gap: 12, alignItems: "center", marginTop: 16 }}>
        <button onClick={() => goPage(page - 1)} disabled={page <= 1}>
          <BiSolidChevronLeftSquare />
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button onClick={() => goPage(page + 1)} disabled={page >= totalPages}>
          <BiSolidChevronRightSquare />
        </button>
      </div>
    </div>
  );
}

export default Notice;
