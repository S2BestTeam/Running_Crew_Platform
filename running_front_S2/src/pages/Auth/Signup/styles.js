import { css } from "@emotion/react";

export const container = css`
  margin: 0 auto;
  width: 60%;
`;

export const formBox = css`
  width: 100%;
  text-align: left;
`;

export const title = css`
  margin-bottom: 2rem;
  text-align: center;
`;

export const formGroup = css`
  margin-bottom: 1.5rem;

  h3 {
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
  }

  input,
  select {
    width: 100%;
    padding: 0.75rem;
    border: 0.1rem solid #ebebeb;
    border-radius: 0.5rem;
    box-sizing: border-box;
  }

  p {
    margin-top: 0.5rem;
    font-size: 0.9rem;
  }
`;

export const addressGroup = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* 인풋 사이 여백 */
  margin-top: 0.5rem;
`;

export const profileImageWrapper = css`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

export const profileImage = css`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const inputWithButton = css`
  display: flex;
  gap: 0.5rem;

  input {
    flex: 1;
  }

  button {
    white-space: nowrap;
  }
`;

export const button = css`
  background-color: #000;
  color: #fff;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background-color: #333;
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

export const birthdaySelect = css`
  display: flex;
  gap: 0.5rem;

  select {
    flex: 1;
  }
`;

export const buttonWrapper = css`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

export const signupButton = css`
  transition: background 0.2s;
  min-width: 12rem;
  height: 4rem;
  background: #222222;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;
