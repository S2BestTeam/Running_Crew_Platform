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
  flex-shrink: 0;
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
