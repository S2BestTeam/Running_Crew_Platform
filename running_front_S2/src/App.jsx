import { BrowserRouter, Routes, Route } from "react-router-dom";
import OAuthLoginPage from "./pages/OAuthLoginPage";
import OAuthCallbackPage from "./pages/OAuthCallbackPage";
import AdditionalInfoPage from "./pages/AdditionalInfoPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OAuthLoginPage />} />
        <Route path="/auth/oauth2/login" element={<OAuthCallbackPage />} />
        <Route path="/additional-info" element={<AdditionalInfoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;