import { css } from "@emotion/react";

export const container = css`
  text-align: center;
  margin: 0 auto;
  width: 100%;
`;

export const tabActive = css`
  color: #000;
  // font-weight: 500;
`;

export const searchBox = css`
  display: flex;
  justify-content: right;
  align-items: center;
  margin: 2rem 0 2rem 0;
  flex: 1 1 auto;
  min-width: 0;
`;

export const inputGroup = css`
  display: flex;
  min-width: 0;
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
  // font-size: 1.8rem;
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

export const tr = css`
  cursor: pointer;

  :hover {
    background-color: var(--hB-color);
  }
`;

export const th = css`
  padding: 1.2rem;
  border-bottom: 0.2rem solid #000;
  // font-weight: 600;
`;

export const td = css`
  padding: 1rem;
  border-bottom: 0.1rem solid #ebebeb;
`;

export const tdTitle = css`
  ${td};
  text-align: left;
`;

export const modalBox = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 2.4rem;
  border-radius: 0.8rem;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
  min-width: 400px;
  max-height: 80vh;
  overflow-y: auto;
`;

export const tdProfile = css`
justify-content: center;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const profileImg = css`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
`;

export const attendanceButton = css`
  background: var(--main-color);
  color: #fff;
  border-radius: 0.5rem;
  border: none;
  padding: 0.5rem 0.8rem;
  cursor: pointer;
`;
