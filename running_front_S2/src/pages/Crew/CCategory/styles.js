import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  flex-direction: row;
  padding-top: 2rem;
`;

export const crewInfoBox = css`
  display: flex;
  align-items: center;
  padding: 2rem;
  border-bottom: 0.1rem solid #dbdbdb;
  cursor: pointer;
`;

export const crewImgBox = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 1rem;
  width: 4rem;
  height: 4rem;
  background-color: var(--main-color);
  overflow: hidden;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

export const crewNameBox = css`
  font-weight: bold;
`;


export const getout = css`
  padding-top: 4rem;

  & > button {
    width: 100%;
    padding: 0.6rem;
    background-color: var(--hB-color);
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;

    :hover {
      font-weight: bold;
      background-color: #c1c1c1ff;
    }
  }
`;

export const newBadge1 = css`
  padding: 1px 6px;
  border: 1px solid var(--point-color);
  border-radius: 999px;
  line-height: 1;
`;