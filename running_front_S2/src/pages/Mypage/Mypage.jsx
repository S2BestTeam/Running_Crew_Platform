/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { Route, Routes } from 'react-router-dom';
import MypageHome from './MypageHome/MypageHome';
import MainContainer from '../../components/MainContainer/MainContainer';
import usePrincipalQuery from '../../queries/usePrincipalQuery';

function Mypage(props) {
  const principal = usePrincipalQuery();
  const user = principal?.data?.data?.body?.user;

  return (
    <MainContainer>
      <div css={s.layout}>
        {/* 좌측 버튼 박스 */}
        <div css={s.leftBox}>
          {/* user */}
          <div css={s.userSimpleInfo}>
            <div css={s.profileImgBox}>
              <img src={user?.profileImg} alt="프로필 이미지" />
            </div>
            <div css={s.userText}>
              <div css={s.nick}>{user?.nickname}</div>
              <div css={s.email}>{user?.email}</div>
            </div>
          </div>
          {/* 버튼 */}
          <div css={s.buttonContainer}>
            <button>A</button>
            <button>B</button>
            <button>C</button>
            <button>D</button>
          </div>
          <div>

          </div>
        </div>
        {/* 랜더링 되는 부분 - div => Routes */}
        <Routes>
          <Route path='/' element={<MypageHome />}/>
        </Routes>
      </div>
    </MainContainer>
  );
}

export default Mypage;