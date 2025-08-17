/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import MainContainer from "../../../components/MainContainer/MainContainer";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import usePrincipalQuery from "../../../queries/usePrincipalQuery";
import { useCrewDetailQuery } from "../../../queries/useCrewDetailQuery";
import { useState } from "react";
import CrewWelcome from "./CrewWelcome/CrewWelcome";
import CrewHome from "./CrewHome/CrewHome";
import CrewGathering from "./CrewGathering/CrewGathering";

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

  const isCrewLeader = crew.userId === userId;

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
              <button onClick={() => navigate(`/crews/${crewId}/gathering`)}>
                정모 일정
              </button>
              <button onClick={() => navigate(`/crews/${crewId}/welcome`)}>
                가입 인사
              </button>
              <button>자유게시판</button>
              <button>사진첩</button>
              <button>공지사항</button>
              <button>문의사항</button>
              {isCrewLeader === userId && (
                <button
                  onClick={() => navigate(`/crews/${crew.crewId}/setting`)}
                >
                  설정
                </button>
              )}
            </div>
          </div>
          {isCrewLeader !== userId && (
            <div css={s.getout}>
              <button>탈퇴하기</button>
            </div>
          )}
        </div>
        <Routes>
          <Route path="/" element={<CrewHome crew={crew} userId={userId} />} />
          <Route
            path="/welcome"
            element={<CrewWelcome cewId={crewId} isCrewLeader={isCrewLeader} />}
          />
          <Route
            path="/gathering"
            element={<CrewGathering crewId={crewId} />}
          />
        </Routes>
      </div>
    </MainContainer>
  );
}

export default CrewDetail;
