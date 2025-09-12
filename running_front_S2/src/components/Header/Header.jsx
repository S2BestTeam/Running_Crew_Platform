/** @jsxImportSource @emotion/react */
import { useQueryClient } from "@tanstack/react-query";
import { Settings } from "lucide-react";
import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import * as s from "./styles";
import usePrincipalQuery from "../../queries/User/usePrincipalQuery";

function Header() {
  const principalQuery = usePrincipalQuery();
  const queryClient = useQueryClient();
  const userInfo = principalQuery?.data?.data?.body?.user;

  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setShowDropdown(false);
  };

  const handleProfileClick = () => {
    const accessToken = localStorage.getItem("AccessToken");
    handleNavigate(accessToken ? "/mypage" : "/auth/oauth2/signin");
  };

  const handleLogout = () => {
    const accessToken = localStorage.getItem("AccessToken");
    if (!accessToken) return alert("로그인 상태가 아닙니다.");

    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem("AccessToken");
      queryClient.clear();
      handleNavigate("/");
      alert("로그아웃되었습니다.");
    }
  };

  const handleAdminPageOnClick = () => handleNavigate("/admin");

  return (
    <header css={s.header}>
      <div css={s.logo} onClick={() => handleNavigate("/")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="115"
          height="15"
          viewBox="0 0 120.12 19.32"
        >
          <path
            fill="#FFFFFF"
            d="M25.94,12.91c0,3.15-1.59,6.41-8.95,6.41H0L2.08,7.57h17.1c0.98,0,1.91-0.38,1.91-1.53c0-0.75-0.72-1.01-1.47-1.01H2.51L7.48,0h12.8c4.16,0,6.7,1.56,6.7,4.54c0,2.77-1.76,4.3-3.44,4.85C24.93,9.79,25.94,11.03,25.94,12.91z M7.34,11.7l-0.46,2.66h11.01c1.47,0,2.14-0.58,2.14-1.56c0-0.72-0.52-1.1-1.68-1.1H7.34z"
          />
          <path
            fill="#FFFFFF"
            d="M58.26,19.32h-8l-3.41-5.11h-9.19l-0.9,5.11h-5.98l1.73-9.88h16.81c1.99,0,3.73-0.95,3.73-2.51c0-1.27-1.1-1.91-2.95-1.91H33.3L38.1,0h12.42c4.04,0,8.84,1.24,8.84,5.86c0,3.5-2.51,6.44-6.24,7.16c0.55,0.49,1.16,1.18,2.22,2.54L58.26,19.32z"
          />
          <path
            fill="#FFFFFF"
            d="M88.15,14.36l-4.71,4.97h-9.71c-6.04,0-10.05-3.64-10.05-8.52C63.68,4.45,69.75,0,77.14,0h13.55l-4.74,5.03h-9.71c-3.55,0-6.56,2.28-6.56,5.34c0,2.4,1.99,3.99,4.91,3.99H88.15z"
          />
          <path
            fill="#FFFFFF"
            d="M109.23,14.38H99.12l-0.87,4.94h-5.95l1.73-9.88h16.64c2.08,0,3.35-1.07,3.35-2.57c0-1.13-0.9-1.85-2.57-1.85H94.82L99.67,0h12.13c5.37,0,8.32,2.51,8.32,6.21C120.12,11.01,115.93,14.38,109.23,14.38z"
          />
        </svg>
      </div>

      <nav
        css={s.nav}
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(true)}
      >
        <ul css={s.menu}>
          <li>
            <a>크루정보</a>
          </li>
          <li>
            <a>랭킹정보</a>
          </li>
          <li>
            <a>커뮤니티</a>
          </li>
          <li>
            <a>대회일정</a>
          </li>
          <li>
            <a>고객센터</a>
          </li>
        </ul>
      </nav>

      {showDropdown && (
        <div
          css={s.fullDropdown}
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <div css={s.menuDetail}>
            <div>크루정보</div>
            <div onClick={() => handleNavigate("/crew/register")}>크루등록</div>
            <div onClick={() => handleNavigate("/crews")}>지역별 크루</div>
          </div>
          <div css={s.menuDetail}>
            <div>랭킹정보</div>
            <div onClick={() => handleNavigate("/crewRanking")}>크루랭킹</div>
            <div onClick={() => handleNavigate("/userRanking")}>개인랭킹</div>
          </div>
          <div css={s.menuDetail}>
            <div>커뮤니티</div>
            <div onClick={() => handleNavigate("/free")}>자유게시판</div>
          </div>
          <div css={s.menuDetail}>
            <div>대회정보</div>
            <div onClick={() => handleNavigate("/competition")}>대회일정</div>
            <div onClick={() => handleNavigate("/calender")}>캘린더</div>
          </div>
          <div css={s.menuDetail}>
            <div>고객센터</div>
            <div onClick={() => handleNavigate("/notice")}>공지사항</div>
            <div onClick={() => handleNavigate("/ask")}>러너의 소리</div>
          </div>
        </div>
      )}

      <div css={s.icons}>
        {userInfo?.role === "ROLE_ADMIN" && (
          <div css={s.icon} onClick={handleAdminPageOnClick}>
            <Settings />
          </div>
        )}
        <div css={s.icon} onClick={handleProfileClick}>
          {userInfo?.picture ? (
            <div css={s.profileImgBox}>
              <img src={userInfo.picture} alt="프로필 이미지" />
            </div>
          ) : (
            <FiUser />
          )}
        </div>
        {userInfo && (
          <div css={s.icon} onClick={handleLogout}>
            <TbLogout />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
