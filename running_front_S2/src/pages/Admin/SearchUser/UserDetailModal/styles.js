import { css } from "@emotion/react";

export const overlay = css`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  z-index: 9999;
`;

export const modal = css`
  background: #fff;
  border-radius: 0.8rem;
  width: 80%;
  max-width: 1200px;
  max-height: 90%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-size: 1.4rem;
  position: relative;
`;

export const editIcon = css`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  display: flex;
  gap: 1rem;
`;

export const ModifyButton = css`
  font-size: 1.8rem;
  cursor: pointer;
  &:hover { color: #34f944; }
`;

export const deleteButton = css`
  font-size: 2rem;
  cursor: pointer;
  &:hover { color: red; }
`;

export const profileSection = css`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  border-bottom: 1px solid #eee;
`;

export const profileImageWrapper = css`
  width: 12rem;
  height: 12rem;
  border-radius: 0.8rem;
  overflow: hidden;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const profileImage = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const nicknameErrMsg = css`
  font-size: 1.2rem;
  color: red;
  margin-left: 0.5rem;
`;

export const errMsg = css`
  font-size: 1.2rem;
  color: red;
  margin-left: 0.5rem;
`;

export const editButtons = css`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
`;

export const saveButton = css`
  padding: 0.6rem 1.6rem;
  border-radius: 0.4rem;
  border: none;
  background: #28a745;
  color: #fff;
  cursor: pointer;
`;

export const cancelButton = css`
  padding: 0.6rem 1.6rem;
  border-radius: 0.4rem;
  border: none;
  background: #dc3545;
  color: #fff;
  cursor: pointer;
`;

export const tabMenu = css`
  display: flex;
  border-bottom: 1px solid #ddd;
  background-color: #f8f9fa;
`;

export const tab = css`
  flex: 1;
  text-align: center;
  padding: 1.2rem 0.8rem;
  cursor: pointer;
  font-size: 1.4rem;
  color: #666;
`;

export const activeTab = css`
  font-weight: 600;
  color: #000000ff;
  border-bottom: 0.2rem solid #000000ff;
  background-color: #fff;
`;

export const tabContent = css`
  padding: 1rem 3rem;
  overflow-y: auto;
  flex: 1;
`;

export const cardWrapper = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
`;

export const card = css`
  border: 1px solid #e0e0e0;
  border-radius: 0.8rem;
  padding: 1.2rem 1.5rem;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  p {
    margin: 0.4rem 0;
    font-size: 1.4rem;
    color: #333;
  }

  &:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    background-color: rgba(129, 126, 126, 0.1);
    transform: translateY(-2px);
  }
`;

export const gatheringWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const gatheringCard = css`
  border: 1px solid #e0e0e0;
  border-radius: 0.8rem;
  padding: 1.2rem 1.5rem;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  p {
    margin: 0.4rem 0;
    font-size: 1.4rem;
    color: #333;
  }

  &:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    background-color: rgba(129, 126, 126, 0.1);
    transform: translateY(-2px);
  }
`;

export const reportList = css`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 2rem 0;
  max-height: 200px;
  overflow-y: auto;
`;

export const reportItem = css`
  padding: 1rem 1.4rem;
  margin-bottom: 0.8rem;
  background-color: #f9fafb;
  border-left: 4px solid #ff0000ff;
  border-radius: 0.6rem;
  transition: background-color 0.2s ease, border-left-color 0.2s ease;

  &:hover {
    background-color: var(--hB-color);
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
  gap: 1rem;
`;

export const reportReason = css`
  font-weight: 600;
  color: #333;
  font-size: 1.4rem;
`;

export const reportTarget = css`
  color: #6c757d;
  font-size: 1.3rem;
  font-style: italic;
`;

export const reportDate = css`
  color: #868e96;
  font-size: 1.2rem;
  white-space: nowrap;
`;


export const searchBox = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0 2rem 0;
`;

export const inputGroup = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const selectGroup = css`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

export const selectBox = css`
  width: 14rem;
  height: 3.425rem;
  padding: 0.24rem 0.48rem;
  font-size: 0.76rem;
  border-radius: 0.4rem;
  background-color: #fff;
  color: #333;
  font-size: 1.4rem;

  .MuiOutlinedInput-notchedOutline {
    border-color: #ccc;
  }
  &:hover .MuiOutlinedInput-notchedOutline {
    border-color: #333;
  }
  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #000 !important;
  }
`;

export const menuItem = css`
  font-size: 1.4rem;
`;

export const searchGroup = css`
  display: flex;
  align-items: center;
`;

export const asd = css`
  display: flex;
  flex-direction: row;
`;

export const searchInput = css`
  height: 3.425rem;
  box-sizing: border-box;
  padding: 0.8rem;
  border: 0.1rem solid var(--main-color);
  border-right: none;
  border-radius: 0.6rem 0 0 0.6rem;
  outline: none;
`;

export const searchButton = css`
  display: flex;
  height: 3.425rem;
  box-sizing: border-box;
  padding: 0.5rem 0.5rem;
  border: 0.1rem solid var(--main-color);
  border-left: none;
  background: #fff;
  color: var(--main-color);
  font-size: 1.8rem;
  border-radius: 0 0.6rem 0.6rem 0;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
`;


export const table = css`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
`;

export const th = css`
  padding: 1.2rem;
  border-bottom: 0.2rem solid #000;
  font-weight: 600;
`;

export const td = css`
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

export const tdTitle = css`
  ${td};
  text-align: left;
`;

export const tr = css`
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const footer = css`
  padding: 1.5rem 2rem;
  border-top: 1px solid #eee;
  text-align: right;
`;

export const closeButton = css`
  padding: 0.8rem 2rem;
  border-radius: 0.4rem;
  border: none;
  background: #000000ff;
  color: #fff;
  cursor: pointer;
  font-size: 1.4rem;
  &:hover {
    background: gray;
  }
`;
