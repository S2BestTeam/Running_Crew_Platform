import { css } from "@emotion/react";

export const wrap = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
`;

export const row = css`
  display: flex;
  align-items: center;
  gap: 8px; /* 아바타, 닉네임, 내용 간격 */
  padding: 6px 0;
`;

export const avatar = css`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  background: #f5f6f7;
`;

export const nickname = css`
  font-weight: 600;
  font-size: 14px;
  color: #333;
  margin-right: 6px; /* 닉네임과 내용 사이 약간의 간격 */
`;

export const content = css`
  font-size: 14px;
  color: #444;
  line-height: 1.4;
`;
