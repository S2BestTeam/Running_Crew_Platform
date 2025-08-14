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
  border: 0.1rem solid #dbdbdb;
  border-radius: 0.5rem;
  width: 18rem;
  padding: 1rem;
  background-color: #ffffff;
  top: 0;
`;

export const crewInfoBox = css`
  display: flex;
  align-items: center;
  padding: 3rem 1rem 2rem 1rem;
  border-bottom: 0.1rem solid #dbdbdb;
`;

export const crewImgBox = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 1rem;
  width: 4rem;
  height: 4rem;
  background-color: black;
`;

export const crewNameBox = css`
  font-size: 1.4rem;
  font-weight: bold;
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

export const getout = css`
  padding-top: 4rem;

  & > button {
    width: 100%;
    padding: 0.6rem;
    background-color: rgba(129, 126, 126, 0.1);
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;

    :hover {
      font-weight: bold;
      background-color: rgba(251, 72, 72, 0.4);
    }
  }
`;

export const mainBox = css`
  flex: 1;
  padding-left: 2rem;
`;

export const titleBox = css`
  border: 0.1rem solid #dbdbdb;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: #fff;
`;

export const banner = css`
  width: 100%;
  height: 20rem;
  overflow: hidden;
  position: relative;

  & > div {
    width: 100%;
    height: 100%;
    background-color: black;
    display: block;
  }
  /* & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  } */
`;

export const crewInfoSection = css`
  position: relative;
  padding: 3rem 2rem 0.2rem;
  background-color: #fff;
  border-bottom: 1px solid #ddd;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const profileImg = css`
  position: absolute;
  top: -4rem;
  left: 2rem;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  border: 0.3rem solid #fff;
  overflow: hidden;
  background-color: #f0f0f0;

  & > div {
    width: 100%;
    height: 100%;
    background-color: #5f5f5f;
  }
  /* & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  } */
`;

export const crewTextBox = css`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
  }

  p {
    font-size: 1.4rem;
    color: #555;
  }
`;

export const crewText = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  & > p {
    padding-right: 1rem;
  }
`;

export const gungu = css`
  border: 0.1rem solid #dbdbdb;
  border-radius: 0.5rem;
  padding-left: 1rem;
  margin-right: 1rem;
  background-color: #f0f0f0;
`;

export const joinButton = css`
  margin-top: 4rem;
  padding: 0.8rem 2rem;
  background-color: black;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

export const memberContainer = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
  overflow-x: auto;
  padding: 0.5rem;
  border-radius: 0.5rem;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const memberBox = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

export const member = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 6rem;
  cursor: pointer;
`;

export const memberImg = css`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  overflow: hidden;
  background-color: #e0e0e0;
  margin-bottom: 0.3rem;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const memberNS = css`
  display: flex;
  flex-direction: column;
`;

export const memberName = css`
  font-size: 0.9rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const memberStatus = css`
  font-size: 0.8rem;
  color: gray;
  text-align: center;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;