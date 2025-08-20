import { css } from "@emotion/react";
// import { backdrop } from "../../../JoinModal/styles";

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