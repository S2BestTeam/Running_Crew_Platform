/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const layout = css`
  width: 96%;
`;

export const searchBar = css`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-auto-rows: min-content;
  gap: 8px;
  width: 100%;

  /* 1) input */
  > input {
    grid-column: 1 / 2;
    height: 36px;
    padding: 0 12px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 10px;
    outline: none;
  }

  /* 2) button */
  > button {
    grid-column: 2 / 3;
    height: 36px;
    padding: 0 12px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background: #fff;
    cursor: pointer;
    white-space: nowrap;
    &:hover { background: #fafafa; }
  }

  /* 3) 리스트 컨테이너(세 번째 자식 div)가 아래 행 전체를 차지 */
  > div {
    grid-column: 1 / -1;
  }
`;

/* ⬇️ 멤버 리스트 박스 (스크롤) */
export const scrollBox = css`
  width: 98%;
  overflow-y: auto;
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 14px;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

/* ⬇️ 멤버 아이템 (좌측 아바타 공간 고려해 여백만) */
export const memberItem = css`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border: 1px solid #f2f2f2;
  border-radius: 12px;
  background: #fff;
  cursor: pointer;
  transition: background 0.15s ease;
  &:hover { background: #fafafa; }
`;

export const memberInfo = css`
  display: flex;
  flex-direction: column;
`;

export const nickname = css`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  font-size: 15px;
  line-height: 1.2;
`;

export const roleIcon = css`
  font-size: 14px;
`;

export const fullName = css`
  color: #888;
  font-size: 13px;
`;
