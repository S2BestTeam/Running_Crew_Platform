/** @jsxImportSource @emotion/react */
import * as s from './styles';
import MainContainer from '../../../components/MainContainer/MainContainer';
import { useNavigate, useParams } from 'react-router-dom';
import usePrincipalQuery from '../../../queries/usePrincipalQuery';
import { useCrewDetailQuery } from '../../../queries/useCrewDetailQuery';
import { useState } from 'react';
import CrewWelcome from './CrewWelcome/CrewWelcome';
import CrewHome from './CrewHome/CrewHome';

function CrewDetail() {
  const navigate = useNavigate();
  const principal = usePrincipalQuery();
  const userId = principal?.data?.data?.body?.user?.userId;

  const { crewId } = useParams();
  const { data: crewData, refetch } = useCrewDetailQuery(crewId);
  const crew = crewData?.body || {
    gunguId: 0,
    crewProfileImg: "",
    crewName: "",
    userId: 0,
    title: "",
    content: "",
    limtedPeople: 0,
    crewTotalKm: 0,
  };

  const [activeTab, setActiveTab] = useState('home'); // 현재 활성 탭

  const isCrewLeader = crew.userId === userId;

  // 현재 탭에 따른 컴포넌트 렌더링
  const renderMainContent = () => {
    switch (activeTab) {
      case 'home':
        return <CrewHome crew={crew} userId={userId}/>;
      // case 'members':
      //   return <CrewMembers crewId={crewId} />;
      // case 'schedule':
      //   return <CrewSchedule crewId={crewId} isCrewLeader={isCrewLeader} />;
      case 'welcome':
        return <CrewWelcome crewId={crewId} isCrewLeader={isCrewLeader} />;
      // case 'board':
      //   return <CrewBoard crewId={crewId} userId={userId} />;
      // case 'photos':
      //   return <CrewPhotos crewId={crewId} userId={userId} />;
      // case 'notice':
      //   return <CrewNotice crewId={crewId} isCrewLeader={isCrewLeader} />;
      // case 'inquiry':
      //   return <CrewInquiry crewId={crewId} userId={userId} isCrewLeader={isCrewLeader} />;
      default:
        return <CrewHome crew={crew} />;
    }
  };

  return (
    <MainContainer>
      <div css={s.layout}>
        <div css={s.leftBox}>
          <div>
            <div css={s.crewInfoBox}>
              <div css={s.crewImgBox}></div>
              <div css={s.crewNameBox} onClick={() => setActiveTab('home')}>{crew.crewName}</div>
            </div>
            <div css={s.buttonContainer}>
              <button onClick={() => navigate(`/crews/${crewId}/members`)}>크루 멤버</button>
              <button>정모 일정</button>
              <button onClick={() => setActiveTab('welcome')}>가입 인사</button>
              <button>자유게시판</button>
              <button>사진첩</button>
              <button>공지사항</button>
              <button>문의사항</button>
              {isCrewLeader === userId && <button onClick={() => navigate(`/crews/${crew.crewId}/setting`)}>설정</button>}
            </div>
          </div>
          {isCrewLeader !== userId && (
            <div css={s.getout}>
              <button>탈퇴하기</button>
            </div>
          )}
        </div>
        {renderMainContent()}
      </div>
    </MainContainer>
  );
}

export default CrewDetail;