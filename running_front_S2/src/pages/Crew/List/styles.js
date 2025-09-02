import { css } from "@emotion/react";

export const layout = css`
  width: 100%;
`;

export const headerBox = css`
  display: flex;
  flex-direction: row;
  padding-top: 2rem;
`;

export const gridBox = css`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.6rem;
  padding: 1.6rem;
`;

export const cards = css`
  border-radius: 0.8rem;
  padding: 1.2rem;
  cursor: pointer;
`;

export const tumbnailBox = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25rem;
  height: 25rem;
  overflow: hidden;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
  }
`;

export const heartIcon = css`
  position: absolute;
  bottom: 0.6rem;
  right: 2rem;
  font-size: 3.2rem;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

export const textBox = css`
  padding: 0.5rem;
  margin-top: 0.3rem;
`;

export const gungu = css`
  color: #7b7b7b;
  padding: 0.6rem 0 0.6rem 0;
  font-size: 1.4rem;
  font-weight: 500;
`;

export const crewName = css`
  font-weight: bold;
  margin-right: 0.5rem;
    font-size: 1.6rem;
`;

export const crewTitle = css`
  font-size: 1.6rem;
  color: #333;
`;

export const rankingBox = css`
  display: flex;
  padding: 0.5rem;
  font-weight: 500;
  text-align: center;
    border-radius: 0.4rem;

`;

export const topRanking = css`
  width: 7rem;
  height: 2.8rem;
  background-color: purple;
  color: #fff;
  border-radius: 0.3rem;
  margin-right: 0.5rem;

`;
export const newRanking = css`
  width: 7rem;
  height: 2.8rem;
  background-color: green;
  color: #fff;
  border-radius: 0.3rem;

`;