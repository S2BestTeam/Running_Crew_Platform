import { css } from "@emotion/react";

export const container = css`
  text-align: center;
  margin: 0 auto;
  width: 100%;
`;

export const tabActive = css`
  color: #000;
  font-weight: 500;
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
  gap: 1rem;
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

export const searchInput = css`
  height: 3.425rem;
  box-sizing: border-box;
  padding: 0.8rem;
  border: 0.1rem solid #ccc;
  border-right: none;
  border-radius: 0.6rem 0 0 0.6rem;
  outline: none;
  min-width: 20rem;

  &:focus {
    border-color: #666;
  }
`;

export const searchButton = css`
  height: 3.425rem;
  box-sizing: border-box;
  padding: 0.8rem 1.2rem;
  border: 0.1rem solid #000;
  border-left: none;
  background: #000;
  color: white;
  border-radius: 0 0.6rem 0.6rem 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #333;
  }
`;

export const registerButton = css`
  width: 12rem;
  padding: 0.6rem 1.2rem;
  background: #000;
  color: white;
  border-radius: 0.6rem;
  cursor: pointer;
  align-items: center;
  justify-content: center;
`;

export const table = css`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
`;

export const tr = css`
  cursor: pointer;

  :hover {
    background-color: #cececeff;
  }
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