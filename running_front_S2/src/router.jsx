import { createBrowserRouter } from "react-router-dom";
import OAuthCallbackPage from "./pages/OAuthCallbackPage";
import AdditionalInfoPage from "./pages/AdditionalInfoPage";

const router = createBrowserRouter([
  {
    path: "/auth/oauth2/login",
    element: <OAuthCallbackPage />,
  },
  {
    path: "/additional-info",
    element: <AdditionalInfoPage />,
  },
]);

export default router;