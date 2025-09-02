import { css } from "@emotion/react";

export const header = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  padding: 2rem 3.2rem;
  background-color: #1f1f21;
  color: white;
  position: relative;
`;

export const logo = css`
  font-size: 2rem;
  font-weight: 600;
  color: #fff;
  flex-shrink: 0;
  cursor: pointer;
`;

export const nav = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;

export const menu = css`
  list-style: none;
  display: flex;
  gap: 5rem;
  margin: 0;
  padding: 0;
  font-size: 1.4rem;
  font-weight: 400;

  li {
    position: relative;

    a {
      box-sizing: border-box;
      text-decoration: none;
      color: #fff;
      padding: 0.8rem;
      display: block;
      transition: background-color 0.2s;
      height: 3.6rem;

      &:hover {
        border-bottom: solid 0.3rem #fff;
      }
    }
  }
`;

export const menuDetail = css`
  padding: 3rem;
  display: flex;
  flex-direction: column;

  div {
    color: #a6a6a6;
    padding: 0.8rem 1.6rem;
    text-decoration: none;
    white-space: nowrap;
    transition: color 0.2s;

    &:hover {
      color: #fff;
      cursor: pointer;
    }
  }

  & > div:first-of-type {
    font-weight: bold;
    cursor: default;
    color: #fff;
  }
`;

export const fullDropdown = css`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0; 
  width: auto;  
  background-color: #1f1f21;
  display: flex;
  justify-content: center;
  gap: 4rem;
  padding: 16px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const icons = css`
  display: flex;
  gap: 0.8rem;
  color: #fff;
  font-size: 2.2rem;
  flex-shrink: 0;
`;

export const icon = css`
  box-sizing: border-box;
  border-radius: 50%;
  width: 3.6rem;
  height: 3.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #ebebeb26;
  }
`;
