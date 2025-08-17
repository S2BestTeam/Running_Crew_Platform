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

export const memberItem = css`
  display: flex;
  align-items: center;
  padding: 0.6rem 0.8rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;
`;

export const profileImg = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 0.8rem;
`;

export const memberInfo = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0; /* ellipsis 잘리게 */
`;

export const nickname = css`
  font-size: 0.95rem;
  font-weight: bold;
  color: #222;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const fullName = css`
  font-size: 0.8rem;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const roleIcon = css`
  margin-left: 0.5rem;
  font-size: 1rem;
  color: gold;
`;