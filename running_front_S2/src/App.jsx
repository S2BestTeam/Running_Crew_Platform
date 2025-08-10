import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Signin from "./pages/Auth/Signin/Signin";
import Home from "./pages/home/Home";
import Signup from "./pages/Auth/Signup/Signup";
import CrewCreate from "./pages/Crew/CrewCreate";
import CrewList from "./pages/Crew/CrewList/CrewList";
import Mypage from "./pages/User/Mypage/Mypage";
import Calendar from "./pages/calendar/Calendar";
import Inquiry from "./pages/Inquiry/Inquiry";
import AdminInquiry from "./pages/Inquiry/Admin/AdminInquiry";
import CrewInquiry from "./pages/Inquiry/Crew/CrewInquiry";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/oauth2/signin" element={<Signin />} />
        <Route path="/auth/oauth2/signup" element={<Signup />} />
        <Route path="/crew/create" element={<CrewCreate />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/crews" element={<CrewList/>} />
        <Route path="/calender" element={<Calendar/>} />
        <Route path="/inquiry" element={<Inquiry/>} />
        <Route path="/inquiry/admin" element={<AdminInquiry/>} />
        <Route path="/inquiry/crew" element={<CrewInquiry/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
