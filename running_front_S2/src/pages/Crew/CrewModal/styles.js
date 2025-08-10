import { css } from "@emotion/react";

/* 전체 레이아웃 */
export const modalLayout = css`
  display: flex;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  width: 920px;
  max-height: 88vh;
`;

/* 좌측 이미지 영역 */
export const modalContainerLeft = css`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 49rem;
  max-width: 51.6rem;
  background: #000;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export const imagePlaceholder = css`
  color: #aaa;
  font-size: 14px;
`;

/* 우측 컨텐츠 영역 */
export const modalContainerRight = css`
  display: flex;
  flex-direction: column;
  width: 43rem;
`;

export const header = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom: 1px solid #e5e7eb;
  padding: 12px 12px 8px;
`;

export const headerTitle = css`
  & > h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
  }
  & > p {
    margin: 6px 0 0;
    color: #555;
    line-height: 1.4;
    font-size: 14px;
  }
`;

export const closeBtn = css`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;

  & svg { width: 22px; height: 22px; }
  &:hover { background: #f3f4f6; }
`;

/* 탭 */
export const tabs = css`
  display: flex;
  gap: 8px;
  padding: 10px 12px 0;
  border-bottom: 1px solid #eee;
`;

export const tabButton = (active) => css`
  border: none;
  background: ${active ? "#111" : "#f3f4f6"};
  color: ${active ? "#fff" : "#111"};
  padding: 8px 14px;
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;
  &:hover { background: ${active ? "#111" : "#e5e7eb"}; }
`;

/* 메인 컨텐츠 */
export const main = css`
  padding: 12px 12px 16px;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 8px; }
  &::-webkit-scrollbar-thumb { background: #ddd; border-radius: 8px; }
`;

/* 필터 */
export const filterRow = css`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;

  & select {
    margin-left: 6px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 6px 8px;
    outline: none;
  }
`;

/* 상태/빈 목록 */
export const stateText = css`
  color: #666;
  padding: 14px 4px;
`;
export const emptyBox = css`
  color: #999;
  border: 1px dashed #e5e7eb;
  border-radius: 12px;
  padding: 18px;
  text-align: center;
`;

/* 러닝모집 리스트 */
export const boardList = css`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 12px;
`;
export const boardItem = css`
  border: 1px solid #eef0f3;
  border-radius: 12px;
  padding: 12px;
  transition: box-shadow .15s ease, transform .05s ease;
  &:hover { box-shadow: 0 6px 16px rgba(0,0,0,.06); transform: translateY(-1px); }
`;
export const boardHeader = css`
  display: flex;
  align-items: center;
  gap: 8px;
  & > h4 { margin: 0; font-size: 16px; }
`;
export const badge = (status) => css`
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  background: ${status === "모집중" ? "#e8f5e9" : "#fff3e0"};
  color: ${status === "모집중" ? "#2e7d32" : "#f57c00"};
`;
export const boardMeta = css`
  margin: 6px 0 6px;
  font-size: 13px;
  color: #666;
  & > b { color: #222; }
`;
export const boardContent = css`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
`;

/* 멤버 그리드 */
export const memberGrid = css`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
`;
export const memberCard = css`
  border: 1px solid #eef0f3;
  border-radius: 12px;
  padding: 12px;
  text-align: center;
`;
export const memberAvatar = css`
  width: 64px;
  height: 64px;
  margin: 6px auto 8px;
  border-radius: 50%;
  overflow: hidden;
  background: #f3f4f6;
  display: grid;
  place-items: center;
  font-weight: 800;

  & img { width: 100%; height: 100%; object-fit: cover; }
`;
export const memberName = css`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
`;
