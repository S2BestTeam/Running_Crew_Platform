import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  flex-direction: row;
  padding-top: 2rem;
`;

export const leftBox = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 0.1rem solid #dbdbdb;
  border-radius: 0.5rem;
  width: 18rem;
  padding: 1rem;
  background-color: #ffffff;
  top: 0;
`;


export const rightContent = css`
  flex: 1;
  padding: 20px;
  background-color: white;
`;

export const buttonContainer = css`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;

  & > button {
    text-align: left;
    margin: 0.3rem 0;
    padding: 0.6rem;
    border-radius: 0.5rem;
    background-color: transparent;
    border: none;
    cursor: pointer;

    :hover {
      font-weight: bold;
      background-color: rgba(129, 126, 126, 0.1);
    }
  }
`;