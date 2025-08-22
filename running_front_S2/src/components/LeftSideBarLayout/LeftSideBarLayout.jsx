/** @jsxImportSource @emotion/react */
import * as s from './styles';
import MainContainer from "../MainContainer/MainContainer";

function LeftSideBarLayout({ profileSection, navigationButtons, bottomSection, children }) {
  return (
      <div css={s.layout}>
        <div css={s.leftBox}>
          <div>
            {profileSection}
            <div css={s.buttonContainer}>
              {navigationButtons}
            </div>
          </div>
          {bottomSection}
        </div>
        <div css={s.rightContent}>
          {children}
        </div>
      </div>
  );
}

export default LeftSideBarLayout;