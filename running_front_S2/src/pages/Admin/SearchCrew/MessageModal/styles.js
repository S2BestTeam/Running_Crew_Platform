// MessageModal/styles.js  (MessageSendModal 전용)
import { css } from "@emotion/react";

export const backdrop = css`
  position: fixed; inset: 0;
  background: rgba(0,0,0,.45);
  display: flex; align-items: center; justify-content: center;
  z-index: 2000;          /* 디테일 모달보다 높게 */
`;

export const modal = css`
  width: 420px; max-width: calc(100vw - 32px);
  background: #fff; border-radius: 12px; padding: 16px;
  box-shadow: 0 12px 36px rgba(0,0,0,.28);
`;

export const headerRow = css`display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;`;
export const title = css`margin:0;font-size:16px;font-weight:700;`;
export const closeBtn = css`border:none;background:transparent;font-size:22px;cursor:pointer;`;
export const meta = css`font-size:12px;color:#6b7280;margin-bottom:8px;`;
export const textarea = css`width:100%;min-height:120px;resize:vertical;`;
export const footer = css`display:flex;gap:8px;justify-content:flex-end;margin-top:12px;`;
export const cancelBtn = css``;
export const submitBtn = css``;
