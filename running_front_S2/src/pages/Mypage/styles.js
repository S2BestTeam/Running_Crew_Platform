import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  flex-direction: row;
  padding-top: 2rem;
`;

export const leftBox = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 0.5rem;
  width: 20rem;
  padding: 1rem;
  background-color: #ffffff;
  top: 0;
`;

export const userSimpleInfo = css`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding-bottom: 1.6rem;
  border-bottom: 0.1rem solid black;
`;

export const profileImgBox = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  overflow: hidden;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const nick = css`
  font-size: 1.8rem;
  font-weight: bold;
`;

export const email = css`
  font-size: 1rem;
`;

export const buttonContainer = css`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;

  & > button {
    text-align: left;
    margin: 0.3rem 0;
    padding: 0.6rem;
    border-radius: 0.5rem;
    background-color: transparent;
    border: none;
    cursor: pointer;

    :hover {
      font-weight: bold;
      background-color: rgba(129, 126, 126, 0.1);
    }
  }
`;

export const mainBox = css`
  padding-left: 1rem;
`;