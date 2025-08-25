import { Routes, Route } from "react-router-dom";
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

function App() {
  const mapLoader = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY,
    libraries: ["clusterer", "drawing", "services"],
  });
  
  ReactModal.setAppElement("#root");
  return (
    <>
      <Header />
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
      </Routes>
      <Footer />
    </>
  );
}

export default App;
