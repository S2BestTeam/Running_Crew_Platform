import { css } from "@emotion/react";

export const layout = css`
  width: 80rem;
  height: 60rem;
  background-color: #fafafa;
  overflow: hidden;
`;

export const header = css`
  box-sizing: border-box;
  padding: 1rem 2rem;
  height: 6.6rem;
  background-color: #000000;

  & > h2 {
    color: #ffffff;
    font-weight: 400;
  }
`;

export const main = css`
  box-sizing: border-box;
  padding: 1rem 2rem;
  height: 53.4rem;
  overflow-y: scroll;
`;

export const wrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const thumbnailContainer = css`
  width: 15rem;
  height: 15rem;
  border: 2px solid #ebebeb;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    border-color: #999;
  }
`;

export const thumbnailImg = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
`;

export const mapContainer = css`
  display: flex;
  width: 100%;
  height: 30rem;
`;

export const mapSearchResultList = css`
  height: 30rem;
  overflow-y: auto;
  background-color: #ffffff;
`;