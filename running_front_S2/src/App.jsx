import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Signin from "./pages/Auth/Signin/Signin";

import Home from "./pages/home/Home";
import Signup from "./pages/Auth/Signup/Signup";
import Mypage from "./pages/User/Mypage/Mypage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/oauth2/signin" element={<Signin />} />
        <Route path="/auth/oauth2/signup" element={<Signup />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
