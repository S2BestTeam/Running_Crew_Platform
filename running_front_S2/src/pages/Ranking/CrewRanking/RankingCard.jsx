/** @jsxImportSource @emotion/react */
import * as s from "./styles";

function RankingCard({ crew, rank, type }) {
  const getRankIcon = (rank) => {
    if (rank === 1) return <h2>🥇</h2>;
    if (rank === 2) return <h3>🥈</h3>;
    if (rank === 3) return <h4>🥉</h4>;
    return `${rank}위`;
  };

  const getMainValue = () => {
    switch (type) {
      case 'distance':
        return `${crew.totalKm}km`;
      case 'member':
        return `${crew.memberCount}명`;
      case 'new':
        return new Date(crew.createdAt).toLocaleDateString();
      case 'region':
        return crew.title || crew.description || '';
      default:
        return '';
    }
  };

  return (
    <div css={s.card(rank)}>
      <div css={s.rankBadge}>{getRankIcon(rank)}</div>
      <div css={s.crewInfo}>
        <img src={crew.profilePicture} alt={crew.crewName}css={s.avatar}/>
        <div>
          <h3 css={s.crewName}>{crew.crewName}</h3>
          <p css={s.crewLocation}>{crew.gunguName}</p>
        </div>
      </div>
      <div css={s.crewStats}>
        <div css={s.mainStat}>{getMainValue()}</div>
        {type !== 'member' && (
          <div css={s.subStat}>멤버 {crew.memberCount}명</div>
        )}
      </div>
    </div>
  );
}

export default RankingCard;