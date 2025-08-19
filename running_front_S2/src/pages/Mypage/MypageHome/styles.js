import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  width: 100%;
  padding: 3rem 4rem 2rem 8rem;
`;

export const userInfoContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const title = css`
  font-size: 3rem;
  font-weight: bold;
`;

export const profileImgBox = css`
position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 0.1rem solid #dbdbdb;
  border-radius: 50%;
  width: 8rem;
  height: 8rem;
  overflow: hidden;

  & > input[type="file"] {
    display: none;
  }

  & > img {
    height: 100%;
  }

  &:hover::after {
    position: absolute;
    content: "프로필 변경";
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00000088;
    color: #ffffff;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
`;

export const TextFieldBox = css`
  display: flex;
  flex-direction: column;
  width: 80rem;
`;

export const line = css`  
  & > div {
    padding-bottom: 2rem;
  }
`;

export const button = css`
  justify-content: space-around;
`;

export const nickNameBox = css`
  display: flex;
  flex-direction: row;

  & > button {
    font-size: 1rem;
    margin-left: 2rem;
    border: none;
    border-radius: 0.5rem;

    :hover {
      background-color: rgba(71, 216, 91, 0.5);
    }
  }
`;

export const aAndbImg = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2rem;
`;

export const aAndb = css`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`;

export const oauthType = css`
  padding-left: 1rem;
  font-size: 1rem;
  font-weight: 300;
`;
