import { css } from '@emotion/react';

export const headerSection = css`
  padding: 20px 24px;
  background: linear-gradient(135deg, #474747ff 0%, #1e1e1eff 100%);
  color: white;
  margin-bottom: 0;
`;

export const adminHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;

  h2 {
    margin: 0;
    font-size: 28px;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }
`;

export const statusSummary = css`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`;

export const statusItem = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 14px;
  text-align: center;
  min-width: 80px;

  strong {
    font-size: 20px;
    font-weight: 700;
    margin-top: 4px;
    color: #fff;
  }
`;

// 컨테이너
export const container = css`
  background: white;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

// 테이블 스타일
export const table = css`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  thead {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    
    th {
      padding: 16px 12px;
      text-align: left;
      font-weight: 600;
      color: #495057;
      border-bottom: 2px solid #dee2e6;
      white-space: nowrap;
      
      &:first-of-type {
        width: 80px;
        text-align: center;
      }
      &:nth-of-type(2) {
        width: 100px;
      }
      &:nth-of-type(3) {
        width: 120px;
      }
      &:nth-of-type(5) {
        width: 100px;
        text-align: center;
      }
      &:nth-of-type(6), &:nth-of-type(7) {
        width: 110px;
        text-align: center;
      }
    }
  }

  tbody {
    tr {
      transition: all 0.2s ease;
      
      &:nth-of-type(even) {
        background-color: #f8f9fa;
      }
      
      &:hover {
        background-color: #e3f2fd;
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
    }
    
    td {
      padding: 16px 12px;
      border-bottom: 1px solid #dee2e6;
      vertical-align: middle;
      
      &:first-of-type {
        text-align: center;
        font-weight: 600;
        color: #6c757d;
      }
      &:nth-of-type(5), &:nth-of-type(6), &:nth-of-type(7) {
        text-align: center;
      }
    }
  }
`;

export const adminTableRow = css`
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #e8f4fd !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`;

export const titleCell = css`
  max-width: 3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  color: #343a40;
`;

export const contentCell = css`
  width: 40rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  color: #343a40;
`;

// 배지 스타일들
export const categoryBadge = css`
  display: inline-block;
  padding: 4px 12px;
  background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
  color: white;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(116, 185, 255, 0.3);
`;

export const statusBadge = css`
  display: inline-block;
  padding: 6px 16px;
  color: white;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  text-align: center;
  min-width: 80px;
`;

// 모달 스타일들
export const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(4px)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    position: 'relative',
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    border: 'none',
    borderRadius: '16px',
    padding: '0',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '80vh',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
  }
};

export const detailModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(4px)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    position: 'relative',
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    border: 'none',
    borderRadius: '16px',
    padding: '0',
    maxWidth: '800px',
    width: '90%',
    maxHeight: '85vh',
    overflow: 'hidden',
    boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
  }
};

export const modalContainer = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: white;
`;

export const modalHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  background: linear-gradient(135deg, #474747ff 0%, #1e1e1eff 100%);
  color: white;

  h2 {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
  }
`;

export const closeButton = css`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
  }
`;

export const modalContent = css`
  flex: 1;
  padding: 32px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }
`;

export const modalFooter = css`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 24px 32px;
  background: #f8f9fa;
  border-top: 1px solid #dee2e6;
`;

// 폼 관련 스타일
export const formGroup = css`
  margin-bottom: 24px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #495057;
    font-size: 14px;
  }
`;

export const selectInput = css`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

export const textareaInput = css`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

export const readOnlyText = css`
  padding: 12px 16px;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  color: #6c757d;
  font-weight: 500;
  margin: 0;
`;

// 상세보기 섹션들
export const detailSection = css`
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  h3 {
    margin: 0 0 16px 0;
    color: #495057;
    font-size: 18px;
    font-weight: 600;
  }
`;

export const detailRow = css`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const label = css`
  font-weight: 600;
  color: #6c757d;
  min-width: 120px;
  margin-right: 16px;
  font-size: 14px;
`;

export const inquiryTitle = css`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #343a40;
  line-height: 1.4;
`;

export const contentArea = css`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #667eea;
  line-height: 1.6;
  color: #495057;
  white-space: pre-wrap;
  word-break: break-word;
`;

export const adminReplyArea = css`
  background: linear-gradient(135deg, #e8f5e8 0%, #f0fff0 100%);
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #28a745;
  line-height: 1.6;
  color: #155724;
  white-space: pre-wrap;
  word-break: break-word;
  position: relative;

  &::before {
    content: '👨‍💼 관리자 답변';
    position: absolute;
    top: -10px;
    left: 16px;
    background: #28a745;
    color: white;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
  }
`;

// 버튼 스타일들
export const submitButton = css`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
`;

export const statusButton = css`
  background: linear-gradient(135deg, #ff6b6b 0%, #ddd 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(56, 56, 56, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(56, 56, 56, 0.3);
  }
`;

export const deleteButton = css`
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
  }
`;

export const cancelButton = css`
  background: #6c757d;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #545b62;
    transform: translateY(-1px);
  }
`;

// 반응형 스타일
export const responsiveTable = css`
  @media (max-width: 768px) {
    table {
      font-size: 12px;
    }
    
    th, td {
      padding: 8px 6px;
    }
    
    ${titleCell} {
      max-width: 150px;
    }
  }
`;

export const responsiveModal = css`
  @media (max-width: 768px) {
    ${modalContent} {
      padding: 20px;
    }
    
    ${modalFooter} {
      padding: 16px 20px;
      flex-direction: column;
      
      button {
        width: 100%;
        margin-bottom: 8px;
        
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
`;