/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import usePrincipalQuery from "../../../queries/usePrincipalQuery";
import { useEffect } from "react";
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
import CommentDetail from "../FreeBoard/Comment/CommentDetail";
import Notice from "../Notice/Notice";
import NoticeReg from "../Notice/NoticeReg/NoticeReg";
import NoticeDetail from "../Notice/NoticeDetail/NoticeDetail";


function CCategory() {
  const navigate = useNavigate();
  const principal = usePrincipalQuery();
  const userId = principal?.data?.data?.body?.user?.userId;
  const { crewId } = useParams();
  const { data: crewData, isLoading, isSuccess } = useCrewDetailQuery(crewId);
  const { setCrewId, setCrew, setCrewLeader } = useCrewStore();
  
  useEffect(() => {
    setCrewId(crewId);
    setCrew(crewData?.body);
  }, [crewId, crewData?.body]);

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }

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
      <button onClick={() => navigate(`/crews/${crewId}/members`)}>
        크루 멤버
      </button>
      <button onClick={() => navigate(`/crews/${crewId}/gathering`)}>
        정모 일정
      </button>
      <button onClick={() => navigate(`/crews/${crewId}/welcome`)}>
        가입 인사
      </button>
      <button onClick={() => navigate(`/crews/${crewId}/freeBoards`)}>자유게시판</button>
      <button>사진첩</button>
      <button onClick={() => navigate(`/crews/${crewId}/notices`)}>공지사항</button>
      <button>문의사항</button>
      {isCrewLeader && (
        <>
          <button onClick={() => navigate(`/crews/${crew.crewId}/report`)}>
            신고사항
          </button>
          <button onClick={() => navigate(`/crews/${crew.crewId}/setting`)}>
            설정
          </button>
        </>
      )}
    </>
  );

  const bottomSection = !isCrewLeader && (
    <div css={s.getout}>
      <button>탈퇴하기</button>
    </div>
  );

  return (
    <MainContainer>
      <LeftSideBarLayout
      profileSection={profileSection}
      navigationButtons={navigationButtons}
      bottomSection={bottomSection}
      >
        <ContentLayout>
          <Routes>
            <Route path="/" element={<CrewInfo />} />
            <Route path="/welcome" element={<Welcome isCrewLeader={isCrewLeader} />}/>
            <Route path="/gathering" element={<Gathering />}/>
            <Route path="/members" element={<Member />} />

            <Route path="/freeBoards" element={<FreeBoard crewId={crewId}/>} />
            <Route path="freeBoards/register" element={<FeedReg crewId={crewId} />} />
            <Route path="freeBoards/:freeId" element={<FeedDetail crewId={crewId} />} />
            <Route path="freeBoards/:freeId/comments" element={<CommentDetail crewId={crewId}/>} />

            <Route path="/notices" element={<Notice crewId={crewId}/>} />
            <Route path="notices/register" element={<NoticeReg crewId={crewId} />} />
            <Route path="notices/:noticeId" element={<NoticeDetail crewId={crewId} />} />

            <Route path="/report" element={<Report crewId={crewId} isCrewLeader={isCrewLeader} />} />
          </Routes>
        </ContentLayout>
      </LeftSideBarLayout>
    </MainContainer>
  );
}

export default CCategory;
