import { css } from "@emotion/react";

export const mainBox = css`
  width: 96%;
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

export const profilePicture = css`
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
////////////////////////////
export const gatheringRow = css`
  display: flex;
  gap: 16px;
  align-items: stretch;
`;

// 카드 하나
export const gatheringItem = css`
  display: flex;
  gap: 12px;
  align-items: center;
  width: 230px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 10px 12px;
  background: #fff;
`;

// 썸네일
export const gatheringThumbWrap = css`
  width: 64px;
  height: 64px;
  border-radius: 8px;
  overflow: hidden;
  background: #f3f4f6;
  flex-shrink: 0;
`;

export const gatheringThumb = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const gatheringTextBox = css`
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0; 
`;

export const gatheringTitle = css`
  font-weight: 700;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const gatheringPlace = css`
  font-size: 13px;
  color: #4b5563;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const gatheringDate = css`
  font-size: 10px;
  color: #6b7280;
`;
////////////////////////////////////

export const memberRow = css`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 5rem;
`;

export const memberItem = css`
  display: flex;
  box-sizing: border-box;
  border: solid #dbdbdb 0.1rem;
  align-items: center;
  gap: 12px;
  min-width: 160px;
`;

export const avatarWrap = css`
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 9999px;
  overflow: hidden;
  background: #eee;
`;

export const avatar = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const badge = css`
  left: 4px;         
  bottom: 4px;     
  font-size: 16px;
  line-height: 1;
`;

export const textBox = css`
  display: flex;
  flex-direction: column;
  line-height: 1.2;
`;

export const nickname = css`
  font-weight: 700;
  font-size: 14px;
`;

export const fullName = css`
  font-size: 12px;
  color: #6b7280;
`;

export const moreBtn = css`
  margin-left: auto;         
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1px solid #e5e7eb;
  background: transparent;
  cursor: pointer;

  &:hover {
    background: #f3f4f6;
  }
`;