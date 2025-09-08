/** @jsxImportSource @emotion/react */
import { useQueryClient } from "@tanstack/react-query";
import { Database, Headphones, Home, LogOut, Settings } from "lucide-react";
import { FaUserCog } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import usePrincipalQuery from '../../queries/User/usePrincipalQuery';
import AdminRoute from '../../routes/AdminRoute';
import * as s from './styles';

function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const principalQuery = usePrincipalQuery();
  const user = principalQuery?.data?.data?.body?.user;
  
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
      title: "고객센터", 
      path: "/admin/ask",
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
      <div css={s.sidebar}>
        <div css={s.sidebarHeader}>
          <div css={s.headerContent}>
            <div css={s.logoIcon}>
              <Settings css={s.logoIconSvg} onClick={() => navigate("/")}/>
            </div>
            <div>
              <h2 css={s.title}>관리자</h2>
              <p css={s.subtitle}>{user?.nickname} 님</p>
            </div>
          </div>
        </div>

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

      {AdminRoute()}
    </div>
  );
}

export default Admin;