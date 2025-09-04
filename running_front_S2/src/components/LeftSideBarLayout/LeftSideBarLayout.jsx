/** @jsxImportSource @emotion/react */
import * as s from "./styles";

function LeftSideBarLayout({
  profileSection,
  navigationButtons,
  bottomSection,
  children,
}) {
  return (
    <>
      <div css={s.leftBox}>
        <div>
          {profileSection}
          <div css={s.buttonContainer}>{navigationButtons}</div>
        </div>
        {bottomSection}
      </div>
    </>
  );
}

export default LeftSideBarLayout;
