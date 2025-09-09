import { css } from "@emotion/react";

export const page = css`
  text-align: center;
  margin: 0 auto;
  width: 80%;
`;

export const headerRow = css`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const selectBox = css`
  width: 11rem;
  height: 3.425rem;
  padding: 0.24rem 0.48rem;
  // font-size: 0.76rem;
  border-radius: 0.4rem;
  background-color: #fff;
  color: #333;
  // font-size: 1.4rem;

  .MuiOutlinedInput-notchedOutline {
    border-color: #ccc;
  }
  &:hover .MuiOutlinedInput-notchedOutline {
    border-color: #333;
  }
  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #000 !important;
  }
`;

export const menuItem = css`
  // font-size: 1.4rem;
`;

export const searchBox = css`
  display: flex;
  justify-content: right;
  align-items: center;
  margin: 2rem 0 2rem 0;
  min-width: 0;   
`;

export const searchInput = css`
  height: 3.425rem;
  box-sizing: border-box;
  padding: 0.8rem;
  border: 0.1rem solid var(--main-color);
  border-right: none;
  border-radius: 0.6rem 0 0 0.6rem;
  outline: none;
`;

export const searchButton = css`
  display: flex;
  height: 3.425rem;
  box-sizing: border-box;
  padding: 0.5rem 0.5rem;
  border: 0.1rem solid var(--main-color);
  border-left: none;
  background: #fff;
  color: var(--main-color);
  // font-size: 1.8rem;
  border-radius: 0 0.6rem 0.6rem 0;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
`;


export const sectionTitle = css`
  text-align: center;
  // font-size: 24px;
  // font-weight: 800;
  margin: 24px 0 16px;
`;

export const grid = css`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const card = css`
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: transform 0.12s ease, box-shadow 0.12s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 32px rgba(0, 0, 0, 0.1);
  }
`;

export const thumb = css`
  aspect-ratio: 1.6 / 1;
  width: 100%;
  background: #f5f5f5;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const thumbFallback = css`
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    45deg,
    #f1f1f1,
    #f1f1f1 10px,
    #f9f9f9 10px,
    #f9f9f9 20px
  );
`;

export const cardBody = css`
  padding: 14px 16px 18px;
`;

export const locationSmall = css`
  // font-size: 12px;
  color: #888;
  margin-bottom: 6px;
`;

export const title = css`
  // font-size: 16px;
  // font-weight: 800;
  line-height: 1.35;
  margin-bottom: 6px;
`;

export const dateText = css`
  // font-size: 13px;
  color: #666;
`;

export const empty = css`
  padding: 48px 0;
  text-align: center;
  color: #888;
`;

export const sentinel = css`
  height: 1px;
`;

export const loader = css`
  text-align: center;
  padding: 16px 0;
  color: #666;
`;

export const done = css`
  text-align: center;
  padding: 16px 0 0;
  color: #999;
  // font-size: 13px;
`;
