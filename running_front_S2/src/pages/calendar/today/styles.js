import { css } from "@emotion/react";

export const date = (today) => {
  return css`
    border-radius: 0.5rem;
    padding: 1.5rem 0 0 1.5rem;
    border: 0.1rem solid #ffffff;
    background-color: ${today ? "white" : "black"};
    color: ${today ? "black" : "gray"};
  `;
};