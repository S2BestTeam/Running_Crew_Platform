/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const modalBox = css`
  background-color: #fff;
  padding: 20px;
  width: 400px;
  max-height: 80vh;
  overflow-y: auto;
  margin: 50px auto;
  border-radius: 8px;
`;

export const participantTable = css`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  th, td {
    text-align: left;
    padding: 8px;
    border-bottom: 1px solid #ddd;
  }
`;

export const participantRow = css`
  &:hover {
    background-color: #f9f9f9;
  }
`;

export const participantCell = css`
  display: flex;
  align-items: center;
  gap: 10px; /* 이미지와 닉네임 사이 간격 */
`;

export const participantImg = css`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;
