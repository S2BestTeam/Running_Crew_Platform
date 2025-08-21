/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { Route, Routes } from 'react-router-dom';
import usePrincipalQuery from '../../queries/usePrincipalQuery';
import MypageModify from './Modify/MypageModify';
import LiftSideBarLayout from '../../components/LiftSideBarLayout/LiftSideBarLayout';
import { useEffect } from 'react';

function Mypage(props) {
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
      <button>위시 리스트</button>
      <button>C</button>
      <button>D</button>
    </>
  );

  return (
    <LiftSideBarLayout
      profileSection={profileSection}
      navigationButtons={navigationButtons}
    >
        <Routes>
          <Route path='/' element={<MypageModify />}/>
        </Routes>
    </LiftSideBarLayout>
  );
}

export default Mypage;