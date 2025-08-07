import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Signin from "./pages/Auth/Signin/Signin";
<<<<<<< HEAD
import Home from "./pages/home/Home";
import Signup from "./pages/Auth/Signup/Signup";
import CrewCreate from "./pages/Crew/CrewCreate";
=======

import Home from "./pages/home/Home";
import Signup from "./pages/Auth/Signup/Signup";
import Mypage from "./pages/User/Mypage/Mypage";
>>>>>>> origin/10-mypage-데이터-불러오기-및-프로필-수정-설계

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/oauth2/signin" element={<Signin />} />
        <Route path="/auth/oauth2/signup" element={<Signup />} />
<<<<<<< HEAD
        <Route path="/crew/create" element={<CrewCreate />} />
=======
        <Route path="/mypage" element={<Mypage />} />
>>>>>>> origin/10-mypage-데이터-불러오기-및-프로필-수정-설계
      </Routes>
      <Footer />
    </>
  );
}

export default App;
