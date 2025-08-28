/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./styles";
import { FiHeart, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import usePrincipalQuery from "../../queries/usePrincipalQuery";
import { useQueryClient } from "@tanstack/react-query";
import { TbLogout } from "react-icons/tb";

function Header(props) {
  const principalQuery = usePrincipalQuery();
  const queryClient = useQueryClient();

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

  const handleLogout = () => {
    const accessToken = localStorage.getItem("AccessToken");
    
    if (accessToken) {
      const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
      if (confirmLogout) {
        localStorage.removeItem("AccessToken");
        queryClient.clear();
        navigate("/");
        alert("로그아웃되었습니다.");
      }
    } else {
      alert("로그인 상태가 아닙니다.");
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
            <a>크루정보</a>
          </li>

          <li
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <a>랭킹정보</a>
          </li>

          <li
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <a>커뮤니티</a>
          </li>
          <li
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <a>대회일정</a>
          </li>
          <li
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <a>고객센터</a>
          </li>
        </ul>

        {showDropdown && (
          <div
            css={s.fullDropdown}
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <div css={s.menuDetail}>
              <div>크루정보</div>
              <div onClick={() => navigate("/crew/register")}>크루등록</div>
              <div onClick={() => navigate("/crews")}>지역별 크루</div>
            </div>
            <div css={s.menuDetail}>
              <div>랭킹정보</div>
              <div onClick={() => navigate("/crewRanking")}>크루랭킹</div>
              <div onClick={() => navigate("/userRanking")}>개인랭킹</div>
            </div>
            <div css={s.menuDetail}>
              <div>커뮤니티</div>
              <div onClick={() => navigate("/free")}>자유게시판</div>
            </div>
            <div css={s.menuDetail}>
              <div>대회정보</div>
              <div>대회일정</div>
              <div onClick={() => navigate("/calender")}>캘린더</div>
            </div>
            <div css={s.menuDetail}>
              <div>고객센터</div>
              <div>공지사항</div>
              <div onClick={() => navigate("/inquiry")}>러너의 소리</div>
            </div>
          </div>
        )}
      </nav>
      <div css={s.icons}>
        <div css={s.icon} onClick={handleLogout}>
          <TbLogout />
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