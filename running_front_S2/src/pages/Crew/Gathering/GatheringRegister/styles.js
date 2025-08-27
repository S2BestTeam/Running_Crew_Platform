import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const header = css`
  h2 {
    font-size: 24px;
    font-weight: bold;
  }
`;

export const main = css`
  display: flex;
  flex-direction: column;
  gap: 16px;

  input,
  textarea {
    width: 100%;
    padding: 12px 14px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    font-size: 14px;
    transition: border 0.2s;

    &:focus {
      outline: none;
      border-color: #4cafef;
      box-shadow: 0 0 0 3px rgba(76, 175, 239, 0.2);
    }
  }
`;

export const thumbnailContainer = css`
  font-size: 1.2rem;
  width: 50rem;
  height: 30rem;
  border: 0.1rem solid #dbdbdb;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  & svg {
    font-size: 8rem;
    color: #dbdbdb;
  }

  &:hover {
    border-color: #000;
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
  flex-direction: column;
  gap: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
`;

export const mapSearchResultList = css`
  max-height: 120px;
  overflow-y: auto;
  background: #fafafa;
  border-bottom: 1px solid #eee;
  padding: 8px;

  div {
    padding: 6px 10px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #f1f9ff;
    }

    h3 {
      font-size: 14px;
      margin: 0;
      font-weight: bold;
    }

    p {
      font-size: 12px;
      margin: 2px 0;
      color: #555;
    }
  }
`;

export const registerButton = css`
  background: #4cafef;
  color: #fff;
  padding: 14px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 12px;
  transition: background 0.2s;

  &:hover {
    background: #3b9cdc;
  }
`;

export const addressWrapper = css`
  display: flex;
  gap: 8px;

  input {
    flex: 1;
  }

  button {
    padding: 0 16px;
    background: #4cafef;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #3b9cdc;
    }
  }
`;
