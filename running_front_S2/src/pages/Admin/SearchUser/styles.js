import { css } from "@emotion/react";

export const overlay = css`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

export const modal = css`
  background: #fff;
  border-radius: 12px;
  width: 80%;
  max-height: 90%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const editIcon = css`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  color: #007bff;
`;

export const profileSection = css`
  display: flex;
  gap: 20px;
  padding: 20px;
`;

export const profileImageWrapper = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #e5e5e5;
  width: 12rem;
  height: 12rem;
  overflow: hidden;
  background: #f9f9f9;
  transition: all 0.3s ease;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover::after {
    position: absolute;
    content: "프로필 변경";
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.55);
    color: #ffffff;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
`;

export const profileImage = css`
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 8px;
  background-color: #eee;
`;

export const noImage = css`
  width: 140px;
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ccc;
  color: #fff;
  border-radius: 8px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const editButtons = css`
  margin-top: 10px;
`;

export const saveButton = css`
  padding: 6px 12px;
  margin-right: 8px;
  border-radius: 6px;
  border: none;
  background-color: #28a745;
  color: #fff;
  cursor: pointer;
`;

export const cancelButton = css`
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  background-color: #dc3545;
  color: #fff;
  cursor: pointer;
`;

export const tabMenu = css`
  display: flex;
  border-bottom: 1px solid #ddd;
`;

export const tab = css`
  flex: 1;
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
  font-weight: normal;
`;

export const activeTab = css`
  font-weight: bold;
  border-bottom: 2px solid #007bff;
`;

export const tabContent = css`
  padding: 20px;
  overflow-y: auto;
  flex: 1;
`;

export const cardWrapper = css`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const card = css`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  min-width: 180px;
  max-width: 220px;
  background: #f9f9f9;
  flex: 1 1 auto;
`;

export const gatheringWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const gatheringCard = css`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  background: #f5f5f5;
`;

export const postWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const postCard = css`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  background: #fefefe;
`;

export const footer = css`
  padding: 10px 20px;
  border-top: 1px solid #ddd;
  text-align: right;
`;

export const closeButton = css`
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
`;

export const nicknameErrMsg = css`
  position: absolute;
  bottom: -2.8rem;
  left: 1rem;
  font-size: 1rem;
  color: red;
  white-space: nowrap;
`;

export const errMsg = css`
  position: absolute;
  bottom: -2.8rem;
  left: 1rem;
  font-size: 1rem;
  color: red;
  white-space: nowrap;
`;

export const reportList = css`
  list-style: none;
  padding: 0;
  margin: 10px 0 20px 0;
  max-height: 150px;
  overflow-y: auto;
`;

export const reportItem = css`
  padding: 8px 12px;
  margin-bottom: 4px;
  background-color: #f8f9fa;
  border-left: 3px solid #007bff;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #e3f2fd;
    border-left-color: #0056b3;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const reportContent = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const reportMain = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const reportReason = css`
  font-weight: 600;
  color: #495057;
  font-size: 13px;
`;

export const reportTarget = css`
  color: #6c757d;
  font-size: 12px;
  font-style: italic;
`;

export const reportDate = css`
  color: #868e96;
  font-size: 11px;
  white-space: nowrap;
`;

export const ModifyButton = css`
  font-size: 1.6rem;
  padding-left: 2rem;
  cursor: pointer;

  :hover {
    color: #34f944ff;
  }
`;


export const deleteButton = css`
  font-size: 1.6rem;
  padding-left: 2rem;
  cursor: pointer;

  :hover {
    color: red;
  }
`;