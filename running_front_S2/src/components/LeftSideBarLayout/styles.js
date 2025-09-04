import { css } from "@emotion/react";

export const layout = css`
  display: grid;
  grid-template-columns: 20rem minmax(0, 1fr); /* 1fr 셀도 0~남은공간 범위로 제한 */
  gap: 4rem;
  width: 100%;
  overflow: hidden; /* 전체 레이아웃 넘침 방지 */

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
  height: 60rem;
`;

export const buttonContainer = css`
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem;

  & > button {
    text-align: left;
    margin: 0.3rem 0;
    padding: 0.8rem;
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