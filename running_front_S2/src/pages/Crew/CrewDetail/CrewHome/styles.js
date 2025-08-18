import { css } from "@emotion/react";

export const mainBox = css`
  flex: 1;
  padding-left: 2rem;
`;

export const mainLine = css`
  padding-left: 1rem;
`;

export const fontBold = css`
  font-weight: bold;
  font-size: 2rem;

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

    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
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
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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

export const Button = css`
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
  gap: 1rem;
  margin: 1rem 0;
  padding: 0.5rem;
  border-radius: 0.5rem;
`;

export const memberBox = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
`;

export const member = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

export const memberImg = css`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  overflow: hidden;
  background-color: #e0e0e0;
  flex-shrink: 0;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const memberInfo = css`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex: 1;
`;

export const memberName = css`
  font-size: 0.9rem;
  font-weight: bold;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const memberStatus = css`
  font-size: 0.8rem;
  color: gray;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;