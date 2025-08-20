import { css } from "@emotion/react";

export const layout = css`
  width: 100%;
`;

export const headerBox = css`
  display: flex;
  flex-direction: row;
  padding-top: 2rem;
`;

export const gridBox = css`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.6rem;
  padding: 1.6rem;
`;

export const cards = css`
  border: 0.1rem solid #ddd;
  border-radius: 0.8rem;
  padding: 1.2rem;
  background-color: #fafafa;
  cursor: pointer;
`;

export const tumbnailBox = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25rem;
  padding: 1rem 1rem 0 1rem;
  overflow: hidden;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
  }
`;

export const heartIcon = css`
  position: absolute;
  bottom: 0.6rem;
  right: 2rem;
  font-size: 3.2rem;
  color: white;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

export const textBox = css`
  padding-left: 1rem;
`;

export const gungu = css`
  padding: 0.6rem 0 0.6rem 0;
  font-size: 1.2rem;
`;

export const crewName = css`
  font-weight: bold;
`;

export const crewTitle = css`
  font-size: 1.3rem;
  margin-top: 0.4rem;
  color: #333;
`;