/** @jsxImportSource @emotion/react */
import * as s from './styles';
import MainContainer from "../../../components/MainContainer/MainContainer";
import useGetUserRankingQuery from '../../../queries/useGetUserRankingQuery';
import RankingCard from '../CrewRanking/RankingCard';
import usePrincipalQuery from '../../../queries/usePrincipalQuery';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function UserRanking(props) {
  const { data: rankings } = useGetUserRankingQuery();
  const { data: principalQuery, isLoading } = usePrincipalQuery();
  const userId = principalQuery?.data?.data?.body.user.userId;
  const myTotalKmRank = rankings?.totalKmRanking?.findIndex(user => user.userId === userId);
  const myGatheringRank = rankings?.gatheringCount?.findIndex(user => user.userId === userId);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      const userId = principalQuery?.data?.body?.user?.userId;

      if (!userId) {
        alert("로그인 후 이용 가능합니다.");
        navigate("/auth/oauth2/signin");
      }
    }
  }, [principalQuery, isLoading, navigate]);

  return (
    <MainContainer>
      <div css={s.headerlayout}>
        <div css={s.notice}>
          <h1>⭐ 랭킹은 매일 자정 마다 자동 갱신됩니다. ⭐</h1>
        </div>
      </div>
      <div css={s.layout}>
        <section css={s.section}>
          <h2 css={s.sectionTitle}>🏃‍♂️ 총 거리 랭킹</h2>
          <div css={s.rankingList}>
            {
              rankings?.totalKmRanking?.slice(0, 10).map((user, index) => (
              <div key={user.userId}>
                <RankingCard
                  data={user} 
                  rank={index + 1} 
                  type="distance" 
                  mode="user" 
                />
              </div>
              )) 
            }
          </div>
        </section>

        <section css={s.section}>
          <h2 css={s.sectionTitle}>👥 정모 참여 횟수</h2>
          <div css={s.rankingList}>
            {
              rankings?.gatheringCount?.slice(0, 10).map((user, index) => (
              <div key={user.userId}>
                <RankingCard 
                  data={user} 
                  rank={index + 1} 
                  type="gathering" 
                  mode="user" 
                />
              </div>
              )) 
            }
          </div>
        </section>

        <section>
          <h1 css={{ fontSize: '1.5rem', marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>나의 등수</h1>
          <div css={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div css={s.myRankCard}>
              <div css={s.rankingInfo}>
                <p css={s.myRankTitle}>🏃‍♂️ 총 거리</p>
                <p css={s.myRankSub}>
                  {rankings?.totalKmRanking?.find(user => user.userId === userId)?.totalKm ?? '0'} km
                </p>
              </div>
              <p css={s.myRankNumber}>
                {myTotalKmRank !== undefined && myTotalKmRank !== -1 ? myTotalKmRank + 1 + '위' : '순위 없음'}
              </p>
            </div>

            <div css={s.myRankCard}>
              <div css={s.rankingInfo}>
                <p css={s.myRankTitle}>👥 정모 참여 횟수</p>
                <p css={s.myRankSub}>
                  {rankings?.gatheringCount?.find(user => user.userId === userId)?.gatheringCount ?? '0'} 회
                </p>
              </div>
              <p css={s.myRankNumber}>
                {myGatheringRank !== undefined && myGatheringRank !== -1 ? myGatheringRank + 1 + '위' : '순위 없음'}
              </p>
            </div>

          </div>
        </section>
      </div>
    </MainContainer>
  );
}

export default UserRanking;