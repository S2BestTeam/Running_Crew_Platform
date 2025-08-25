import { css } from "@emotion/react";

export const layout = css`
  width: 100%;
`;

export const instruction = css`
  color: #666;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  font-style: italic;
`;

export const table = css`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th,
  td {
    border: 0.1rem solid #ddd;
    padding: 1.2rem 0.8rem;
    text-align: left;
  }

  th {
    background-color: #f5f5f5;
    font-weight: bold;
  }

  tbody tr:nth-of-type(even) {
    background-color: #f9f9f9;
  }
`;

export const clickableRow = css`
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e3f2fd !important;
  }
`;

export const contentCell = css`
  max-width: 20rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const nicknameCell = css`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const warningDot = css`
  color: #dc3545;
  font-size: 1.4rem;
  cursor: help;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const warningBadge = css`
  background: #dc3545;
  color: white;
  font-size: 1rem;
  padding: 0.2rem 0.6rem;
  border-radius: 1rem;
  font-weight: 500;
  margin-left: 0.8rem;
`;

export const modalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const detailModalContent = css`
  background: white;
  border-radius: 0.8rem;
  width: 60rem;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 0.4rem 2rem rgba(0, 0, 0, 0.15);
`;

export const modalHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2.4rem;
  border-bottom: 0.1rem solid #eee;

  h3 {
    margin: 0;
    color: #333;
    font-size: 1.8rem;
  }
`;

export const modalBody = css`
  padding: 2.4rem;
`;

export const infoSection = css`
  margin-bottom: 2.4rem;

  h4 {
    margin: 0 0 1.2rem 0;
    color: #333;
    font-size: 1.6rem;
    font-weight: 600;
    border-bottom: 0.2rem solid #f0f0f0;
    padding-bottom: 0.8rem;
  }
`;

export const infoGrid = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
`;

export const infoItem = css`
  display: flex;
  gap: 0.8rem;
`;

export const label = css`
  font-weight: 500;
  color: #666;
  min-width: 6rem;
`;

export const introContent = css`
  background: #f8f9fa;
  border: 0.1rem solid #e9ecef;
  border-radius: 0.4rem;
  padding: 1.6rem;
  line-height: 1.5;
  color: #333;
  white-space: pre-wrap;
`;

export const modalActions = css`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;
  padding: 2rem 2.4rem;
  border-top: 0.1rem solid #eee;
  background: #f8f9fa;
`;

export const approveBtn = css`
  padding: 1rem 2rem;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background: #218838;
  }
`;

export const rejectBtn = css`
  padding: 1rem 2rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background: #c82333;
  }
`;

export const closeBtn = css`
  background: none;
  border: none;
  font-size: 2.4rem;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s ease;

  &:hover {
    background: #f0f0f0;
  }
`;

export const gatheringMain = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem 2rem;
`;

export const gatheringContainer = css`
  width: 25rem;
  border: 0.1rem solid #dbdbdb;
  border-radius: 0.5rem;
`;

export const thumbnailImg = css`
  width: 25rem;
  height: 15rem;
  background-color: #ebebeb;
  border-radius: 0.4rem 0.4rem 0 0;
  overflow: hidden;
  border-bottom: 0.1rem solid #dbdbdb;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const gatheringInfoContainer = css`
  padding: 2rem;
  height: 17rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 1.3rem;

  & > div {
    display: flex;
  }

  & > div > div {
    align-items: center;
  }

  & svg {
    color: #aaa;
    margin-right: 1rem;
  }

  & > div:nth-of-type(1) {
    font-size: 1.8rem;
    font-weight: 700;
  }
`;

export const profileImg = css`
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 1rem;
  background-color: #000;
  border-radius: 5rem;
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const statusContainer = css`
  justify-content: space-between;

  & div:nth-of-type(1) {
    display: flex;
  }
`;

export const status = css`
  & > div {
    width: 5rem;
    height: 2.5rem;
    color: #fff;
    font-weight: bold;
    border-radius: 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
  }
`;

export const recruiting = css`
  background-color: #28a745;
`;

export const closed = css`
  background-color: #dc3545;
`;
