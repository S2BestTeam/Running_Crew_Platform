import { css } from "@emotion/react";

export const gatheringMain = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem 2rem;
`;

export const gatheringContainer = css`
  width: 25rem;
  border: 0.1rem solid #aaa;
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
  & > div {
    width: 5rem;
    height: 2.5rem;
    color: #fff;
    font-weight: bold;
    border-radius: 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
  }
`;

export const recruiting = css`
  background-color: #28a745;
`;

export const closed = css`
  background-color: #969696;
`;

export const closedOverlay = css`
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3); 
    border-radius: 0.5rem; 
  }

`;