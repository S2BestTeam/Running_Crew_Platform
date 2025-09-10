/** @jsxImportSource @emotion/react */
import * as s from "./styles";

function RankingCard({ data, rank, type, mode }) {
  const getRankIcon = (rank) => {
    if (rank === 1) return <div style={{ fontSize: "3rem" }}>🥇</div>;
    if (rank === 2) return <div style={{ fontSize: "3rem" }}>🥈</div>;
    if (rank === 3) return <div style={{ fontSize: "3rem" }}>🥉</div>;
    return <div style={{ fontWeight: "500" }}>{rank}</div>;
  };

  // 메인 값
  const getMainValue = () => {
    if (mode === "crew") {
      switch (type) {
        case "distance":
          return `${data.totalKm} km`;
        case "member":
          return `${data.memberCount} 명`;
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
          return `${data.totalKm} km`;
        case "gathering":
          return `${data.gatheringCount} 회`;
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
            <img src={data.profilePicture} alt={data.crewName} css={s.avatar} />
            <div>
              <p css={s.crewName}>{data.crewName}</p>
              <p css={s.crewLocation}>{data.gunguName}</p>
            </div>
          </>
        ) : (
          <>
            <img src={data.picture} alt={data.nickname} css={s.avatar} />
            <div>
              <p css={s.crewName}>{data.nickname || data.fullName}</p>
              <p css={s.crewLocation}>{data.fullName}</p>
            </div>
          </>
        )}
      </div>
      <div css={s.crewStats}>
        <div css={s.mainStat}>{getMainValue()}</div>
        {mode === "crew" &&
          type !== "member" &&
          type !== "distance" &&
          type !== "new" && (
            <div css={s.subStat}>멤버 {data.memberCount}명</div>
          )}
      </div>
    </div>
  );
}

export default RankingCard;
