import { useState } from "react";
import { BiSolidChevronLeftSquare, BiSolidChevronRightSquare } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";
import useGetCrewListQuery from "../../../queries/useGetCrewListQuery";
import CrewDetailModal from "./CrewDetailModal";

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
    gunguId: "", // 관리자 페이지는 굳이 군구 필터 안 써도 된다면 제거
  });

  if (crewListQuery.isLoading) return <div>Loading...</div>;
  if (crewListQuery.isError) return <div>Error: {crewListQuery.error.message}</div>;

  const crews = crewListQuery.data?.pages?.flatMap(p => p?.data?.body?.contents || []) || [];
  const totalPages = crewListQuery.data?.pages?.[0]?.data?.body?.totalPages || 1;

  const handleSearchOnChange = (e) => setSearchInput(e.target.value);
  const handleSearchOnKeyDown = (e) => e.key === "Enter" && handleSearchOnClick();

  const handleSearchOnClick = () => {
    setSearchParams({ page: 1, searchText: searchInput });
  };

  const goPage = (next) => {
    const nextPage = Math.min(Math.max(1, next), totalPages);
    setSearchParams({ page: nextPage, searchText });
  };

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchOnChange}
          onKeyDown={handleSearchOnKeyDown}
          placeholder="크루명 검색"
        />
        <button onClick={handleSearchOnClick}>검색</button>
      </div>

      {/* 크루 리스트 테이블 */}
      <table border="1" cellPadding="6" cellSpacing="0" width="100%">
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
                <td style={{ width: "80px" }}>
                  <img
                    src={crew.thumbnailPicture}
                    alt={crew.crewName}
                    style={{
                      width: "80px",
                      height: "60px",
                      objectFit: "cover",
                      display: "block",
                    }}
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                </td>
                <td>{crew.crewName}</td>
                <td>{crew.title}</td>
                <td>{crew.gunguName}</td>
                <td>
                  <button onClick={() => setSelectedCrew(crew)}>상세보기</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div style={{ display: "flex", justifyContent: "center", gap: 12, alignItems: "center", marginTop: 16 }}>
        <button onClick={() => goPage(page - 1)} disabled={page <= 1}>
          <BiSolidChevronLeftSquare />
        </button>
        <span>{page} / {totalPages}</span>
        <button onClick={() => goPage(page + 1)} disabled={page >= totalPages}>
          <BiSolidChevronRightSquare />
        </button>
      </div>

      {/* 선택된 크루 상세보기 모달 */}
      {selectedCrew && (
        <CrewDetailModal crew={selectedCrew} onClose={() => setSelectedCrew(null)} />
      )}
    </div>
  );
}

export default SearchCrew;
