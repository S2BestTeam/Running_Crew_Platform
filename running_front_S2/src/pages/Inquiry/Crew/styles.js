import { css } from '@emotion/react';

export const headerSection = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;

  & > div {
    width: 60%;
    display: flex;
    justify-content: flex-end;

    & > button {
      padding: 1rem 2rem;
      background: #000912ff;
      color: white;
      border: none;
      border-radius: 0.6rem;
      cursor: pointer;
      font-size: 1.4rem;
      
      &:hover {
        background: gray;
      }
      
      &:disabled {
        background: #ccc;
        cursor: not-allowed;
      }
    }
  }
`;

export const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0 2rem;
`;

export const table = css`
  width: 60%;
  border-collapse: collapse;
  
  th, td {
    padding: 1.2rem;
    text-align: left;
    border-bottom: 0.1rem solid #ddd;
  }
  
  th {
    background-color: #f5f5f5;
    font-weight: 600;
  }
`;

export const tableRow = (isClickable) => css`
  cursor: ${isClickable ? 'pointer' : 'default'};
  
  &:hover {
    background-color: ${isClickable ? '#f9f9f9' : 'transparent'};
  }
  
  ${!isClickable && `
    color: #999;
    
    td {
      font-style: italic;
    }
  `}
`;

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
  padding: 2rem 2.4rem;
  border-bottom: 0.1rem solid #e0e0e0;
  
  h2 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 600;
  }
`;

export const closeButton = css`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const modalContent = css`
  flex: 1;
  padding: 2.4rem;
  overflow-y: auto;
`;

export const formGroup = css`
  margin-bottom: 2rem;
  
  label {
    display: block;
    margin-bottom: 0.8rem;
    font-weight: 500;
    color: #333;
    font-size: 1.4rem;
  }
`;

export const selectInput = css`
  width: 100%;
  padding: 1.2rem;
  border: 0.1rem solid #ddd;
  border-radius: 0.6rem;
  font-size: 1.4rem;
  
  &:focus {
    outline: none;
    border-color: gray;
    box-shadow: 0 0 0 0.2rem rgba(0, 26, 54, 0.25);
  }
`;

export const textInput = css`
  width: 96%;
  padding: 1.2rem;
  border: 0.1rem solid #ddd;
  border-radius: 0.6rem;
  font-size: 1.4rem;
  
  &:focus {
    outline: none;
    border-color: gray;
    box-shadow: 0 0 0 0.2rem rgba(0, 26, 54, 0.25);
  }
  
  &::placeholder {
    color: #999;
  }
`;

export const textareaInput = css`
  width: 96%;
  padding: 1.2rem;
  border: 0.1rem solid #ddd;
  border-radius: 0.6rem;
  font-size: 1.4rem;
  resize: vertical;
  min-height: 12rem;
  
  &:focus {
    outline: none;
    border-color: gray;
    box-shadow: 0 0 0 0.2rem rgba(0, 26, 54, 0.25);
  }
  
  &::placeholder {
    color: #999;
  }
`;

export const modalFooter = css`
  display: flex;
  gap: 1.2rem;
  padding: 2rem 2.4rem;
  border-top: 0.1rem solid #e0e0e0;
  justify-content: flex-end;
`;

export const modifyButton = css`
  padding: 1rem 2rem;
  background: white;
  border: 0.1rem solid #ddd;
  border-radius: 0.6rem;
  cursor: pointer;
  font-size: 1.4rem;
  background-color: rgba(0, 255, 47, 0.6);

  &:hover {
    background-color: green;
  }
`;

export const deleteButton = css`
  padding: 1rem 2rem;
  background: white;
  border: 0.1rem solid #ddd;
  border-radius: 0.6rem;
  cursor: pointer;
  font-size: 1.4rem;
  background-color: rgba(255, 97, 97, 0.6);

  &:hover {
    background-color: #ff0000ff;
  }
`;

export const submitButton = css`
  padding: 1rem 2rem;
  background: gray;
  color: white;
  border: none;
  border-radius: 0.6rem;
  cursor: pointer;
  font-size: 1.4rem;
  
  &:hover {
    background: black;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

// ReactModal 스타일
export const modalStyles = {
  overlay: {
    backgroundColor: "#000000aa",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  content: {
    position: "static",
    border: "none",
    borderRadius: "0.8rem",
    padding: "0",
    overflow: "hidden",
    width: "80rem",
    maxWidth: "90vw",
    height: "60rem",
    maxHeight: "90vh",
  }
};

export const detailModalStyles = {
  overlay: {
    backgroundColor: "#000000aa",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  content: {
    position: "static",
    border: "none",
    borderRadius: "0.8rem",
    padding: "0",
    overflow: "hidden",
    width: "70rem",
    maxWidth: "90vw",
    height: "50rem",
    maxHeight: "90vh",
  }
};

// 상세보기 모달 스타일
export const detailSection = css`
  margin-bottom: 2.4rem;
  
  h3 {
    margin: 0 0 1.2rem 0;
    font-size: 1.6rem;
    font-weight: 600;
    color: #333;
  }
  
  p {
    margin: 0;
    color: #666;
  }
`;

export const detailRow = css`
  display: flex;
  margin-bottom: 0.8rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const label = css`
  min-width: 8rem;
  font-weight: 500;
  color: #333;
`;

export const statusBadge = (status) => css`
  padding: 0.4rem 0.8rem;
  border-radius: 0.4rem;
  font-size: 1.2rem;
  font-weight: 500;
  background: ${
    status === '처리 완료' ? '#28a745' : 
    status === '처리중' ? '#007bff' : 
    '#ffc107'
  };
  color: ${
    status === '처리 완료' || status === '처리중' ? 'white' : '#212529'
  };
`;

export const contentArea = css`
  background: #f8f9fa;
  padding: 1.6rem;
  border-radius: 0.6rem;
  border: 0.1rem solid #e9ecef;
  min-height: 12rem;
  line-height: 1.5;
  color: #495057;
`;