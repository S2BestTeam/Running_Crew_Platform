import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Signin from "./pages/Auth/Signin/Signin";
import Home from "./pages/home/Home";
import Signup from "./pages/Auth/Signup/Signup";
import CrewDetail from "./pages/Crew/CrewDetail/CrewDetail";
import CrewRegister from "./pages/Crew/CrewRegister/CrewRegister";
import CrewList from "./pages/Crew/CrewList/CrewList";
import Mypage from "./pages/User/Mypage/Mypage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/oauth2/signin" element={<Signin />} />
        <Route path="/auth/oauth2/signup" element={<Signup />} />
<<<<<<< HEAD
=======
        <Route path="/crews/:crewId/*" element={<CrewDetail />} />
        <Route path="/crews" element={<CrewList />} />
>>>>>>> origin/22-크루-정모-일정-등록-기능-구현
        <Route path="/crew/register" element={<CrewRegister />} />
        <Route path="/crews" element={<CrewList />} />
        <Route path="/crews/:crewId/*" element={<CrewDetail />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
