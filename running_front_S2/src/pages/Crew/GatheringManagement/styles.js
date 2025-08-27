import { css } from "@emotion/react";

export const layout = css`
  padding: 16px;
`;

export const gatheringMain = css`
  margin-top: 16px;
  
`;

export const dataGridWrapper = css`
  height: 100%;
  width: 100%;
    .MuiDataGrid-cell {
    font-size: 1.5rem; // 셀 글자 크기
  }

  .MuiDataGrid-columnHeaderTitle {
    font-size: 1.5rem; // 헤더 글자 크기
    font-weight: 600;
  }
`;

// 모달 내부 박스 스타일
export const modalBox = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
  min-width: 400px;
  max-height: 80vh;
  overflow-y: auto;
`;

export const profileRow = css`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

export const profileImg = css`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;
