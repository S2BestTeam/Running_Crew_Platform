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

// ✅ NEW 관련
import useCrewSectionsLatestQuery from "../../../queries/useCrewSectionsLatestQuery";
import { isNewSinceLastVisit, setLastVisitedNow } from "../../../components/Time/newBadgeUtil";

function CCategory() {
  const navigate = useNavigate();
  const principal = usePrincipalQuery();
  const userId = principal?.data?.data?.body?.user?.userId;

  // ✅ crewId는 params에서 문자열로 들어오므로, 로컬스토리지 키는 문자열로 '고정'해서 사용
  const { crewId: crewIdParam } = useParams();
  const crewId = crewIdParam;                  // 실제 API/라우팅에서 쓰는 값
  const crewKey = String(crewIdParam ?? "");   // NEW 판단/저장은 항상 문자열 키로 통일

  const { data: crewData, isLoading, isSuccess } = useCrewDetailQuery(crewId);
  const { setCrewId, setCrew } = useCrewStore();
  const crewRoleQuery = useGetCrewRoleQuery(userId);
  const crewRole = crewRoleQuery?.data?.find((role) => role.crewId === Number(crewId));
  const canRegister = crewRole && [2, 3].includes(crewRole.roleId);
  const [deleteMemberId, setDeleteMemberId] = useState(0);
<<<<<<< HEAD
=======
  const { data: latestMeta } = useCrewSectionsLatestQuery(crewId);
>>>>>>> 110-new-기능-구현-도전

  useEffect(() => {
    reqGetMemberId(crewId).then((res) => setDeleteMemberId(res.data.body));
    setCrewId(crewId);
    setCrew(crewData?.body);
<<<<<<< HEAD
  }, [crewId, crewData?.body]);

=======
  }, [crewId, crewData?.body, setCrewId, setCrew]);
>>>>>>> 110-new-기능-구현-도전

  const latest = {
    members:    latestMeta?.members    ?? 0,
    gatherings: latestMeta?.gatherings ?? 0,
    freeBoards: latestMeta?.freeBoards ?? 0,
    notices:    latestMeta?.notices    ?? 0,
  };

  useEffect(() => {
  if (!crewKey) return;
  console.log("[LATEST META]", latest);
  ["members","gatherings","freeBoards","notices"].forEach(sec => {
    const L = latest[sec];
    console.log(sec, { latestTs: L, latestIso: L ? new Date(L).toISOString() : null });
  });
}, [crewKey, latest]);


  // ✅ 섹션별 최신 생성시각(ms) 가져오기 (훅만 사용)

  // ✅ undefined 대비: 0으로 보정

  // 클릭 직후 즉시 숨김을 위한 가벼운 리렌더 트리거
  const [refreshTick, setRefreshTick] = useState(0);

  // ✅ NEW 여부 (4시간 규칙 + 마지막 방문 이후)
  const showNew = {
    members:    isNewSinceLastVisit(crewKey, "members",    latest.members),
    gatherings: isNewSinceLastVisit(crewKey, "gatherings", latest.gatherings),
    freeBoards: isNewSinceLastVisit(crewKey, "freeBoards", latest.freeBoards),
    notices:    isNewSinceLastVisit(crewKey, "notices",    latest.notices),
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

  // ✅ 방문 기록 저장 후 이동 → 즉시 NEW off
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
        크루 멤버 {showNew.members && <span css={s.newBadge}>NEW</span>}
      </button>

      <button onClick={go("gatherings", `/crews/${crewId}/gathering`)}>
        정모 일정 {showNew.gatherings && <span css={s.newBadge}>NEW</span>}
      </button>
<<<<<<< HEAD
      <button onClick={() => navigate(`/crews/${crewId}/freeBoards`)}>
        자유게시판
=======

      <button onClick={go("freeBoards", `/crews/${crewId}/freeBoards`)}>
        자유게시판 {showNew.freeBoards && <span css={s.newBadge}>NEW</span>}
      </button>

      <button onClick={go("albums", `/crews/${crewId}/albums`)}>
        사진첩
      </button>

      <button onClick={go("notices", `/crews/${crewId}/notices`)}>
        공지사항 {showNew.notices && <span css={s.newBadge}>NEW</span>}
>>>>>>> 110-new-기능-구현-도전
      </button>

      {isCrewLeader && (
        <>
<<<<<<< HEAD
          <button onClick={() => navigate(`/crews/${crewId}/gathering-management`)}>
            정모 관리
          </button>
          <button onClick={() => navigate(`/crews/${crewId}/welcome`)}>
            가입 인사 관리
          </button>
          <button onClick={() => navigate(`/crews/${crewId}/report`)}>
            신고사항
          </button>
          <button onClick={() => navigate(`/crews/${crewId}/setting`)}>
            설정
          </button>
=======
          <button onClick={go("welcome", `/crews/${crewId}/welcome`)}>가입 인사</button>
          <button onClick={go("gathering-management", `/crews/${crewId}/gathering-management`)}>정모 관리</button>
          <button onClick={go("report", `/crews/${crewId}/report`)}>신고사항</button>
          <button onClick={go("setting", `/crews/${crewId}/setting`)}>설정</button>
>>>>>>> 110-new-기능-구현-도전
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
<<<<<<< HEAD
  )
    :
    (<></>);

=======
  ) : <></>;
>>>>>>> 110-new-기능-구현-도전

  return (
    <MainContainer>
      <LeftSideBarLayout
        profileSection={profileSection}
        navigationButtons={navigationButtons}
        bottomSection={bottomSection}
      >
<<<<<<< HEAD
        <Routes>
          <Route path="/" element={<CrewInfo />} />
          <Route path="/welcome" element={<Welcome isCrewLeader={isCrewLeader} />} />
          <Route path="/gathering/*" element={<Gathering />} />
          <Route path="/gathering/register" element={<GatheringRegister/>} />
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
          <Route path="/setting" element={<Setting />} />
        </Routes>
=======
        <ContentLayout>
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
            <Route path="/setting" element={<Setting />} />
          </Routes>
        </ContentLayout>
>>>>>>> 110-new-기능-구현-도전
      </LeftSideBarLayout>
    </MainContainer>
  );
}

export default CCategory;
