/** @jsxImportSource @emotion/react */
import * as s from './styles';
import MainContainer from "../../../components/MainContainer/MainContainer";
import useGetCrewRankingQuery from "../../../queries/Ranking/useGetCrewRankingQuery";
import RankingCard from "./RankingCard";
import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";

function CrewRanking() {
  const navigate = useNavigate();
  const { data: rankings } = useGetCrewRankingQuery();


  return (
    <MainContainer>
      <div css={s.headerlayout}>
        <div css={s.notice}>
          <h1><FaStar style={{fontSize: '1.5rem'}}/> 랭킹은 매일 자정 마다 자동 갱신됩니다. </h1>
        </div>
      </div>
      <div css={s.layout}>
        <section css={s.section}>
          <h2 css={s.sectionTitle}>🏃‍♂️ 총 거리 랭킹</h2>
          <div css={s.rankingList}>
            {rankings?.totalKmRanking?.slice(0, 10).map((crew, index) => (
              <div key={crew.crewId} css={s.cardDiv} onClick={() => navigate(`/crews/${crew.crewId}`)}>
                <RankingCard
                  key={crew.crewId}
                  data={crew}
                  rank={index + 1}
                  type="distance"
                  mode="crew"
                />
              </div>
            ))}
          </div>
        </section>

        <section css={s.section}>
          <h2 css={s.sectionTitle}>👥 멤버 수 랭킹</h2>
          <div css={s.rankingList}>
            {rankings?.memberRanking?.slice(0, 10).map((crew, index) => (
              <div key={crew.crewId} css={s.cardDiv} onClick={() => navigate(`/crews/${crew.crewId}`)}>
                <RankingCard
                  key={crew.crewId}
                  data={crew}
                  rank={index + 1}
                  type="member"
                  mode="crew"
                />
              </div>
            ))}
          </div>
        </section>

        <section css={s.section}>
          <h2 css={s.sectionTitle}>🌟 신규 크루</h2>
          <div css={s.rankingList}>
            {rankings?.newRanking?.slice(0, 10).map((crew, index) => (
              <div key={crew.crewId} css={s.cardDiv} onClick={() => navigate(`/crews/${crew.crewId}`)}>
                <RankingCard
                  key={crew.crewId}
                  data={crew}
                  rank={index + 1}
                  type="new"
                  mode="crew"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainContainer>
  );
}

export default CrewRanking;
