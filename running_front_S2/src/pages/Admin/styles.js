// styles.js
import { css } from "@emotion/react";

export const container = css`
  display: flex;
  height: 100vh;
  background-color: #f3f4f6;
`;

export const sidebar = css`
  width: 256px;
  background-color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e5e7eb;
`;

export const sidebarHeader = css`
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
`;

export const headerContent = css`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const logoIcon = css`
  width: 32px;
  height: 32px;
  background-color: #2563eb;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const logoIconSvg = css`
  width: 20px;
  height: 20px;
  color: white;
`;

export const title = css`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`;

export const subtitle = css`
  font-size: 12px;
  color: #6b7280;
  margin: 0;
`;

export const navigation = css`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const menuItem = css`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  color: #374151;
  font-weight: 500;
  
  &:hover {
    background-color: #dbeafe;
    color: black;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    
    div {
      color: gray;
    }
  }
`;

export const menuItemActive = css`
  background-color: gray;
  color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  
  &:hover {
    background-color: gray;
    color: white;
    
    div {
      color: white;
    }
  }
`;

export const menuIcon = css`
  color: #9ca3af;
  transition: color 0.2s;
`;

export const menuIconActive = css`
  color: white;
`;

export const menuText = css`
  font-weight: 500;
`;

export const logoutContainer = css`
  padding: 16px;
  border-top: 1px solid #e5e7eb;
`;

export const logoutButton = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  background-color: #fef2f2;
  color: #dc2626;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background-color: #fee2e2;
    color: #b91c1c;
    
    svg {
      transform: scale(1.1);
    }
  }
`;

export const logoutIcon = css`
  transition: transform 0.2s;
`;

export const mainContent = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const topBar = css`
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border-bottom: 1px solid #e5e7eb;
  padding: 16px 24px;
`;

export const topBarContent = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const dashboardTitle = css`
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`;

export const userSection = css`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const userAvatar = css`
  width: 32px;
  height: 32px;
  background-color: #d1d5db;
  border-radius: 50%;
`;

export const contentArea = css`
  flex: 1;
  overflow: auto;
  background-color: #f9fafb;
  padding: 24px;
`;

export const contentCard = css`
  max-width: 100%;
  margin: 0 auto;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  min-height: 100%;
`;

export const contentInner = css`
  padding: 24px;
`;