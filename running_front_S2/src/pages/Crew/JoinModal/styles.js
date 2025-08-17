import { css } from "@emotion/react";

export const background = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const modalBox = css`
  background: #fff;
  padding: 2rem;
  border-radius: 1rem;
  width: 400px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
`;

export const input = css`
  width: 100%;
  margin: 0.5rem 0 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
`;

export const buttons = css`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;