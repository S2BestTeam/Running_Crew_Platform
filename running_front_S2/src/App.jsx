import { BrowserRouter, Routes, Route } from "react-router-dom";
import OAuthLoginPage from "./pages/OAuthLoginPage";
import OAuthCallbackPage from "./pages/OAuthCallbackPage";
import AdditionalInfoPage from "./pages/AdditionalInfoPage";
import Feed from "./pages/test/feed";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OAuthLoginPage />} />
        <Route path="/auth/oauth2/login" element={<OAuthCallbackPage />} />
        <Route path="/additional-info" element={<AdditionalInfoPage />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;