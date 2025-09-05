/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useGetCrewListQuery from "../../../queries/useGetCrewListQuery";

import Pagination from "../../../components/Pagination/Pagination";
<<<<<<< HEAD
import CrewDetailModal from "./CrewDetailModal";
=======
import * as s from "./styles";
>>>>>>> origin/118-css-수정본

function SearchCrew() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const searchText = searchParams.get("searchText") || "";
  const [searchInput, setSearchInput] = useState(searchText);
  const [selectedCrew, setSelectedCrew] = useState(null);

  const crewListQuery = useGetCrewListQuery({
    page,
    size: 20,
    searchText,
    gunguId: "",
  });

  if (crewListQuery.isLoading) return <div>Loading...</div>;
  if (crewListQuery.isError) return <div>Error: {crewListQuery.error.message}</div>;

  const crews =
    crewListQuery.data?.pages?.flatMap((p) => p?.data?.body?.contents || []) || [];
  const totalPages =
    crewListQuery.data?.pages?.[0]?.data?.body?.totalPages || 1;

  const handleSearchOnChange = (e) => setSearchInput(e.target.value);

  const handleSearchOnClick = () => {
    setSearchParams({ page: 1, searchText: searchInput });
  };

  const goPage = (next) => {
    const nextPage = Math.min(Math.max(1, next), totalPages);
    setSearchParams({ page: nextPage, searchText });
  };

  return (
    <div css={s.container}>
      {/* 검색 영역 */}
      <div css={s.searchBox}>
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchOnChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearchOnClick()}
          placeholder="크루명 검색"
          css={s.searchInput}
        />
        <button onClick={handleSearchOnClick} css={s.searchButton}>
          검색
        </button>
      </div>

      {/* 테이블 */}
      <div css={s.tableWrapper}>
        <table css={s.table}>
          <thead>
            <tr>
              <th>크루 ID</th>
              <th>썸네일</th>
              <th>크루 이름</th>
              <th>제목</th>
              <th>군구</th>
              <th>상세보기</th>
            </tr>
          </thead>
          <tbody>
            {crews.length === 0 ? (
              <tr>
                <td colSpan="6">검색 결과가 없습니다.</td>
              </tr>
            ) : (
              crews.map((crew) => (
                <tr key={crew.crewId}>
                  <td>{crew.crewId}</td>
                  <td>
                    <img
                      src={crew.thumbnailPicture}
                      alt={crew.crewName}
                      css={s.thumbnail}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </td>
                  <td>{crew.crewName}</td>
                  <td>{crew.title}</td>
                  <td>{crew.gunguName}</td>
                  <td>
                    <button css={s.detailButton} onClick={() => setSelectedCrew(crew)}>상세보기</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div css={s.paginationWrapper}>
        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={(p) => goPage(p)}
          windowSize={1}
        />
      </div>

      {selectedCrew && (
        <CrewDetailModal crew={selectedCrew} onClose={() => setSelectedCrew(null)} />
      )}
    </div>
  );
}

export default SearchCrew;
