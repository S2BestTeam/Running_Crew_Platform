/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import * as s from "./styles";
import ContentLayout from "../../../components/ContentLayout/ContentLayout";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useGetGatheringsQuery } from "../../../queries/useGetGatheringsQuery";
import GatheringManagementModal from "./GatheringManagementModal/GatheringManagementModal";
import { useNavigate } from "react-router-dom";
import { useCrewStore } from "../../../stores/useCrewStroes";
import LeftSideBarLayout from "../../../components/LeftSideBarLayout/LeftSideBarLayout";

function GatheringManagement() {
  const { crewId } = useCrewStore();
  const navigate = useNavigate();

  const gatheringsQuery = useGetGatheringsQuery(crewId);
  const [gatherings, setGatherings] = useState([]);
  const [selectedGathering, setSelectedGathering] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (gatheringsQuery?.data?.data?.body) {
      setGatherings(gatheringsQuery.data.data.body);
    }
  }, [gatheringsQuery?.data]);

  const handleAttendanceClick = (gathering) => {
    setSelectedGathering(gathering);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedGathering(null);
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
      width: 80,
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
              getRowId={(row) => row.id}
              pageSizeOptions={[10]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              checkboxSelection
              disableRowSelectionOnClick
              onRowClick={(params) => {
                const gatheringId = params.row.gatheringId;
                navigate(
                  `/crews/${crewId}/gathering-management/${gatheringId}`
                );
              }}
            />
          </Box>

          {/* 참석자 모달 */}
          <GatheringManagementModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            crewId={crewId}
            gatheringId={selectedGathering?.gatheringId}
          />
        </main>
      </div>
    </ContentLayout>
  );
}

export default GatheringManagement;
