/** @jsxImportSource @emotion/react */
import * as s from './styles';
import MainContainer from "../../../components/MainContainer/MainContainer";
import useGetCrewRankingQuery from "../../../queries/useGetCrewRankingQuery";
import RankingCard from "./RankingCard";
import { useNavigate } from 'react-router-dom';
import { div } from 'framer-motion/client';
import usePrincipalQuery from '../../../queries/usePrincipalQuery';

function CrewRanking() {
  const navigate = useNavigate();
  const principalQuery = usePrincipalQuery();
  const userId = principalQuery?.data?.data?.body?.user?.userId;
  
  const { data: rankings, isLoading, isError, error } = useGetCrewRankingQuery();

  return (
    <MainContainer>
      <div css={s.headerlayout}>
        <div css={s.notice}>
          <h1>⭐ 랭킹은 매주 월요일 마다 자동 갱신됩니다. ⭐</h1>
        </div>
        <div>
          <button css={s.moreButton}>더보기</button>
        </div>
      </div>
      <div css={s.layout}>
        <section css={s.section}>
          <h2 css={s.sectionTitle}>🏃‍♂️ 총 거리 랭킹</h2>
          <div css={s.rankingList}>
            {rankings?.totalKmRanking?.map((crew, index) => (
              <div key={crew.crewId} onClick={() => navigate(`/crews/${crew.crewId}`)}>
                <RankingCard 
                  key={crew.crewId} 
                  crew={crew} 
                  rank={index + 1}
                  type="distance"
                  />
              </div>
            ))}
          </div>
        </section>

        <section css={s.section}>
          <h2 css={s.sectionTitle}>👥 멤버 수 랭킹</h2>
          <div css={s.rankingList}>
            {rankings?.memberRanking?.map((crew, index) => (
              <div key={crew.crewId} onClick={() => navigate(`/crews/${crew.crewId}`)}>
                <RankingCard 
                  key={crew.crewId} 
                  crew={crew} 
                  rank={index + 1}
                  type="member"
                />
              </div>
            ))}
          </div>
        </section>

        <section css={s.section}>
          <h2 css={s.sectionTitle}>🌟 신규 크루</h2>
          <div css={s.rankingList}>
            {rankings?.newRanking?.map((crew, index) => (
              <div key={crew.crewId} onClick={() => navigate(`/crews/${crew.crewId}`)}>
                <RankingCard 
                  key={crew.crewId} 
                  crew={crew} 
                  rank={index + 1}
                  type="new"
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
