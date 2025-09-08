import { css } from "@emotion/react";

export const footer = css`
  padding: 5rem 1.5rem;
  text-align: center;
  width: 100%;
  background-color: #1f1f21;
  color: #a6a6a6;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  font-size: 1.4rem;
  box-shadow: inset 0 1px 0 #333; 
`;

export const links = css`
  display: flex;
  gap: 2rem;

  a {
    color: #a6a6a6;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s, text-shadow 0.2s;

    &:hover {
      color: #fff;
      text-shadow: 0 0 2px #fff;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
`;

export const socialIcons = css`
  display: flex;
  gap: 1.5rem;
  font-size: 1.8rem;

  a {
    color: #a6a6a6;
    transition: color 0.2s, transform 0.2s;

    &:hover {
      color: #fff;
      transform: scale(1.1);
    }
  }
`;

export const contact = css`
  line-height: 1.6;
  font-size: 1.3rem;

  div {
    margin: 0.2rem 0;
  }
`;

export const copyright = css`
  font-size: 1.2rem;
  border-top: 1px solid #333;
  `;
