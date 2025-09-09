import { css } from '@emotion/react';

export const modalStyles = {
  overlay: {
    backgroundColor: "#000000aa",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  content: {
    position: "static",
    inset: "unset",
    border: "none",
    borderRadius: "12px",
    padding: 0,
    overflow: "hidden",
    background: "#fff",
    width: 500,
    maxWidth: "calc(100% - 24px)",
    boxShadow: "0 10px 30px rgba(0,0,0,.2)",
  },
};

export const headerStyle = css`
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  // font-weight: 700;
`;

export const contentStyle = css`
  padding: 16px;
`;

export const nicknameStyle = css`
  margin-bottom: 8px;
`;

export const textareaStyle = css`
  width: 100%;
  height: 120px;
  resize: none;
`;

export const buttonContainerStyle = css`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
`;

export const cancleButton = css`
  padding: 0.4rem 1rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  // font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background: #c82333;
  }
`;

export const reportButton = css`
  padding: 0.4rem 1rem;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  // font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background: #218838;
  }
`;