import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  height: 100vh;
  background-color: #000;
`

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

