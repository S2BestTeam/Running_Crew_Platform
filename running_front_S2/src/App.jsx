import { Routes, Route } from "react-router-dom";
import OAuthLoginPage from "./pages/OAuthLoginPage";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/home/Home";


function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/oauth2/login" element={<OAuthLoginPage />} />
        <Route path="/auth/oauth2/signup" element={<Signup />} />
      </Routes>
  );
}

export default App;