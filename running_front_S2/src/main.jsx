import { Global } from "@emotion/react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { global } from "./styles/global.js";
import App from "./App.jsx";
import { css } from "@emotion/react";

createRoot(document.getElementById("root")).render(
  <>
    <Global styles={global} />
    <App />
  </>
);
