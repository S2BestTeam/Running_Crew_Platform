import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  flex-direction: row;
  padding-top: 2rem;
`;

export const crewInfoBox = css`
  display: flex;
  align-items: center;
  padding: 3rem 1rem 2rem 1rem;
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

export const navButton = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  width: 100%;
  text-align: left;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export const newBadge = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 6px;
  background: #ff4757;
  color: white;
  font-size: 10px;
  font-weight: bold;
  border-radius: 8px;
  margin-left: 8px;
  min-width: 28px;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

/* 또는 더 심플한 스타일 */
export const newBadgeSimple = css`
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #ff4757;
  border-radius: 50%;
  margin-left: 8px;
  animation: blink 1.5s infinite;
  
  @keyframes blink {
    0%, 50% {
      opacity: 1;
    }
    51%, 100% {
      opacity: 0.3;
    }
  }
`;

/* 숫자 뱃지 스타일 */
export const numberBadge = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  background: #ff4757;
  color: white;
  font-size: 11px;
  font-weight: bold;
  border-radius: 9px;
  margin-left: 8px;
  padding: 0 4px;
`;

export const newBadge1 = css`
  padding: 1px 6px;
  font-size: 11px;
  border: 1px solid var(--point-color);
  border-radius: 999px;
  line-height: 1;
`;