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
  width: 17rem;
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
  padding-top: 2rem;
  gap: 0.5rem;
`;

export const cancleButton = css`
  padding: 0.4rem 1rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background: #c82333;
  }
`;

export const okButton = css`
  padding: 0.4rem 1rem;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background: #218838;
  }
`;