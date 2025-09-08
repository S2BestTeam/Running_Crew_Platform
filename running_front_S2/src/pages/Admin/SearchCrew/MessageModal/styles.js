import { css } from "@emotion/react";

export const backdrop = css`
  position: fixed; 
  inset: 0;
  background: rgba(0,0,0,.45);
  display: flex; 
  align-items: center; 
  justify-content: center;
  z-index: 99999;
`;

export const modal = css`
  width: 420px; 
  max-width: calc(100vw - 32px);
  background: #fff; 
  border-radius: 12px; 
  padding: 16px;
  box-shadow: 0 12px 36px rgba(0,0,0,.28);
`;

export const headerRow = css`
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:8px;
`;

export const title = css`
  margin:0;
  font-size:16px;
  font-weight:700;
`;

export const closeBtn = css`
  border:none;
  background:transparent;
  font-size:22px;
  cursor:pointer;
`;

export const meta = css`
  font-size:12px;
  color:#6b7280;
  margin-bottom:8px;
`;

export const textarea = css`
  width:100%;
  min-height:120px;
  resize:vertical;
`;

export const footer = css`
  display:flex;
  gap:8px;
  justify-content:flex-end;
  margin-top:12px;
`;

export const cancelBtn = css`
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

export const submitBtn = css`
  padding: 0.4rem 1rem;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background: #218838;
  }

  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

