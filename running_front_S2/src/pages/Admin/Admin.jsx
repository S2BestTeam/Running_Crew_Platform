/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { useQueryClient } from "@tanstack/react-query";
import { Outlet, useNavigate, useLocation, Routes, Route } from "react-router-dom";
import { Database, BarChart3, MessageSquare, Headphones, LogOut, Settings } from "lucide-react";
import { FaUserCog } from "react-icons/fa";
import SearchUser from './SearchUser/SearchUser';

function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  
  const menus = [
    { 
      title: "유저 정보", 
      path: "/admin/user-info",
      icon: <FaUserCog size={18}/>
    },
    { 
      title: "크루정보", 
      path: "/admin/crew-info",
      icon: <Database size={18} />
    },
    { 
      title: "랭킹정보", 
      path: "/admin/ranking-info",
      icon: <BarChart3 size={18} />
    },
    { 
      title: "커뮤니티", 
      path: "/admin/community",
      icon: <MessageSquare size={18} />
    },
    { 
      title: "고객센터", 
      path: "/admin/support",
      icon: <Headphones size={18} />
    },
  ];

  const handleLogout = () => {
    const accessToken = localStorage.getItem("AccessToken");
    if (accessToken) {
      const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
      if (confirmLogout) {
        localStorage.removeItem("AccessToken");
        queryClient.clear();
        navigate("/", { replace: true });
        alert("로그아웃되었습니다.");
      }
    } else {
      alert("로그인 상태가 아닙니다.");
    }
  };

  return (
    <div css={s.container}>
      {/* Sidebar */}
      <div css={s.sidebar}>
        {/* Header */}
        <div css={s.sidebarHeader}>
          <div css={s.headerContent}>
            <div css={s.logoIcon}>
              <Settings css={s.logoIconSvg} />
            </div>
            <div>
              <h2 css={s.title}>관리자</h2>
              <p css={s.subtitle}>Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav css={s.navigation}>
          {menus.map((menu, idx) => {
            const isActive = location.pathname === menu.path;
            return (
              <div
                key={idx}
                onClick={() => navigate(menu.path)}
                css={[s.menuItem, isActive && s.menuItemActive]}
              >
                <div css={[s.menuIcon, isActive && s.menuIconActive]}>
                  {menu.icon}
                </div>
                <span css={s.menuText}>{menu.title}</span>
              </div>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div css={s.logoutContainer}>
          <button
            onClick={handleLogout}
            css={s.logoutButton}
          >
            <LogOut size={18} css={s.logoutIcon} />
            <span>로그아웃</span>
          </button>
        </div>
      </div>

      <Routes>
        <Route path="/user-info" element={<SearchUser />} />
      </Routes>
    </div>
  );
}

export default Admin;