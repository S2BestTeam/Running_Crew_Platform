/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./styles";
import { FiHeart, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import usePrincipalQuery from "../../queries/usePrincipalQuery";

function Header(props) {
  const principalQuery = usePrincipalQuery();

  // 추후 프로필 이미지 또는 닉네임으로 변경하기 위해 코드 유지
  const princiapl = principalQuery?.data?.data?.body?.user;
  
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate("");

  const handleProfileClick = () => {
    const accessToken = localStorage.getItem("AccessToken");
    if (accessToken) {
      navigate("/mypage");
    } else {
      navigate("/auth/oauth2/signin");
    }
  };

  return (
    <header css={s.header}>
      <div css={s.logo} onClick={() => navigate("/")}>
        S2BestTeam
      </div>
      <nav css={s.nav}>
        <ul css={s.menu}>
          <li
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <a href="#" >크루소개</a>
          </li>

          <li
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <a href="#">대회일정</a>
          </li>

          <li
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <a href="#">커뮤니티</a>
          </li>
          <li
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <a href="#">갤러리</a>
          </li>
          <li
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <a href="#">고객센터</a>
          </li>
          <li
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <a href="#">크루등록</a>
          </li>
        </ul>

        {showDropdown && (
          <div
            css={s.fullDropdown}
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <div css={s.menuDetail}>
              <div>크루소개</div>
              <a href="#" onClick={() => navigate("/crews")}>지역별 크루</a>
            </div>
            <div css={s.menuDetail}>
              <div>대회일정</div>
              <a href="#">대회일정</a>
              <a href="#">캘린더</a>
            </div>
            <div css={s.menuDetail}>
              <div>커뮤니티</div>
              <a href="#">자유게시판</a>
            </div>
            <div css={s.menuDetail}>
              <div>갤러리</div>
              <a href="#">사진첩</a>
            </div>
            <div css={s.menuDetail}>
              <div>고객센터</div>
              <a href="#">공지사항</a>
              <div onClick={() => navigate("/inquiry")}>러너의 소리</div>
            </div>
            <div css={s.menuDetail}>
              <div>크루등록</div>
              <div onClick={() => navigate("/crew/create")}>크루등록</div>
            </div>
          </div>
        )}
      </nav>
      <div css={s.icons}>
        <div css={s.icon}>
          <FiHeart />
        </div>
        {/* 로그인시 프로필 이미지로 바뀜*/}
        <div css={s.icon} onClick={handleProfileClick}>
          <FiUser />
        </div>
      </div>
    </header>
  );
}

export default Header;