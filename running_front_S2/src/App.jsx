import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Signin from "./pages/Auth/Signin/Signin";
import Signup from "./pages/Auth/Signup/Signup";
import Home from "./pages/home/Home";
import OAuthLoginPage from "./pages/OAuthLoginPage";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/oauth2/login" element={<OAuthLoginPage />} />
        <Route path="/auth/oauth2/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;