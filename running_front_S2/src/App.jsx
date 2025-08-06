import { BrowserRouter, Routes, Route } from "react-router-dom";
import OAuthCallbackPage from "./pages/OAuthCallbackPage";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Signin from "./pages/Auth/Signin/Signin";
import Signup from "./pages/Auth/Signup/Signup";


function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/auth/oauth2/signin" element={<OAuthCallbackPage />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;