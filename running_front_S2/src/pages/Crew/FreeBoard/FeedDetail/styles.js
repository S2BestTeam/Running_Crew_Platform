import { css } from "@emotion/react";

const layout = css`
  max-width: 880px;
  margin: 32px auto;
  padding: 28px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
`;

const topBar = css`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;

  button {
    border: 0;
    padding: 8px 12px;
    border-radius: 10px;
    background: #f1f3f5;
    cursor: pointer;
  }
`;

const titleCss = css`
  font-size: 24px;
  font-weight: 700;
  line-height: 1.3;
  margin: 8px 0 4px 0;
`;

const metaCss = css`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #6b7280;
  font-size: 14px;
  border-bottom: 1px solid #eef2f7;
  padding-bottom: 14px;
  margin-bottom: 16px;

  .dot {
    width: 4px;
    height: 4px;
    background: #cfd6dd;
    border-radius: 50%;
  }
`;

const contentCss = css`
  font-size: 16px;
  line-height: 1.85;
  color: #111827;

  /* 본문 기본 여백 */
  p { margin: 12px 0; }
  h1, h2, h3 { margin: 18px 0 8px 0; }
  ul, ol { padding-left: 22px; }

  /* 이미지 반응형 */
  img {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 10px auto;
    border-radius: 10px;
  }

  /* 코드/인용문 있을 때 대비 */
  pre, code {
    background: #f8fafc;
    border-radius: 8px;
    padding: 10px 12px;
    overflow: auto;
  }

  blockquote {
    margin: 12px 0;
    padding: 10px 14px;
    border-left: 4px solid #e5e7eb;
    background: #fafafa;
    border-radius: 8px;
  }
`;