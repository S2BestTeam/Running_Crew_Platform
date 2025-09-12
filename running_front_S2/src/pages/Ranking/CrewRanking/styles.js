import { css } from "@emotion/react";

export const headerlayout = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 1rem 0.5rem;
  gap: 1rem;
`;

export const head = css`
  text-align: center;
`;

export const headFont = css`
  margin: 0;
  color: gray;
  padding: 1rem;
  text-align: left;
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
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  gap: 3rem;

  @media (max-width: 64rem) {
    flex-direction: column;
    gap: 1.5rem;
    padding: 0 1rem;
  }
`;

export const section = css`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 3rem;

  @media (max-width: 64rem) {
    min-width: 100%;
    flex: none;
    padding-bottom: 2rem;
  }
`;

export const sectionTitle = css`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  height: 4rem;
  border-radius: 0.5rem;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: #f1f1f1;
  color: var(--main-color);
`;

export const rankingList = css`
  display: flex;
  flex-direction: column;
  /* gap: 1rem; */
`;

export const notice = css`
  text-align: center;
  color: black;
  // font-size: 0.875rem;
`;

export const cardDiv = css`
  cursor: pointer;
  /* padding: 1rem; */
`;

export const card = (rank) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* border-radius: 0.5rem; */
  /* background: white; */
  padding: 2rem;
  border-bottom: 0.1rem solid var(--sub-color);

  /* :hover {
    transform: scale(1);
    ${rank === 1 && `box-shadow: 0 4px 10px rgba(0, 0, 0, 0.9);`}

    ${rank === 2 && `box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);`}
    
    ${rank === 3 && `box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);`}
    
    ${rank > 3 && `box-shadow: 0 2px 6px rgba(255, 255, 255, 0.1);`}
  } */
`;

export const rankBadge = css`
  width: 3rem;
  text-align: center;
  padding-right: 2rem;
`;

export const crewInfo = css`
  display: flex;
  align-items: center;
  gap: 1.4rem;
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
  font-weight: bold;
  margin: 0 0 0.5rem 0;
`;

export const crewLocation = css`
  font-size: 1.2rem;
  margin: 0;
  color: #555;
`;

// export const crewStats = css`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-end;
//   gap: 0.25rem;
//   padding-right: 1rem;
// `;

export const mainStat = css`
  font-weight: 600;
`;

// export const subStat = css`
//   font-size: 1.2rem;
//   color: #555;
// `;
