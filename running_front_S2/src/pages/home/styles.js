import { css } from "@emotion/react";

export const container = css`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: #000;
`;

export const main = css`
  flex: 1;
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
    object-fit: cover;
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
    font-size: 4rem;
    font-weight: 800;
  }
`;

export const mainGallery = css`
  margin-bottom: 6rem;
  width: 100%;
`;

export const sliderImg = css`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 0 1rem;

  img {
    width: 60rem;     
    height: 40rem;     
    object-fit: cover;  
    border-radius: 0.5rem;
    box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.3);
  }
`;

export const footer = css`
  height: 5rem;
  background-color: #111;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;
