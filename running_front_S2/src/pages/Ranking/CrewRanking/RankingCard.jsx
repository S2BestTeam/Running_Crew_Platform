/** @jsxImportSource @emotion/react */
import * as s from "./styles";

function RankingCard({ data, rank, type, mode }) {
  // rank 아이콘
  const getRankIcon = (rank) => {
    if (rank === 1) return <h2>🥇</h2>;
    if (rank === 2) return <h3>🥈</h3>;
    if (rank === 3) return <h4>🥉</h4>;
    return `${rank}위`;
  };

  // 메인 값
  const getMainValue = () => {
    if (mode === "crew") {
      switch (type) {
        case "distance":
          return `${data.totalKm}km`;
        case "member":
          return `${data.memberCount}명`;
        case "new":
          return new Date(data.createdAt).toLocaleDateString();
        case "region":
          return data.title || data.description || "";
        default:
          return "";
      }
    } else if (mode === "user") {
      switch (type) {
        case "distance":
          return `${data.totalKm}km`;
        case "gathering":
          return `${data.gatheringCount}회 참여`;
        default:
          return "";
      }
    }
  };

  return (
    <div css={s.card(rank)}>
      <div css={s.rankBadge}>{getRankIcon(rank)}</div>
      <div css={s.crewInfo}>
        {mode === "crew" ? (
          <>
            <img
              src={data.profilePicture}
              alt={data.crewName}
              css={s.avatar}
            />
            <div>
              <h3 css={s.crewName}>{data.crewName}</h3>
              <p css={s.crewLocation}>{data.gunguName}</p>
            </div>
          </>
        ) : (
          <>
            <img
              src={data.picture}
              alt={data.nickname}
              css={s.avatar}
            />
            <div>
              <h3 css={s.crewName}>{data.nickname || data.fullName}</h3>
              <p css={s.crewLocation}>
                {data.gender === 1 ? "남성" : data.gender === 2 ? "여성" : ""}
              </p>
            </div>
          </>
        )}
      </div>
      <div css={s.crewStats}>
        <div css={s.mainStat}>{getMainValue()}</div>
        {mode === "crew" && type !== "member" && (
          <div css={s.subStat}>멤버 {data.memberCount}명</div>
        )}
      </div>
    </div>
  );
}

export default RankingCard;
