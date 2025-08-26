/** @jsxImportSource @emotion/react */
import { reqDeleteUser } from '../../../api/User/userApi';
import ContentLayout from '../../../components/ContentLayout/ContentLayout';
import LeftSideBarLayout from '../../../components/LeftSideBarLayout/LeftSideBarLayout';
import MainContainer from '../../../components/MainContainer/MainContainer';
import usePrincipalQuery from '../../../queries/usePrincipalQuery';
import MypageModify from '../Modify/MypageModify';
import Post from '../Post/Post';
import Welcome from '../Welcome/Welcome';
import Wishlist from '../Wishlist/Wishlist';
import * as s from './styles';
import { Route, Routes, useNavigate } from 'react-router-dom';

function MCategory(props) {
  const navigate = useNavigate();
  const principal = usePrincipalQuery();
  const user = principal?.data?.data?.body?.user;
  const userId = principal?.data?.data?.body?.user?.userId;

  const handleDeleteUserOnClick = async () => {
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      try {
        await reqDeleteUser(userId);
        alert('탈퇴가 완료되었습니다. 그동안 이용해 주셔서 감사합니다.');
        navigate('/');
      } catch (error) {
        alert('탈퇴 처리 중 오류가 발생했습니다.');
        console.error(error);
      }
    }
  }

  const profileSection = (
    <div css={s.userSimpleInfo} onClick={() => navigate(`/mypage`)}>
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
      <button onClick={() => navigate("/mypage/welcome")}>크루 신청 내역</button>
      <button onClick={() => navigate("/mypage/wish")}>나의 크루 리스트</button>
      <button>내가 쓴 글</button>
      <button>나의 정모일정</button>
    </>
  );

  const bottomSection = (
    <div css={s.getout}>
      <button onClick={handleDeleteUserOnClick}>탈퇴하기</button>
    </div>
  );

  return (
    <MainContainer>
      <LeftSideBarLayout
        profileSection={profileSection}
        navigationButtons={navigationButtons}
        bottomSection={bottomSection}
      >
        <ContentLayout>
          <Routes>
            <Route path='/' element={<MypageModify />}/>
            <Route path='/wish' element={<Wishlist />}/>
            {/* <Route path='/post' element={<Post />}/> */}
            <Route path='/welcome' element={<Welcome />} />
          </Routes>
        </ContentLayout>
      </LeftSideBarLayout>
    </MainContainer>
  );
}

export default MCategory;