import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  width: 100%;
  background: #ffffff;
`;

export const userInfoContainer = css`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: #ffffff;
  border-radius: 1rem;
  padding: 3rem 4rem;
  border: 0.1rem solid #e5e5e5;
  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.05);
  max-width: 70rem;
  width: 100%;
`;

export const title = css`
  font-size: 2rem;
  font-weight: 700;
  color: #111111;
  border-bottom: 0.1rem solid #e5e5e5;
  padding-bottom: 1rem;
`;

export const profileSection = css`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 2rem;
`;

export const profileImgBox = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #e5e5e5;
  border-radius: 50%;
  width: 10rem;
  height: 10rem;
  overflow: hidden;
  background: #f9f9f9;
  transition: all 0.3s ease;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover::after {
    position: absolute;
    content: "프로필 변경";
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.55);
    color: #ffffff;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
`;

export const myRank = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
`;


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

export const saveButton = css`
  position: absolute;
  top: 3rem;
  right: 2rem;
  background: #111111;
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  border-radius: 0.6rem;
  padding: 0.8rem 3rem;
  cursor: pointer;
  transition: all 0.3s ease;

  :hover {
    background: #333333;
  }
`;

export const field = css`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

export const nameNicknameRow = css`
  display: flex;
  align-items: end;
  gap: 2rem;
  width: 100%;
`;

export const nameField = css`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  flex: 1;
  min-width: 20rem;
`;

export const nicknameField = css`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  flex: 1;
  min-width: 20rem;
`;

export const label = css`
  font-size: 1rem;
  font-weight: 500;
  color: #333333;
`;

export const value = css`
  font-size: 1.2rem;
  flex: 1;
  color: #111111;
  padding: 0.8rem 1rem;
  background: #f9f9f9;
  border: 0.1rem solid #e5e5e5;
  border-radius: 0.6rem;
`;

export const input = css`
  flex: 1;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.8rem 1rem;
  border: 0.1rem solid #e5e5e5;
  border-radius: 0.6rem;
  font-size: 1rem;
  background: #fff;
  color: #111;
  height: 2rem;

  &:focus {
    outline: none;
    border-color: #111;
  }
`;

export const inputRow = css`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

export const checkButtonWrapper = css`
  display: flex;
  align-items: end;
  padding-bottom: 0.1rem;
`;

export const checkButton = css`
  font-size: 1.3rem;
  font-weight: bold;
  padding: 0.8rem 1.6rem;
  background: #dbdbdb;
  color: #000;
  border: none;
  border-radius: 0.6rem;
  font-size: 1.4rem;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 3.6rem;

  :hover {
    background: #acababff;
  }
`;

export const phoneinput = css`
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem 1rem;
  border: 0.1rem solid #e5e5e5;
  border-radius: 0.6rem;
  background: #fff;
  color: #111;
  height: auto;

  &:focus {
    outline: none;
    border-color: #111;
  }
`;

export const subText = css`
  font-size: 0.9rem;
  color: #5f5f5f;
`;

export const nicknameErrMsg = css`
  position: absolute;
  bottom: -2.8rem;
  left: 1rem;
  font-size: 1rem;
  color: red;
  white-space: nowrap;
`;

export const errMsg = css`
  position: absolute;
  bottom: -2.8rem;
  left: 1rem;
  font-size: 1rem;
  color: red;
  white-space: nowrap;
`;
