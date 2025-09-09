import { css } from "@emotion/react";

export const layout = css`
  text-align: center;
  margin: 0 auto;
  width: 100%;
  min-width: 0;
  padding-bottom: 3rem;
`;

export const registerBtn = css`
  display: flex;
  justify-content: flex-end;

  & > button {
    width: auto;
    padding: 0.6rem 1.2rem;
    background: var(--main-color);
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
  }
`;

export const headerContainer = css`
  display: flex;
  justify-content: right;
  margin: 3rem 0;
`;

export const searchBar = css`
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

export const gatheringMain = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem 2rem;
  padding-bottom: 4rem;
`;

export const gatheringContainer = css`
  width: auto;
  border: 0.1rem solid #aaa;
  border-radius: 0.5rem;
`;

export const thumbnailImg = css`
  width: 100%;
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
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  // font-size: 1.3rem;

  & > div > div {
    display: flex;
  }

  & > div > div > div {
    align-items: center;
  }

  & svg {
    color: #aaa;
    margin-right: 1rem;
  }

  & > div:nth-of-type(1) {
<<<<<<< HEAD
    // font-size: 1.8rem;
    // font-weight: 700;
=======
    text-align: left;
    padding-bottom: 1rem;
    font-size: 1.8rem;
    font-weight: 700;
>>>>>>> origin/128-세부내용-수정
  }
`;

export const gatheringDetailContainer = css`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
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
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;

  & div:nth-of-type(1) {
    display: flex;
  }
`;

export const status = css`
  & > div {
    padding: 0.5rem 0.8rem;
    color: #fff;
    // font-weight: bold;
    border-radius: 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    // font-weight: 500;
  }
`;

export const recruiting = css`
  background-color: #28a745;
`;

export const closed = css`
  background-color: #676767;
`;

export const noGatheringMessage = css`
  color: #888;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
`;

// export const closedOverlay = css`
//   position: relative;

//   &::after {
//     content: "";
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(0, 0, 0, 0.3);
//     border-radius: 0.5rem;
//   }
// `;
