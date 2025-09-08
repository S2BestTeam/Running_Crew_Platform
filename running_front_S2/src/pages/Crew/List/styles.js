import { css } from "@emotion/react";

export const layout = css`
  width: 100%;
  text-align: center;
`;

export const headerBox = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
`;

export const selectBox = css`
  width: 11rem;
  height: 3.425rem;
  padding: 0.24rem 0.48rem;
  font-size: 0.76rem;
  border-radius: 0.4rem;
  background-color: #fff;
  color: #333;
  font-size: 1.4rem;

  .MuiOutlinedInput-notchedOutline {
    border-color: #ccc;
  }
  &:hover .MuiOutlinedInput-notchedOutline {
    border-color: #333;
  }
  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #000 !important;
  }
`;

export const menuItem = css`
  font-size: 1.4rem;
`;

export const inputGroup = css`
  display: flex;
`;

export const searchInput = css`
  height: 3.425rem;
  box-sizing: border-box;
  padding: 0.8rem;
  border: 0.1rem solid var(--main-color);
  border-right: none;
  border-radius: 0.6rem 0 0 0.6rem;
  outline: none;
`;

export const searchButton = css`
  display: flex;
  height: 3.425rem;
  box-sizing: border-box;
  padding: 0.5rem 0.5rem;
  border: 0.1rem solid var(--main-color);
  border-left: none;
  background: #fff;
  color: var(--main-color);
  font-size: 1.8rem;
  border-radius: 0 0.6rem 0.6rem 0;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
`;

export const registerButton = css`
  width: auto;
  padding: 0.6rem 1.2rem;
  background: #000;
  color: white;
  border: none;
  border-radius: 0.6rem;
  cursor: pointer;
  align-items: center;
  justify-content: center;
`;

export const gridBox = css`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(5, 1fr);
  gap: 2.5rem;
  margin: 3rem 0;
`;

export const cards = css`
  width: 100%;
  border-radius: 0.8rem;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const tumbnailBox = css`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const heartIcon = css`
  position: absolute;
  bottom: 0.6rem;
  right: 2rem;
  font-size: 3.5rem;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

export const textBox = css`
  padding: 0.5rem;
  text-align: left;
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
  font-size: 1.7rem;
`;

export const crewTitle = css`
  font-size: 1.7rem;
  color: #333;
`;

export const rankingBox = css`
  display: flex;
  padding: 0.5rem;
  font-weight: 500;
  color: #fff;
  gap: 0.5rem; 
  margin-top: 0.5rem;

  & > div {
    width: 7rem;
    height: 2.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.3rem;
  }
`;

export const topRanking = css`
  background-color: #f5383f;
`;

export const newRanking = css`
  background-color: #1f1f21;
`;
