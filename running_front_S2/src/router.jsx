import { createBrowserRouter } from "react-router-dom";
import OAuthCallbackPage from "./pages/OAuthCallbackPage";
import SignUp from "./pages/Auth/Signup/Signup";

const router = createBrowserRouter([
  {
    path: "/auth/oauth2/signin",
    element: <OAuthCallbackPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

export default router;