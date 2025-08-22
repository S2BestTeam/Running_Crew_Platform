/** @jsxImportSource @emotion/react */
import ContentLayout from '../../../components/ContentLayout/ContentLayout';
import LeftSideBarLayout from '../../../components/LeftSideBarLayout/LeftSideBarLayout';
import MainContainer from '../../../components/MainContainer/MainContainer';
import usePrincipalQuery from '../../../queries/usePrincipalQuery';
import MypageModify from '../Modify/MypageModify';
import Wishlist from '../Wishlist/Wishlist';
import * as s from './styles';
import { Route, Routes, useNavigate } from 'react-router-dom';

function MCategory(props) {
  const navigate = useNavigate();
  const principal = usePrincipalQuery();
  const user = principal?.data?.data?.body?.user;

  const profileSection = (
    <div css={s.userSimpleInfo}>
      <div css={s.profileImgBox}>
        <img src={user?.picture} alt="프로필 이미지" />
      </div>
      <div css={s.userText}>
        <div css={s.nick}>{user?.nickname}</div>
        <div css={s.email}>{user?.email}</div>
      </div>
    </div>
  );

  const navigationButtons = (
    <>
      <button>크루 신청 내역</button>
      <button onClick={() => navigate("/mypage/wish")}>위시 리스트</button>
      <button>C</button>
      <button>D</button>
    </>
  );

  return (
    <MainContainer>
      <LeftSideBarLayout
        profileSection={profileSection}
        navigationButtons={navigationButtons}
        >
      <ContentLayout>
        <Routes>
          <Route path='/' element={<MypageModify />}/>
          <Route path='/wish' element={<Wishlist />}/>
        </Routes>
      </ContentLayout>
      </LeftSideBarLayout>
    </MainContainer>
  );
}

export default MCategory;