import { css } from "@emotion/react";

export const container = css`
    text-align: center;
    margin: 0 auto;
    width: 100%;
`;

export const table = css`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
`;


export const th = css`
  padding: 1.2rem;
  border-bottom: 0.2rem solid #000;
  font-weight: 600;
`;

export const td = css`
  padding: 2rem;
  border-bottom: 1px solid #eee;
`;

export const tdTitle = css`
  ${td};
  text-align: left;
`;

export const button = css`
  font-size: 1.3rem;
  border-radius: 0.5rem;
  margin-left: 1rem;
  background: #000;
  color: white;
  cursor: pointer;

  &:disabled {
    background: #ccc;
    color: #666;
    cursor: not-allowed;
  }
`;