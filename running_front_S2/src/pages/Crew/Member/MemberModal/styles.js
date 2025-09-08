import { css } from '@emotion/react';

export const modalStyles = {
  overlay: {
    backgroundColor: "#000000aa",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    fontSize: "1.6rem" 
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
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const contentStyle = css`
  padding: 16px;
`;

export const loadingStyle = css`
  text-align: center;
  color: #666;
`;

export const errorStyle = css`
  color: crimson;
  text-align: center;
`;

export const detailGridStyle = css`
  display: grid;
  row-gap: 15px;
`;

export const profileImageStyle = css`
  width: 64px;
  height: 64px;
  border-radius: 50%;
`;

export const infoItemStyle = css`
  font-size: 1.4rem;
  
  b {
    font-weight: 600;
    color: #333;
  }
`;

export const actionsStyle = css`
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid #eee;
  justify-content: flex-end;
`;

export const actionButtonStyle = css`
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.4rem;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #f8f9fa;
    border-color: #adb5bd;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const expelButtonStyle = css`
  ${actionButtonStyle};
  background: #dc3545;
  color: white;
  border-color: #dc3545;

  &:hover:not(:disabled) {
    background: #c82333;
    border-color: #bd2130;
  }
`;