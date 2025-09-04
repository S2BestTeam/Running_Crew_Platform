/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import usePrincipalQuery from "../../../queries/usePrincipalQuery";
import { useEffect, useState } from "react";
import { useCrewStore } from "../../../stores/useCrewStroes";
import useCrewDetailQuery from "../../../queries/useCrewDetailQuery";
import Welcome from "../Welcome/Welcome";
import Member from "../Member/Member";
import Report from "../Report/Report";
import FreeBoard from "../FreeBoard/FreeBoard";
import CrewInfo from "../Information/CrewInfo";
import Loading from "../../../components/Loading/Loading";
import LeftSideBarLayout from "../../../components/LeftSideBarLayout/LeftSideBarLayout";
import MainContainer from "../../../components/MainContainer/MainContainer";
import ContentLayout from "../../../components/ContentLayout/ContentLayout";
import Gathering from "../Gathering/Gathering";
import FeedReg from "../FreeBoard/FeedReg/FeedReg";
import FeedDetail from "../FreeBoard/FeedDetail/FeedDetail";
import Notice from "../Notice/Notice";
import NoticeReg from "../Notice/NoticeReg/NoticeReg";
import NoticeDetail from "../Notice/NoticeDetail/NoticeDetail";
import GatheringManagement from "../GatheringManagement/GatheringManagement";
import Setting from "../Setting/Setting";
import FreeEdit from "../FreeBoard/Edit/FreeEdit";
import NoticeEdit from "../Notice/Edit/NoticeEdit";
import GatheringRegister from "../Gathering/GatheringRegister/GatheringRegister";
import GatheringModify from "../GatheringManagement/GatheringModify/GatheringModify";
import useGetCrewRoleQuery from "../../../queries/useGetCrewRoleQuery";
import { reqGetMemberId, reqWithDrawMember } from "../../../api/Crew/memberApi";
import CrewAlbums from "../Albums/CrewAlbums";
import useCrewSectionsLatestQuery from "../../../queries/useCrewSectionsLatestQuery";
import { isNewSinceLastVisit, setLastVisitedNow } from "../../../components/Time/newBadgeUtil";
import Message from "../Message/Message";

