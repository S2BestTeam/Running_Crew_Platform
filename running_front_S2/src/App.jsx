import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Signin from "./pages/Auth/Signin/Signin";
import Home from "./pages/home/Home";
import Signup from "./pages/Auth/Signup/Signup";
import List from "./pages/Crew/List/List";
import CrewRegister from "./pages/Crew/Register/CrewRegister";
import CCategory from "./pages/Crew/CCategory/CCategory";
import MCategory from "./pages/Mypage/MCategory/MCategory";
import ReactModal from "react-modal";
import { useKakaoLoader } from "react-kakao-maps-sdk";
import CrewRanking from "./pages/Ranking/CrewRanking/CrewRanking";
import UserRanking from "./pages/Ranking/UserRanking/UserRanking";
import GlobalFree from "./pages/GlobalFree/GlobalFree";
import BoardReg from "./pages/GlobalFree/BoardReg/BoardReg";
import BoardDetail from "./pages/GlobalFree/BoardDetail/BoardDetail";
import BoardEdit from "./pages/GlobalFree/Edit/BoardEdit";
import Calender from "./pages/Schedule/Calender/Calender";
import GlobalNotice from "./pages/GlobalNotice/GlobalNotice";
import NoticeReg from "./pages/GlobalNotice/NoticeReg/NoticeReg";
import NoticeDetail from "./pages/GlobalNotice/NoticeDetail/NoticeDetail";
import NoticeEdit from "./pages/GlobalNotice/Edit/NoticeEdit";
import Ask from "./pages/Ask/Ask";
import AskDetail from "./pages/Ask/AskDetail/AskDetail";
import AskReg from "./pages/Ask/AskReg/AskReg";
import Competition from "./pages/Schedule/Competition/Competition";
import { useEffect, useState} from "react";
import Admin from "./pages/Admin/Admin";
import SearchUser from "./pages/Admin/SearchUser/SearchUser";

function App() {
  const mapLoader = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY,
    libraries: ["clusterer", "drawing", "services"],
  });

  ReactModal.setAppElement("#root");

  const location = useLocation();
  const [isAdminPage, setIsAdminPage] = useState(false);

  useEffect(() => {
    const adminPageCheck = location.pathname.startsWith('/admin');
    setIsAdminPage(adminPageCheck);
  }, [location.pathname]);

  return (
    <>
      {!isAdminPage && <Header />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/oauth2/signin" element={<Signin />} />
        <Route path="/auth/oauth2/signup" element={<Signup />} />
        <Route path="/crew/register" element={<CrewRegister />} />
        <Route path="/crews" element={<List />} />
        <Route path="/crews/:crewId/*" element={<CCategory />} />
        <Route path="/mypage/*" element={<MCategory />} />
        <Route path="/crewRanking" element={<CrewRanking />} />
        <Route path="/userRanking" element={<UserRanking />} />
        <Route path="/free" element={<GlobalFree />} />
        <Route path="/free/register" element={<BoardReg />} />
        <Route path="/free/:freeId" element={<BoardDetail />} />
        <Route path="/free/:freeId/edit" element={<BoardEdit />} />

        <Route path="/notice" element={<GlobalNotice />} />
        <Route path="/notice/register" element={<NoticeReg />} />
        <Route path="/notice/:noticeId" element={<NoticeDetail />} />
        <Route path="/notice/:noticeId/edit" element={<NoticeEdit />} />

        <Route path="/ask" element={<Ask />} />
        <Route path="/ask/register" element={<AskReg />} />
        <Route path="/ask/:askId" element={<AskDetail />} />

        <Route path="/calender" element={<Calender />} />
        <Route path="/competition" element={<Competition />} />
        
        {/* Admin 라우트들 */}
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
      
      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;
