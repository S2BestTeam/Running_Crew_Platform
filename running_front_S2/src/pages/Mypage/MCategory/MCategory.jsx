/** @jsxImportSource @emotion/react */
import ContentLayout from '../../../components/ContentLayout/ContentLayout';
import LeftSideBarLayout from '../../../components/LeftSideBarLayout/LeftSideBarLayout';
import MainContainer from '../../../components/MainContainer/MainContainer';
import usePrincipalQuery from '../../../queries/usePrincipalQuery';
import MypageModify from '../Modify/MypageModify';
<<<<<<< HEAD
import Post from '../Post/Post';
=======
import Welcome from '../Welcome/Welcome';
>>>>>>> origin/51-userranking
import Wishlist from '../Wishlist/Wishlist';
import * as s from './styles';
import { Route, Routes, useNavigate } from 'react-router-dom';

function MCategory(props) {
  const navigate = useNavigate();
  const principal = usePrincipalQuery();
  const user = principal?.data?.data?.body?.user;

  const profileSection = (
    <div css={s.userSimpleInfo}  onClick={() => navigate(`/mypage`)}>
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
<<<<<<< HEAD
      <button>크루 신청 내역</button>
      <button onClick={() => navigate("/mypage/wish")}>위시 리스트</button>
      <button>내가 쓴 글</button>
      <button>D</button>
=======
      <button onClick={() => navigate("/mypage/welcome")}>크루 신청 내역</button>
      <button onClick={() => navigate("/mypage/wish")}>나의 크루 리스트</button>
      <button>내가 쓴 글</button>
      <button>나의 정모일정</button>
>>>>>>> origin/51-userranking
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
<<<<<<< HEAD
          {/* <Route path='/post' element={<Post />}/> */}
=======
          <Route path='/welcome' element={<Welcome />} />
>>>>>>> origin/51-userranking
        </Routes>
      </ContentLayout>
      </LeftSideBarLayout>
    </MainContainer>
  );
}

export default MCategory;