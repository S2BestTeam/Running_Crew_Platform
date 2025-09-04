import { css } from "@emotion/react";

export const layout = css`
  width: 100%;
  min-width: 0;
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
    height: 36px;
    padding: 0 12px;
    font-size: 14px;
    border: 1px solid #dbdbdb;
    border-radius: 0.5rem;
    background: black;
    color: white;
    cursor: pointer;
    white-space: nowrap;
    &:hover { 
      background: gray; 
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
    background: #b4b4b4ff;
    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
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
  justify-content: center;
  min-width: 0;
  word-break: break-word;
  gap: 2px; /* 닉네임과 실명 간격 */
`;

export const nickname = css`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  font-size: 15px;
  line-height: 1.2;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const fullName = css`
  color: #888;
  font-size: 13px;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;