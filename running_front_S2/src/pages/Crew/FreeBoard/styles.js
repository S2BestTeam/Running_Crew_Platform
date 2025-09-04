import { css } from "@emotion/react";

export const container = css`
  text-align: center;
  margin: 0 auto;
  width: 100%;
`;


export const tabActive = css`
  color: #000;
  font-weight: 500;
`;

export const searchBox = css`
  display: flex;
  justify-content: right;
  align-items: center;
  margin: 2rem 0 2rem 0;
  flex: 1 1 auto;   /* 남는 공간 채우기 + 줄어들 수 있게 */
  min-width: 0;     /* flex 자식이 부모 폭을 넘지 않게 */
`;

export const inputGroup = css`
  display: flex;
  min-width: 0;   /* 부모 폭 제한 */
`;

export const searchInput = css`
  flex: 1 0 auto;  /* 남는 공간 채우기 + 줄어들기 허용 */
  min-width: 0;    /* flex 자식이 부모 폭을 넘지 않게 */
  height: 3.425rem;
  box-sizing: border-box;
  padding: 0.8rem;
  border: 0.1rem solid #dbdbdb;
  border-right: none;
  border-radius: 0.5rem 0 0 0.6rem;
  outline: none;
`;

export const searchButton = css`
  height: 3.425rem;
  box-sizing: border-box;
  padding: 0.8rem 1.2rem;
  border: 0.1rem solid #dbdbdb;
  border-left: none;
  background: #000;
  color: white;
  border-radius: 0 0.6rem 0.6rem 0;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
`;


export const registerButton = css`
  width: 12rem;
  border: none;
  padding: 0.6rem;
  background: #000;
  color: white;
  border-radius: 0.6rem;
  cursor: pointer;
  align-items: center;
  justify-content: center;
`;


export const table = css`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
`;

export const tr = css`
  cursor: pointer;

  :hover {
    background-color: #cececeff;
  }
`;

export const th = css`
  padding: 1.2rem;
  border-bottom: 0.2rem solid #000;
  font-weight: 600;
`;

export const td = css`
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

export const tdTitle = css`
  ${td};
  text-align: left;
`;