import { css } from "@emotion/react";

export const gatheringMain = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem 2rem;
`;

export const gatheringContainer = css`
  width: 25rem;
  border: 0.1rem solid #dbdbdb;
  border-radius: 0.5rem;
`;

export const thumbnailImg = css`
  width: 25rem;
  height: 15rem;
  background-color: #ebebeb;
  border-radius: 0.4rem 0.4rem 0 0;
  overflow: hidden;
  border-bottom: 0.1rem solid #dbdbdb;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const gatheringInfoContainer = css`
  padding: 2rem;
  height: 17rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 1.3rem;

  & > div {
    display: flex;
  }

  & > div > div {
    align-items: center;
  }

  & svg {
    color: #aaa;
    margin-right: 1rem;
  }

  & > div:nth-of-type(1) {
    font-size: 1.8rem;
    font-weight: 700;
  }
`;

export const profileImg = css`
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 1rem;
  background-color: #000;
  border-radius: 5rem;
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const statusContainer = css`
  justify-content: space-between;

  & div:nth-of-type(1) {
    display: flex;
  }
`;

export const status = css`
  width: 5rem;
  height: 2.5rem;
  background-color: green;
  color: #fff;
  border-radius: 0.2rem;
  display: flex;
  justify-content: center;
  font-weight: 500;
`;
