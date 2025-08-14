import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Signin from "./pages/Auth/Signin/Signin";
import Home from "./pages/home/Home";
import Signup from "./pages/Auth/Signup/Signup";
import usePrincipalQuery from "./queries/usePrincipalQuery";
import CrewList from "./pages/Crew/CrewList/CrewList";
import CrewDetail from "./pages/Crew/CrewDetail/CrewDetail";

function App() {
  const principalQuery = usePrincipalQuery();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/oauth2/signin" element={<Signin />} />
        <Route path="/auth/oauth2/signup" element={<Signup />} />
        <Route path="/crews" element={<CrewList />} />
        <Route path="/crews/{crewId}" element={<CrewDetail />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
