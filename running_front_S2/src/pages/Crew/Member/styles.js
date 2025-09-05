import { css } from "@emotion/react";

export const layout = css`
  text-align: center;
  margin: 0 auto;
  width: 100%;
  min-width: 0;
  padding-bottom: 3rem;
`;

export const asd = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const searchBar = css`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-left: auto;

  > input {
    flex: 1 1 auto;
    width: 50%;
    height: 36px;
    padding: 0 12px;
    font-size: 14px;
    border: 1px solid #dbdbdb;
    border-radius: 0.5rem;
    outline: none;
  }

  > button {
    flex: 0 0 auto;
    height: 3.6rem;
    padding: 0 1.2rem;
    font-size: 1.4rem;
    border: 0.1rem solid var(--sub-color);
    border-radius: 0.5rem;
    background: var(--main-color);
    color: white;
    cursor: pointer;
    white-space: nowrap;
    &:hover { 
      background: var(--sub-color); 
    }
  }
`;

export const scrollBox = css`
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 0.5rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const memberItem = css`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid #f2f2f2;
  border-radius: 0.5rem;
  background: #fff;
  cursor: pointer;
  transition: background 0.15s ease, box-shadow 0.15s ease;
  min-width: 0;

  &:hover {
    background: var(--sub-color);
  }
`;

export const memberInfo = css`
  display: flex;
  align-items: center;
  min-width: 0;
  flex: 1;
`;

export const profileImg = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
  flex-shrink: 0;
`;

export const textBox = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  align-items: flex-start;     
  min-width: 0;
  word-break: break-word;
  gap: 0.2rem; 
`;

export const nickname = css`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 700;
  font-size: 1.5rem;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const fullName = css`
  align-self: flex-start;   /* 부모의 왼쪽에 붙도록 보장 */
  color: #888;
  font-size: 1.3rem;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;