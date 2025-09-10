/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useMemo, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { useGetGatheringsQuery } from "../../../queries/Crew/Gathering/useGetGatheringsQuery";
import { useCrewStore } from "../../../stores/useCrewStroes";
import GatheringManagementModal from "./GatheringManagementModal/GatheringManagementModal";
import Pagination from "../../../components/Pagination/Pagination";

function GatheringManagement() {
  const { crewId } = useCrewStore();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // 검색 & 페이지네이션
  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchText = searchParams.get("searchText") || "";
  const [searchInput, setSearchInput] = useState(searchText);
  const size = 10;

  const gatheringsQuery = useGetGatheringsQuery(crewId);
  const gatherings = gatheringsQuery?.data?.data?.body ?? [];

  // 검색 필터 적용
  const filteredGatherings = useMemo(() => {
    if (!searchText) return gatherings;
    return gatherings.filter(
      (g) =>
        g.title.toLowerCase().includes(searchText.toLowerCase()) ||
        g.placeName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [gatherings, searchText]);

  const totalElements = filteredGatherings.length;
  const totalPages = Math.ceil(totalElements / size);
  const start = (page - 1) * size;
  const currentPageData = filteredGatherings.slice(start, start + size);

  const [selectedGathering, setSelectedGathering] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setSearchParams({ page: nextPage, searchText });
  };

  const handleAttendanceClick = (gathering, e) => {
    e.stopPropagation();
    setSelectedGathering(gathering);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedGathering(null);
    setIsModalOpen(false);
  };

  if (gatheringsQuery.isLoading) return <div>불러오는 중…</div>;
  if (gatheringsQuery.isError) return <div>문제가 발생했어요.</div>;

  return (
    <div css={s.container}>
      <h2>정모 관리</h2>

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
            <th css={s.th}>날짜</th>
            <th css={s.th}>정모 이름</th>
            <th css={s.th}>장소</th>
            <th css={s.th}>km</th>
            <th css={s.th}>주최자</th>
            <th css={s.th}>상태</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.length === 0 ? (
            <tr>
              <td colSpan={6} css={s.noData}>
                등록된 정모가 없습니다.
              </td>
            </tr>
          ) : (
            currentPageData.map((g) => {
              const today = new Date();
              const runningDate = new Date(g.runningDate);
              const isPast = runningDate < today;

              return (
                <tr
                  key={g.gatheringId}
                  css={s.tr}
                  onClick={() => navigate(`/crews/${crewId}/gathering-management/${g.gatheringId}`)}
                >
                  <td css={s.td}>{g.runningDate}</td>
                  <td css={s.tdTitle}>{g.title}</td>
                  <td css={s.td}>{g.placeName}</td>
                  <td css={s.td}>{g.km}</td>
                  <td css={s.td}>
                    <div css={s.tdProfile}>
                      <img src={g.user?.picture} alt={g.user?.fullName} css={s.profileImg} />
                      <span>{g.user?.fullName || "알 수 없음"}</span>
                    </div>
                  </td>
                  <td css={s.td}>
                    {isPast ? (
                      <button css={s.attendanceButton} onClick={(e) => handleAttendanceClick(g, e)}>
                        마감
                      </button>
                    ) : (
                      <span>진행중</span>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onChange={(p) => goPage(p)} windowSize={1} />
      )}

      <GatheringManagementModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        crewId={crewId}
        gatheringId={selectedGathering?.gatheringId}
      />
    </div>
  );
}

export default GatheringManagement;
