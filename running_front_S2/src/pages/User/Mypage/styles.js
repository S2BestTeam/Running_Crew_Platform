import { css } from "@emotion/react";

export const container = css`
  display: flex;
  width: 100%;
  height: 100%;
`;


export const gender = css`
  display: flex;
  gap: 10px;
  max-width: 300px;
`;

export const box = css`
  flex: 1;
  border-radius: 6px;
  padding: 12px 24px;
  cursor: pointer;
  text-align: center;
  border: 2px solid #ccc;
  background-color: #fff;
`;

export const selectedBox = css`
  border-color: #4a90e2;
  background-color: #eaf2fc;
`;