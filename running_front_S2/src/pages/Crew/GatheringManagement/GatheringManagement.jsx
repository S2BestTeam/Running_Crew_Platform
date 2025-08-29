/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import * as s from "./styles";
import ContentLayout from "../../../components/ContentLayout/ContentLayout";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useGetGatheringsQuery } from "../../../queries/useGetGatheringsQuery";
import { reqGatheringParticipants } from "../../../api/Crew/gatheringApi";
import GatheringManagementModal from "./GatheringManagementModal/GatheringManagementModal";
import { useNavigate } from "react-router-dom";
import { useCrewStore } from "../../../stores/useCrewStroes";

function GatheringManagement() {
  const { crewId } = useCrewStore();
  const navigate = useNavigate();

  const gatheringsQuery = useGetGatheringsQuery(crewId);
  const [gatherings, setGatherings] = useState([]);
  const [selectedGathering, setSelectedGathering] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    if (gatheringsQuery?.data?.data?.body) {
      setGatherings(gatheringsQuery.data.data.body);
    }
  }, [gatheringsQuery?.data]);

  // 출석체크 버튼 클릭 시 모달 열기
  const handleAttendanceClick = async (gathering) => {
    setSelectedGathering(gathering);
    setIsModalOpen(true);

    try {
      const res = await reqGatheringParticipants(
        gathering.crewId,
        gathering.gatheringId
      );
      setParticipants(res.data);
    } catch (err) {
      console.error("참석자 불러오기 실패:", err);
    }
  };

  const handleCloseModal = () => {
    setSelectedGathering(null);
    setParticipants([]);
    setIsModalOpen(false);
  };

  const columns = [
    { field: "runningDate", headerName: "날짜", width: 150 },
    { field: "title", headerName: "정모 이름", width: 200 },
    { field: "placeName", headerName: "장소", width: 200 },
    { field: "km", headerName: "km", width: 100 },
    {
      field: "userName",
      headerName: "주최자",
      width: 200,
      renderCell: (params) => (
        <div css={s.profileRow}>
          <img
            src={params.row.user?.picture}
            alt={params.value}
            css={s.profileImg}
          />
          <span>{params.value}</span>
        </div>
      ),
    },
    {
      field: "status",
      headerName: "상태",
      width: 200,
      renderCell: (params) => {
        const today = new Date();
        const runningDate = new Date(params.row.runningDate);

        if (runningDate < today) {
          return (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAttendanceClick(params.row);
              }}
              css={s.attendanceButton}
            >
              마감
            </button>
          );
        }

        return <span>진행중</span>;
      },
    },
  ];

  const rows = gatherings.map((g) => ({
    id: g.gatheringId,
    gatheringId: g.gatheringId,
    crewId: g.crewId,
    runningDate: g.runningDate,
    title: g.title,
    placeName: g.placeName,
    km: g.km,
    userName: g.user?.fullName || "알 수 없음",
    user: g.user,
  }));

  return (
    <ContentLayout>
      <div css={s.layout}>
        <header>
          <h2>정모 관리</h2>
        </header>
        <main css={s.gatheringMain}>
          <Box css={s.dataGridWrapper}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSizeOptions={[10]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              checkboxSelection
              disableRowSelectionOnClick
              onRowClick={(params) => {
                const gatheringId = params.row.gatheringId;
                navigate(`/crews/${crewId}/gathering-management/${gatheringId}`);
              }}
            />
          </Box>

          {/* 참석자 모달 */}
          <GatheringManagementModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            participants={participants}
          />
        </main>
      </div>
    </ContentLayout>
  );
}

export default GatheringManagement;
