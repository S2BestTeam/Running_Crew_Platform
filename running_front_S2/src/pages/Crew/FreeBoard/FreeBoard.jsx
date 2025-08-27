import { useMemo, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGetCrewFreeBoardQuery from "../../../queries/useGetCrewFreeBoardQuery";
import { IoSearch } from "react-icons/io5";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { BiSolidChevronRightSquare, BiSolidChevronLeftSquare } from "react-icons/bi";
import usePrincipalQuery from "../../../queries/usePrincipalQuery";
import useGetCrewRoleQuery from "../../../queries/useGetCrewRoleQuery";
import { useCrewStore } from "../../../stores/useCrewStroes";

function FreeBoard() {
  const { crewId } = useCrewStore();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchText = searchParams.get("searchText") || "";
  const [searchInput, setSearchInput] = useState(searchText);
  const size = 10;
  const { data: principalData, isPLoading } = usePrincipalQuery();
  const userId = principalData?.data?.body?.user?.userId;
  const CrewRoleQuery = useGetCrewRoleQuery(userId);

  const crewRole = CrewRoleQuery?.data?.find(
    (role) => String(role.crewId) === String(crewId)
  );
  
  const isCrewMember = !!crewRole;

  useEffect(() => {
    if (!isPLoading) {
      const userId = principalData?.data?.body?.user?.userId;

      if (!userId) {
        alert("로그인 후 이용 부탁드립니다.");
        navigate("/auth/oauth2/signin");
      }
    }
  }, [principalData, navigate]);

  const { data, isLoading, isError } = useGetCrewFreeBoardQuery({ crewId, page, size, searchText });

  const body = data?.data?.body;
  const totalPages = body?.totalPages ?? 1;
  const freeLists = useMemo(() => body?.contents ?? [], [body]);
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

  const handleRegisterOnClick = () => {
    if (!isCrewMember) {
      alert('크루 멤버만 접근 가능합니다. 크루에 가입해주세요.');
      navigate(`/crews/${crewId}`);
      return;
    }
    navigate(`./register`);
  }

  const handlePostOnClick = (freeId) => {
    if (!isCrewMember) {
      alert('크루 멤버만 접근 가능합니다. 크루에 가입해주세요.');
      navigate(`/crews/${crewId}`);
      return;
    }
    if (!freeId) return;
    navigate(`./${freeId}`);
  };


return (
  <div css={s.container}>
    <h2>자유게시판</h2>
    <div css={s.searchBox}>
      <div css={s.inputGroup}>
        <input type="text" placeholder="검색어를 입력하세요." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} css={s.searchInput} />
        <button css={s.searchButton} onClick={handleSearchOnClick}>
          <IoSearch />
        </button>
        <button css={s.registerButton} onClick={handleRegisterOnClick}>
          게시글 등록
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
        </tr>
      </thead>
      <tbody>
        {freeLists.map((board) => (
          <tr key={board.freeId} css={s.tr} onClick={() => handlePostOnClick(board.freeId)}>
            <td css={s.td}>{board.freeId}</td>
            <td css={s.tdTitle}>{board.title}</td>
            <td css={s.td}>{board?.user?.nickname}</td>
            <td css={s.td}>{board.createdAt}</td>
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

export default FreeBoard;
