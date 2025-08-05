import { css } from "@emotion/react";

export const header = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 3.2rem;
  background-color: #1f1f21;
  color: white;
  position: relative;
  
`;

export const logo = css`
  font-size: 2rem;
  font-weight: 600;
  color: #fff;
  flex: 1;
`;

export const nav = css`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const menu = css`
  list-style: none;
  display: flex;
  gap: 2.4rem;
  margin: 0;
  padding: 0;
  font-size: 1.6rem;
  font-weight: 400;

  li {
    position: relative;

    a {
      box-sizing: border-box;
      text-decoration: none;
      color: #fff;
      padding: 8px;
      display: block;
      transition: background-color 0.2s;
      height: 36px;

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

  a {
    color: #a6a6a6;
    padding: 8px 16px;
    text-decoration: none;
    white-space: nowrap;
    transition: color 0.2s;

    &:hover {
      color: #fff;
    }
  }

  & > div {
    padding: 8px 16px;
    cursor: default;
  }
`;

export const fullDropdown = css`
  position: absolute;
  top: 35px;
  width: 100vw;
  background-color: #1f1f21;
  display: flex;
  justify-content: center;
  gap: 40px;
  padding: 16px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const icons = css`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  color: #fff;
  font-size: 2.2rem;
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

export const main = css`
  margin: 0;
  padding: 0;
  width: 100%;
  height: auto;
`;

export const mainVideo = css`
  display: flex;
  align-items: center;
  width: 100%;
  height: 55rem;
  overflow: hidden;
  & > video {
    width: 100%;
  }
`;

export const mainText = css`
  margin: 6rem 0;
  color: #ffffff;
  text-align: center;

  & > div:nth-of-type(1) {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }

  & > div:nth-of-type(2) {
    font-size: 5rem;
    font-weight: 800;
  }
`;

export const mainGallery = css`
  margin-bottom: 6rem;
  width: 100%;
`;

export const sliderImg = css`
  box-sizing: border-box;
  width: "96rem";
  padding: 0 2rem;
`;

export const footer = css`
  padding-top: 10rem;
  text-align: center;
  width: 100%;
  height: 20rem;
  background-color: #1f1f21;
  color: #a6a6a6;
`;