function CCategory() {
  const navigate = useNavigate();
  const principal = usePrincipalQuery();
  const userId = principal?.data?.data?.body?.user?.userId;

  const { crewId: crewIdParam } = useParams();
  const crewId = crewIdParam;
  const crewKey = String(crewIdParam ?? "");

  const { data: crewData, isLoading, isSuccess } = useCrewDetailQuery(crewId);
  const { setCrewId, setCrew } = useCrewStore();
  const crewRoleQuery = useGetCrewRoleQuery(userId);
  const crewRole = crewRoleQuery?.data?.find((role) => role.crewId === Number(crewId));
  const canRegister = crewRole && [2, 3].includes(crewRole.roleId);
  const [deleteMemberId, setDeleteMemberId] = useState(0);
  const { data: latestMeta } = useCrewSectionsLatestQuery(crewId);

  useEffect(() => {
    reqGetMemberId(crewId).then((res) => setDeleteMemberId(res.data.body));
    setCrewId(crewId);
    setCrew(crewData?.body);
  }, [crewId, crewData?.body, setCrewId, setCrew]);

  const latest = {
    members: latestMeta?.members ?? 0,
    gatherings: latestMeta?.gatherings ?? 0,
    freeBoards: latestMeta?.freeBoards ?? 0,
    notices: latestMeta?.notices ?? 0,
  };

  useEffect(() => {
    if (!crewKey) return;
    ["members", "gatherings", "freeBoards", "notices"].forEach(sec => {
      const L = latest[sec];
    });
  }, [crewKey, latest]);

  const [refreshTick, setRefreshTick] = useState(0);

  const showNew = {
    members: isNewSinceLastVisit(crewKey, "members", latest.members),
    gatherings: isNewSinceLastVisit(crewKey, "gatherings", latest.gatherings),
    freeBoards: isNewSinceLastVisit(crewKey, "freeBoards", latest.freeBoards),
    notices: isNewSinceLastVisit(crewKey, "notices", latest.notices),
  };
  void refreshTick;



  if (isLoading) return <Loading isLoading={isLoading} />;

  const crew = crewData?.body || {
    crewId: Number(crewId),
    gunguId: 0,
    profilePicture: "",
    crewName: "",
    userId: 0,
    title: "",
    content: "",
    limitedPeople: 0,
    crewTotalKm: 0,
  };


  const isCrewLeader = crew?.userId === userId;

  const go = (section, to) => () => {
    setLastVisitedNow(crewKey, section);
    setRefreshTick((t) => t + 1);
    navigate(to);
  };

  const profileSection = isSuccess && (
    <div css={s.crewInfoBox} onClick={() => navigate(`/crews/${crewId}`)}>
      <div css={s.crewImgBox}>
        <img src={crew?.profilePicture} alt="크루 프로필 이미지" />
      </div>
      <div css={s.crewNameBox}>{crew.crewName}</div>
    </div>
  );

  const navigationButtons = (
    <>
      <button onClick={go("members", `/crews/${crewId}/members`)}>
        크루 멤버 {showNew.members && <span css={s.newBadge1}>NEW</span>}
      </button>
      {isCrewLeader && (
        <>
          <button onClick={go("welcome", `/crews/${crewId}/welcome`)}>가입 인사 관리</button>
        </>
      )}
      <button onClick={go("gatherings", `/crews/${crewId}/gathering`)}>
        정모 일정 {showNew.gatherings && <span css={s.newBadge1}>NEW</span>}
      </button>
      {isCrewLeader && (
        <>
          <button onClick={go("gathering-management", `/crews/${crewId}/gathering-management`)}>정모 관리</button>
        </>
      )}

      <button onClick={go("freeBoards", `/crews/${crewId}/freeBoards`)}>
        자유게시판 {showNew.freeBoards && <span css={s.newBadge1}>NEW</span>}
      </button>

      <button onClick={go("albums", `/crews/${crewId}/albums`)}>
        사진첩
      </button>

      <button onClick={go("notices", `/crews/${crewId}/notices`)}>
        공지사항 {showNew.notices && <span css={s.newBadge1}>NEW</span>}
      </button>
      {isCrewLeader && (
        <>
          <button onClick={go("report", `/crews/${crewId}/report`)}>신고사항</button>
          <button onClick={go("setting", `/crews/${crewId}/message`)}>메세지</button>
          <button onClick={go("setting", `/crews/${crewId}/setting`)}>설정</button>
        </>
      )}
    </>
  );

  const handleWithdrawOnClick = async () => {
    if (!deleteMemberId) {
      alert("멤버 ID를 불러오지 못했습니다.");
      return;
    }
    await reqWithDrawMember(deleteMemberId);
    alert("크루 탈퇴가 완료되었습니다. \n 탈퇴 후 14일 이후 재가입이 가능합니다.");
    navigate("/");
  };

  const bottomSection = !!canRegister ? (
    <div css={s.getout}>
      <button onClick={handleWithdrawOnClick}>탈퇴하기</button>
    </div>
  )
    :
    (<></>);


  return (
    <MainContainer>
      <LeftSideBarLayout
        profileSection={profileSection}
        navigationButtons={navigationButtons}
        bottomSection={bottomSection}
      >
        <Routes>
          <Route path="/" element={<CrewInfo />} />
          <Route path="/welcome" element={<Welcome isCrewLeader={isCrewLeader} />} />
          <Route path="/gathering/*" element={<Gathering />} />
          <Route path="/gathering/register" element={<GatheringRegister />} />
          <Route path="/gathering-management" element={<GatheringManagement />} />
          <Route path="/gathering-management/:gatheringId" element={<GatheringModify />} />
          <Route path="/members" element={<Member />} />
          <Route path="/freeBoards" element={<FreeBoard />} />
          <Route path="freeBoards/register" element={<FeedReg />} />
          <Route path="freeBoards/:freeId" element={<FeedDetail />} />
          <Route path="freeBoards/:freeId/edit" element={<FreeEdit />} />
          <Route path="/albums" element={<CrewAlbums />} />
          <Route path="/notices" element={<Notice />} />
          <Route path="notices/register" element={<NoticeReg />} />
          <Route path="notices/:noticeId" element={<NoticeDetail />} />
          <Route path="notices/:noticeId/edit" element={<NoticeEdit />} />
          <Route path="/report" element={<Report isCrewLeader={isCrewLeader} />} />
          <Route path="/message" element={<Message isCrewLeader={isCrewLeader} />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </LeftSideBarLayout>
    </MainContainer>
  );
}

export default CCategory;
