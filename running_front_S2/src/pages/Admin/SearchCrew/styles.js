import { css } from "@emotion/react";

export const container = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 3rem;
  box-sizing: border-box;
  font-size: 3rem;
`;

export const tableWrapper = css`
  flex: 1;
  overflow-y: auto;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;

export const table = css`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
  font-size: 1.2rem;

  thead {
    position: sticky;
    top: 0;
    background: #f8f9fa;
    z-index: 1;
  }

  th {
    padding: 1rem;
    font-weight: 600;
    color: #333;
    border-bottom: 2px solid #dee2e6;
    text-align: center;
    font-size: 1.6rem;
  }

  td {
    padding: 1rem;
    color: #555;
    border-bottom: 1px solid #f1f3f5;
    text-align: center;
    line-height: 1.5;
  }

  tr:hover td {
    background-color: var(--hB-color);
  }
`;

export const thumbnail = css`
  width: 70px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
  background: #f0f0f0;
`;

export const detailButton = css`
  padding: 0.6rem 1.6rem;
  cursor: pointer;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  background-color: black;
  color: white;
`;

export const paginationWrapper = css`
  margin-top: 1rem;
  text-align: center;
  flex-shrink: 0;
  font-size: 1.1rem;
`;