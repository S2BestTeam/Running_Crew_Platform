import { css } from '@emotion/react';

export const modalStyles = {
  overlay: {
    backgroundColor: "#000000aa",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  content: {
    position: "static",
    inset: "unset",
    border: "none",
    borderRadius: "12px",
    padding: 0,
    overflow: "hidden",
    background: "#fff",
    width: 500,
    maxWidth: "calc(100% - 24px)",
    boxShadow: "0 10px 30px rgba(0,0,0,.2)",
  },
};

export const headerStyle = css`
<<<<<<< HEAD
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  // font-weight: 700;
=======
  padding: 1.2rem 1.6rem;
  border-bottom: 0.1rem solid #eee;
  font-weight: 700;
>>>>>>> origin/128-세부내용-수정
`;

export const contentStyle = css`
  padding: 1.6rem;
`;

export const nicknameStyle = css`
  margin-bottom: 0.8rem;
`;

export const textareaStyle = css`
  width: 100%;
  height: 12rem;
  resize: none;
`;

export const buttonContainerStyle = css`
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 1.2rem;
`;

export const cancleButton = css`
  padding: 0.4rem 1rem;
  background: var(--main-color);
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
<<<<<<< HEAD
  // font-weight: 500;
  transition: background-color 0.2s ease;
=======
  font-weight: 500;
>>>>>>> origin/128-세부내용-수정

`;

export const reportButton = css`
  padding: 0.4rem 1rem;
  background: #fff;
  color: var(--main-color);
  border: 0.1rem solid var(--main-color);
  border-radius: 0.5rem;
  cursor: pointer;
<<<<<<< HEAD
  // font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background: #218838;
  }
=======
  font-weight: 500;
>>>>>>> origin/128-세부내용-수정
`;