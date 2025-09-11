/** @jsxImportSource @emotion/react */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainContainer from "../../../components/MainContainer/MainContainer";
import useGetUserRankingQuery from "../../../queries/Ranking/useGetUserRankingQuery";
import usePrincipalQuery from "../../../queries/User/usePrincipalQuery";
import RankingCard from "../CrewRanking/RankingCard";
import * as s from "./styles";

function UserRanking() {
  const { data: rankings } = useGetUserRankingQuery();
  const { data: principalQuery, isLoading } = usePrincipalQuery();
  const userId = principalQuery?.data?.body?.user?.userId;

  // 내가 속한 랭킹 데이터
  const myTotalKmData =
    rankings?.totalKmRanking?.find((user) => user.userId === userId) ?? null;
  const myGatheringData =
    rankings?.gatheringCount?.find((user) => user.userId === userId) ?? null;

  // 내 순위 계산
  const myTotalKmRank = rankings?.totalKmRanking?.findIndex(
    (user) => user.userId === userId
  );
  const myGatheringRank = rankings?.gatheringCount?.findIndex(
    (user) => user.userId === userId
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!userId) {
        alert("로그인 후 이용 가능합니다.");
        navigate("/auth/oauth2/signin");
      }
    }
  }, [principalQuery, isLoading, navigate, userId]);

  return (
    <MainContainer>
      <h2 css={s.head}>유저 랭킹</h2>
      <p css={s.headFont}>※ 랭킹은 매일 자정 마다 자동 갱신됩니다.</p>

      <div css={s.layout}>
        {/* 전체 랭킹 - 총 거리 */}
        <section css={s.section}>
          <div css={s.sectionTitle}>총 거리 랭킹</div>
          <div css={s.rankingList}>
            {rankings?.totalKmRanking?.slice(0, 10).map((user, index) => (
              <div key={user.userId}>
                <RankingCard
                  data={user}
                  rank={index + 1}
                  type="distance"
                  mode="user"
                />
              </div>
            ))}
          </div>
        </section>

        {/* 전체 랭킹 - 정모 참여 */}
        <section css={s.section}>
          <div css={s.sectionTitle}>정모 참여 횟수</div>
          <div css={s.rankingList}>
            {rankings?.gatheringCount?.slice(0, 10).map((user, index) => (
              <div key={user.userId}>
                <RankingCard
                  data={user}
                  rank={index + 1}
                  type="gathering"
                  mode="user"
                />
              </div>
            ))}
          </div>
        </section>

        {/* 나의 등수 */}
        <section css={s.mySection}>
          <div>
            <div
              css={{
                fontSize: "1.5rem",
                fontWeight: "600",
                paddingBottom: "2rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              나의 등수
            </div>
            <div css={s.rankingList}>
              <div css={s.sectionTitle}>총 거리 랭킹</div>
              {/* 총 거리 */}
              {myTotalKmData ? (
                <RankingCard
                  data={myTotalKmData}
                  rank={myTotalKmRank + 1}
                  type="distance"
                  mode="user"
                />
              ) : (
                <div css={s.notice}>총 거리 순위 없음</div>
              )}
              <div css={s.sectionTitle}>정모 참여 순위</div>
              {/* 정모 참여 */}
              {myGatheringData ? (
                <RankingCard
                  data={myGatheringData}
                  rank={myGatheringRank + 1}
                  type="gathering"
                  mode="user"
                />
              ) : (
                <div css={s.notice}>정모 참여 순위 없음</div>
              )}
            </div>
          </div>
        </section>
      </div>
    </MainContainer>
  );
}

export default UserRanking;
