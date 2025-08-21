import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Signin from "./pages/Auth/Signin/Signin";
import Home from "./pages/home/Home";
import Signup from "./pages/Auth/Signup/Signup";
import List from "./pages/Crew/List/List";
import CrewRegister from "./pages/Crew/Register/CrewRegister";
<<<<<<< HEAD
import CCategory from "./pages/Crew/CCategory/CCategory";
import MCategory from "./pages/Mypage/MCategory/MCategory";
=======
import ReactModal from "react-modal";
>>>>>>> origin/33-report-part-modify


function App() {
  ReactModal.setAppElement('#root');
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
      </Routes>
      <Footer />
    </>
  );
}

export default App;
