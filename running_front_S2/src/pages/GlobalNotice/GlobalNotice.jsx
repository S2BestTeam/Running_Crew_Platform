/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { BiSolidChevronLeftSquare, BiSolidChevronRightSquare } from "react-icons/bi";
import usePrincipalQuery from "../../queries/usePrincipalQuery";
import useGetGlobalNotoiceQuery from "../../queries/useGetGlobalNoticeQuery";
import useGetGlobalRoleAdminQuery from "../../queries/useGetGlobalRoleAdminQuery";
import MainContainer from "../../components/MainContainer/MainContainer";


function GlobalNotice() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchText = searchParams.get("searchText") || "";
  const [searchInput, setSearchInput] = useState(searchText);
  const size = 10;

  const { data: principalData, isSuccess: isPrincipalReady } = usePrincipalQuery();
  const userId = principalData?.data?.body?.user?.userId;

  const { data: roleData } = useGetGlobalRoleAdminQuery();
  const isAdmin = (roleData === 'ROLE_ADMIN');

  const { data, isLoading, isError } = useGetGlobalNotoiceQuery({
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
    <MainContainer>
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

            {isAdmin && (
              <button onClick={() => navigate('/notice/register')}>공지 등록</button>
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
                onClick={() => navigate(`./${notice.noticeId}`)}
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
    </MainContainer>
  );
}

export default GlobalNotice;