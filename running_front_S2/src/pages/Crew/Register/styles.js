/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

/* Light Mono */
const C = {
  bg: "#f6f7fb",
  card: "#fff",
  text: "#141518",
  sub: "#7b8190",
  border: "#e8eaf0",
  inputBg: "#fafbfe",
  inputBorder: "#dfe3ea",
  focus: "#111",
  placeholder: "#a5abb6",
  black: "#111",
  white: "#fff",
};
const R = { sm: "8px", md: "12px", lg: "16px", xl: "20px" };
const S = { card: "0 14px 40px rgba(17,17,17,.07)", ring: "0 0 0 8px rgba(17,17,17,.06)" };

/* 페이지 컨테이너(카드) */
export const container = css`
  font-family: 'Pretendard Variable','Inter','Noto Sans KR',system-ui;
  color: ${C.text};
  background: ${C.bg};
  padding: 24px;
  margin: 0 auto 3rem auto;   /* 좌우 auto → 가운데 정렬 */
  width: 80%;              
  border-radius: 1rem;
/* 
  > div {
    background: ${C.card};
    border: 1px solid ${C.border};
    border-radius: ${R.xl};
    overflow: hidden;
    box-shadow: ${S.card};
  } */
`;

/* ===== 상단: 배너 + 프로필 + 인포 & 액션 ===== */
export const titleBox = css`
  background: ${C.card};
`;

export const banner = css`
  width: 100%;
  height: 30rem;                 /* 설정 화면과 유사 높이 */
  position: relative;
  cursor: pointer;

  > div {
    width: 100%;
    height: 100%;
    background: #0b0b0b;
    position: relative;
  }

  img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .overlay { position: absolute; inset: 0; display: grid; place-items: center;
    color: #fff; background: rgba(0,0,0,.45); opacity: 0; transition: .2s; font-weight: 600; }
  &:hover .overlay { opacity: 1; }
`;

/* 프로필 + 텍스트 + 버튼 */
export const headerRow = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px 12px;
  border-top: 1px solid ${C.border};
  background: ${C.card};
`;

export const profileWrap = css`
  display: flex; align-items: center; gap: 16px; min-height: 56px;
`;

export const profileAvatar = css`
  width: 72px; height: 72px; border-radius: 50%;
  overflow: hidden; border: 3px solid ${C.white}; background: #f0f0f0;
  position: relative; cursor: pointer;

  img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .overlay { position: absolute; inset: 0; display: grid; place-items: center;
    color: #fff; background: rgba(0,0,0,.55); opacity: 0; transition: .2s; font-size: 12px; }
  &:hover .overlay { opacity: 1; }
`;

export const headerText = css`
  display: flex; flex-direction: column; gap: 6px;

  h2 { margin: 0; font-size: 22px; font-weight: 800; }
  .meta { display: flex; align-items: center; gap: 8px; color: #5b5f69; font-size: 13px; }
  .chip { padding: 4px 8px; border-radius: 999px; background: #f1f3f7; border: 1px solid ${C.border}; }
`;

export const saveButton = css`
  padding: 10px 18px; border-radius: 10px; border: 1px solid ${C.black};
  background: ${C.black}; color: #fff; font-weight: 700; cursor: pointer;
  transition: .15s; min-width: 76px; text-align: center;
  &:hover:not(:disabled){ background:#1a1a1a; }
  &:disabled{ background:#999; border-color:#999; cursor:not-allowed; }
`;

/* ===== 폼 영역 ===== */
export const mainLine = css`
  padding: 16px 20px 24px;
  border-top: 1px solid ${C.border};
`;

export const sectionTitle = css`
  font-size: 18px; font-weight: 800; margin: 10px 0 18px;
`;

export const field = css`
  display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px;
`;

export const label = css`
  font-size: 14px; font-weight: 700; color: #3a3d45;
`;

/* 인풋/셀렉트 공통 (설정 화면 feel) */
const baseInput = css`
  width: 60%;
  background: ${C.inputBg};
  color: ${C.text};
  border: 1.5px solid ${C.inputBorder};
  border-radius: 0.8rem;
  padding: 14px 24px;
  margin-top: 0.5rem 0 0.5rem 0;
  font-size: 14px;
  outline: none;
  transition: .15s;

  &::placeholder { color: ${C.placeholder}; }
  &:hover { border-color: #cfd5df; }
  &:focus { border-color: ${C.focus}; box-shadow: ${S.ring}; background: #fff; }
`;

export const input = baseInput;

export const select = css`
  ${baseInput};
  appearance: none;
  background-image:
    linear-gradient(45deg, transparent 50%, ${C.sub} 50%),
    linear-gradient(135deg, ${C.sub} 50%, transparent 50%),
    linear-gradient(to right, transparent, transparent);
  background-position:
    calc(100% - 22px) calc(50% - 4px),
    calc(100% - 16px) calc(50% - 4px),
    100% 0;
  background-repeat: no-repeat;
  background-size: 7px 7px, 7px 7px, 2.4rem 100%;
`;

export const numberInputRow = css`
  display: flex; align-items: center; gap: 10px;
`;

export const numberInput = css`
  ${baseInput}; width: 140px; text-align: center;
`;

export const hint = css` font-size: 12px; color: #6a6f7a; `;

export const error = css` font-size: 12px; color: #e74c3c; `;

/* Quill */
export const quill = css`
  .ql-editor { min-height: 220px; font-size: 14px; }
  .ql-toolbar.ql-snow, .ql-container.ql-snow { border: 1px solid ${C.inputBorder}; }
  .ql-toolbar.ql-snow { background: ${C.inputBg}; border-radius: ${R.md} ${R.md} 0 0; }
  .ql-container.ql-snow { background: ${C.card}; border-radius: 0 0 ${R.md} ${R.md}; }
`;

/* 버튼 묶음 (중복확인/등록) */
export const buttonRow = css`
  display: flex; gap: 10px; margin-top: 6px; flex-wrap: wrap;
`;
export const subButton = css`
  padding: 12px 16px; border-radius: 10px; border: 1px solid ${C.border};
  background: #f1f3f7; font-weight: 800; cursor: pointer; transition:.15s;
  &:hover{ transform: translateY(-1px); background:#e9ecf3; }
`;
export const primaryButton = css`
  padding: 12px 18px; border-radius: 10px; border: 1px solid ${C.black};
  background:${C.black}; color:#fff; font-weight:800; cursor:pointer; transition:.15s;
  &:hover{ transform: translateY(-1px); background:#1a1a1a; }
`;
