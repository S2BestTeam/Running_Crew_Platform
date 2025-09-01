import { css } from "@emotion/react";

export const commentBox = css`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const commentInput = css`
  width: 100%;
  min-height: 6rem;
  padding: 1rem;
  border-radius: 0.4rem;
  border: 0.1rem solid #ddd;
  resize: vertical;
  font-size: 1.4rem;
`;

export const commentBtn = css`
  align-self: flex-end;
  padding: 0.8rem 1.6rem;
  border: none;
  border-radius: 0.4rem;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  font-size: 1.4rem;

  &:hover {
    background-color: #0056b3;
  }
`;
