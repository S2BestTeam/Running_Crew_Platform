import { css } from "@emotion/react";

export const headerlayout = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 1rem 0.5rem;
  gap: 1rem;
`;

export const moreButton = css`
  border: none;
  border-radius: 1rem;
  width: 8rem;
  height: 3rem;
  background: #5f5f5f;
  color: white;
  cursor: pointer;

  :hover {
    background: black;
  }
`;

export const layout = css`
  display: flex;
  flex-direction: row;
  gap: 5rem;
  padding: 1.5rem;
`;

export const section = css`
  display: flex;
  flex-direction: column;
  width: 40rem;
  gap: 1rem;
  padding-bottom: 3rem;
`;

export const sectionTitle = css`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

export const rankingList = css`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const notice = css`
  text-align: center;
  color: #666;
  font-size: 0.875rem;
`;

// RankingCard 스타일
export const card = (rank) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 12px;
  background: white;
  margin-bottom: 1rem;

  ${rank === 1 && `box-shadow: 0 4px 10px rgba(255, 217, 0, 0.9);`}
  ${rank === 2 && `box-shadow: 0 4px 8px rgba(255, 217, 0, 0.6);`}
  ${rank === 3 && `box-shadow: 0 4px 6px rgba(255, 217, 0, 0.4);`}
  ${rank > 3 && `box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);`}
`;

export const rankBadge = css`
  font-size: 1rem;
  width: 3rem;
  text-align: center;
  padding-right: 1rem;
`;

export const crewInfo = css`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
`;

export const avatar = css`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  background: #f5f5f5;
`;

export const crewName = css`
  font-size: 1rem;
  font-weight: 600;
`;

export const crewLocation = css`
  font-size: 0.875rem;
  color: #777;
`;

export const crewStats = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
`;

export const mainStat = css`
  font-size: 1.2rem;
  font-weight: 700;
`;

export const subStat = css`
  font-size: 0.875rem;
  color: #555;
`;

// 나의 등수 카드 스타일
export const myRankCard = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1 1 20rem;
  padding: 1rem;
  border-radius: 1.2rem;
  box-shadow: 0 0.6rem 1rem rgba(0,0,0,0.2);
  background-color: #fff;
  text-align: center;
`;

export const rankingInfo = css`
  
`;

export const myRankTitle = css`
  font-size: 1.4rem;
  color: #555;
  margin-bottom: 1rem;
`;

export const myRankNumber = css`
  font-size: 2rem;
  font-weight: bold;
  color: black;
  margin-bottom: 0.5rem;
`;

export const myRankSub = css`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;
