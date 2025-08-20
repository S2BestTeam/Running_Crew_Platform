import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Signin from "./pages/Auth/Signin/Signin";
import Home from "./pages/home/Home";
import Signup from "./pages/Auth/Signup/Signup";
import Mypage from "./pages/Mypage/Mypage";
import List from "./pages/Crew/List/List";
import LeftBar from "./pages/Crew/LeftBar/LeftBar";
import CrewRegister from "./pages/Crew/Register/CrewRegister";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/oauth2/signin" element={<Signin />} />
        <Route path="/auth/oauth2/signup" element={<Signup />} />
        <Route path="/crew/register" element={<CrewRegister />} />
        <Route path="/crews" element={<List />} />
        <Route path="/crews/:crewId/*" element={<LeftBar />} />
        <Route path="/mypage/*" element={<Mypage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
