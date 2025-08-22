/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const layoutStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding-left: 2rem;
`;

function ContentLayout({ children }) {
  return <div css={layoutStyle}>{children}</div>;
}

export default ContentLayout;