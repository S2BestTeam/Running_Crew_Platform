import { css } from "@emotion/react";

export const layout = css`
  padding: 2rem 45rem 6rem;
`;

export const header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 1rem;
  border: 0.1rem solid #dbdbdb;
  border-radius: 0.4rem;
  padding: 1rem;
`;

export const headerLeft = css`
  display: flex;
  align-items: center;

  & > h3 {
    margin: 0;
    cursor: default;
  }
`;

export const profileImg = css`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin-right: 1rem;
  border: 0.1rem solid #dbdbdb;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  overflow: hidden;

  & > img {
    height: 100%;
  }
`;

export const crewTitleInput = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;

  & .MuiFormControl-root,
  & .MuiTextField-root,
  & .MuiButton-root {
    height: 56px;
  }

  & .MuiInputBase-root {
    height: 56px;
  }
`;

export const selectAndInput = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const imgContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.1rem solid #dbdbdb;
  border-radius: 50%;
  margin-left: 1rem;
  width: 8rem;
  height: 8rem;
  overflow: hidden;
`;

export const plus = css`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 0.8rem;
  width: 60%;
  height: 60%;
  font-size: 3rem;
  background-color: #fafafa;
  cursor: pointer;

  & * {
    color: #777777;
  }

  &:hover {
    background-color: #eeeeee;
  }

  &:active {
    background-color: #e4e4e4;
  }
`;

export const feedImg = (url) => css`
  width: 100%;
  height: 100%;
  background-image: url(${url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  &:hover > div {
    opacity: 1;
  }
`;

export const fixButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #00000088;
  opacity: 0;
  cursor: pointer;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.4rem;
    width: 60%;
    height: 60%;
    background-color: #000000bb;

    & * {
      font-size: 3rem;
      color: #eeeeee;
    }
  }
`;
