import { css } from "@emotion/react";

export const overlay = css`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
`;

export const modal = css`
  background: #fff;
  border-radius: 0.8rem;
  width: 80%;
  max-height: 90%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const header = css`
  padding: 2rem;
  border-bottom: 0.1rem solid #eee;
`;

export const headerTop = css`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const crewThumbnail = css`
  width: 6rem;
  height: 6rem;
  object-fit: cover;
  border-radius: 0.8rem;
  background-color: #f5f5f5;
`;

export const crewTitleBox = css`
  h3 {
    margin: 0;
    font-size: 1.8rem;
    color: #333;
  }
  p {
    margin: 0.5rem 0 0 0;
    font-size: 1.4rem;
    color: #666;
  }
`;

export const crewMeta = css`
  font-size: 1.4rem;
  color: #555;
  line-height: 1.4;
  span + span::before {
    content: " | ";
  }
`;

// 탭
export const tabs = css`
  display: flex;
  border-bottom: 0.1rem solid #ddd;
  background-color: #f8f9fa;
`;

export const tab = (active) => css`
  flex: 1;
  text-align: center;
  padding: 1.2rem 0.8rem;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: ${active ? 600 : "normal"};
  color: ${active ? "#007bff" : "#666"};
  border-bottom: ${active ? "0.2rem solid #007bff" : "none"};
  background-color: ${active ? "#fff" : "transparent"};
`;

export const content = css`
  padding: 2rem;
  overflow-y: auto;
  flex: 1;
`;

export const memberItem = (withBorder) => css`
  display: flex;
  align-items: center;
  padding: 1.2rem 0;
  border-bottom: ${withBorder ? "0.1rem solid #f0f0f0" : "none"};
  gap: 1.2rem;
  position: relative;
`;

export const memberAvatar = css`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  object-fit: cover;
  background-color: #f5f5f5;
`;

export const memberInfo = css`
  flex: 1;
`;

export const memberName = css`
  font-weight: 500;
  font-size: 1.4rem;
  color: #333;
  margin-bottom: 0.2rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  span {
    font-size: 1.2rem;
  }
`;

export const memberFullName = css`
  font-size: 1.2rem;
  color: #666;
`;

export const memberActions = css`
  display: flex;
  align-items: center;
  gap: 1rem; 
`;

export const memberDate = css`
  font-size: 1.1rem; 
  color: #999;
`;

export const settingsBtn = css`
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 0.4rem; 
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const memberMenu = css`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background: #fff;
  border: 0.1rem solid #ddd; 
  border-radius: 0.4rem;
  box-shadow: 0 0.2rem 0.6rem rgba(0,0,0,0.1); 
  z-index: 10;
  min-width: 14rem;
`;

export const menuItem = css`
  padding: 0.8rem 1.2rem;
  cursor: pointer;
  font-size: 1.3rem; 
  border-bottom: 0.1rem solid #eee;
  &:last-of-type {
    border-bottom: none;
  }
  &:hover {
    background: #f9f9f9;
  }
`;

export const menuPrimary = css`
  color: #007bff;
  font-weight: 500;
`;

export const menuDanger = css`
  color: red;
  font-weight: 500;
`;

export const emptyState = css`
  text-align: center;
  padding: 4rem; 
  color: #666;
`;

export const loadMoreWrapper = css`
  text-align: center;
  margin-top: 2rem;
`;

export const loadMoreBtn = css`
  padding: 0.8rem 1.6rem; 
  border: 0.1rem solid #ddd;
  border-radius: 0.4rem;
  background: #fff;
  color: #666;
  cursor: pointer;
  font-size: 1.3rem;
`;

export const gatheringItem = (withBorder) => css`
  padding: 1.5rem 0;
  border-bottom: ${withBorder ? "0.1rem solid #f0f0f0" : "none"};
`;

export const gatheringTitle = css`
  font-weight: 500;
  font-size: 1.5rem; 
  color: #333;
  margin-bottom: 0.8rem; 
`;

export const gatheringContent = css`
  font-size: 1.3rem;
  color: #666;
  line-height: 1.4;
  div {
    margin-bottom: 0.4rem;
  }
`;

export const gatheringMeta = css`
  display: flex;
  gap: 1.5rem; 
  margin-top: 0.6rem; 
`;

export const notice = css`
  text-align: center;
  padding: 2rem;
`;

export const noticeImg = css`
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  object-fit: cover;
  background-color: #f5f5f5;
`;

export const footer = css`
  padding: 1.5rem 2rem;
  border-top: 0.1rem solid #eee;
  text-align: right;
`;

export const closeBtn = css`
  padding: 0.8rem 2rem;
  border-radius: 0.4rem;
  border: none;
  background: #007bff;
  color: #fff;
  cursor: pointer;
  font-size: 1.4rem;
`;
