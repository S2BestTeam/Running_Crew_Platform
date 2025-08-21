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
  height: 5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  box-sizing: border-box;
`;

export const buttons = css`
  display: flex;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

export const cancelButton = css`
  flex: 1;
  padding: 0.75rem 1rem;
  background: #fff;
  color: #000;
  border: 2px solid #000;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background: #000;
    color: #fff;
  }
`;

export const confirmButton = css`
  flex: 1;
  padding: 0.75rem 1rem;
  background: #000;
  color: #fff;
  border: 2px solid #000;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background: #333;
    border-color: #333;
  }
`;