/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import MainContainer from "../../../components/MainContainer/MainContainer";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import usePrincipalQuery from "../../../queries/usePrincipalQuery";
import { useEffect } from "react";
import CrewWelcome from "./CrewWelcome/CrewWelcome";
import CrewHome from "./CrewHome/CrewHome";
import { useCrewStore } from "../../../stores/useCrewStroes";
import useCrewDetailQuery from "../../../queries/useCrewDetailQuery";
import CrewMember from "./CrewMember/CrewMember";
import CrewGathering from "./CrewGathering/CrewGathering";

function CrewDetail() {
  const navigate = useNavigate();
  const principal = usePrincipalQuery();
  const userId = principal?.data?.data?.body?.user?.userId;
  const { crewId } = useParams();

  const { data: crewData } = useCrewDetailQuery(crewId);
  const crew = crewData?.body || {
    crewId: Number(crewId),
    gunguId: 0,
    crewProfileImg: "",
    crewName: "",
    userId: 0,
    title: "",
    content: "",
    limitedPeople: 0,
    crewTotalKm: 0,
  };
  const isCrewLeader = crew.userId === userId;
  

  const { setCrewId, setCrew } = useCrewStore();

  useEffect(() => {
    setCrewId(crewId);
    setCrew(crewData?.body);
  },[crewId, crewData?.body])

  return (
    <MainContainer>
      <div css={s.layout}>
        <div css={s.leftBox}>
          <div>
            <div css={s.crewInfoBox}>
              <div css={s.crewImgBox}></div>
              <div
                css={s.crewNameBox}
                onClick={() => navigate(`/crews/${crewId}`)}
              >
                {crew.crewName}
              </div>
            </div>
            <div css={s.buttonContainer}>
              <button onClick={() => navigate(`/crews/${crewId}/members`)}>
                크루 멤버
              </button>
              <button onClick={() => navigate(`/crews/${crewId}/gathering`)}>정모 일정</button>
              <button onClick={() => navigate(`/crews/${crewId}/welcome`)}>가입 인사</button>
              <button>자유게시판</button>
              <button>사진첩</button>
              <button>공지사항</button>
              <button>문의사항</button>
              {crew.userId === userId && (
                <>
                  <button onClick={() => navigate(`/crews/${crew.crewId}/report`)}>신고사항</button>
                  <button onClick={() => navigate(`/crews/${crew.crewId}/setting`)}>설정</button>
                </>
              )}
            </div>
          </div>
          {crew.userId !== userId && (
            <div css={s.getout}>
              <button>탈퇴하기</button>
            </div>
          )}
        </div>
        <Routes>
          <Route path="/" element={<CrewHome userId={userId}/>} />
          <Route path="/welcome" element={<CrewWelcome isCrewLeader={isCrewLeader} />}/>
          <Route path="/members" element={<CrewMember />} />
          {/* <Route path="/report" element={<ReportMember />} */}
          <Route path="/gathering" element={<CrewGathering crewId={crewId} />}/>
        </Routes>
      </div>
    </MainContainer>
  );
}

export default CrewDetail;
