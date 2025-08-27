/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: 'Noto Sans KR', sans-serif;
  color: #333;
`;

export const header = css`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 12px;
  text-align: center;
`;

export const main = css`
  display: flex;
  flex-direction: column;
  gap: 16px;

  div {
    line-height: 1.6;
  }

  h4 {
    margin: 12px 0 6px;
    font-size: 1rem;
    font-weight: 600;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    li {
      display: flex;
      align-items: center;
      gap: 6px;
      background: #f5f5f5;
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 0.875rem;
    }
  }

  button {
    padding: 10px 16px;
    border-radius: 8px;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      opacity: 0.9;
    }
  }
`;

export const thumbnail = css`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid #e0e0e0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const profile = css`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #ccc;
  }

  span {
    font-weight: 500;
    font-size: 0.9rem;
  }
`;
