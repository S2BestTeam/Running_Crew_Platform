/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import usePrincipalQuery from "../../../queries/usePrincipalQuery";
import { IoSearch } from "react-icons/io5";
import { BiSolidChevronLeftSquare, BiSolidChevronRightSquare } from "react-icons/bi";
import useGetCrewRoleQuery from "../../../queries/useGetCrewRoleQuery";
import { useCrewStore } from "../../../stores/useCrewStroes";
import useGetCrewNotoiceQuery from "../../../queries/useGetCrewNoticeQuery";

function Notice() {
  const navigate = useNavigate();
  const { crewId } = useCrewStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchText = searchParams.get("searchText") || "";
  const [searchInput, setSearchInput] = useState(searchText);
  const size = 10;

  const { data: principalData, isSuccess: isPrincipalReady } = usePrincipalQuery();
  const userId = principalData?.data?.body?.user?.userId;

  const CrewRoleQuery = useGetCrewRoleQuery(userId);
  const crewRole = CrewRoleQuery?.data?.find((role) => role.crewId === Number(crewId));

  const isCrewMember = !!crewRole;
  const canRegister = crewRole && [1, 2].includes(crewRole.roleId);

  const { data, isLoading, isError } = useGetCrewNotoiceQuery({
    crewId: Number(crewId),
    page,
    size,
    searchText,
  });

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
            <tr
              key={notice.noticeId}
              onClick={isCrewMember ? () => navigate(`./${notice.noticeId}`) : undefined}
              css={s.tr(isCrewMember)}
            >
              <td css={s.td}>{notice.noticeId}</td>
              <td css={s.tdTitle}>{notice.title}</td>
              <td css={s.td}>{notice?.user?.nickname}</td>
              <td css={s.td}>{notice.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 12,
          alignItems: "center",
          marginTop: 16,
        }}
      >
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