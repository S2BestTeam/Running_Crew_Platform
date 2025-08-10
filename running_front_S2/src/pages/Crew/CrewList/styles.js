import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 4.8rem 12rem;
  background-color: #fff;
`;

export const searchBox = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 1.2rem;
  border: 1px solid #ccc;
  border-radius: 0.6rem;
  background-color: #fff;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);
  height: 56px;
`;

export const selectInput = css`
  width: 88px;
  height: 36px;
  padding: 0.24rem 0.48rem;
  font-size: 0.76rem;
  border: 1px solid #ccc;
  border-radius: 0.4rem;
  background-color: #fff;
  color: #333;
`;

export const searchGroup = css`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const searchInput = css`
  height: 36px;
  padding: 0.36rem 0.72rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.4rem;
  width: 200px;

  &:focus {
    border-color: black;
    outline: none;
  }
`;

export const searchBtn = css`
  height: 42px;
  padding: 0 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  background-color: black;
  color: white;
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

export const gridContainer = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3.2rem;
  padding-top: 1.6rem;
`;

export const crewCard = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  padding: 1.6rem 1.2rem;
  background-color: #f9f9f9;
  border-radius: 0.8rem;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
  }
`;

export const crewImageBox = css`
  width: 240px;
  height: 176px;
  background-color: #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 0.8rem;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const crewName = css`
  font-size: 2.08rem;
  font-weight: 700;
  color: #111;
  text-align: center;
`;

export const crewDescription = css`
  font-size: 1.2rem;
  color: #444;
  text-align: center;
  line-height: 1.4;
<<<<<<< HEAD
`;
=======
`;
>>>>>>> origin/14-마이페이지-수정-기능-및-css-작업
