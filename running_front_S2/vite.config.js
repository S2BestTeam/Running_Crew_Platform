import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  let baseURL = "http://localhost:8080";

  if (mode === "jinwo") {
    baseURL = "https://s2runningcrew.store";
  }else if (mode === "dajeong") {
    baseURL = "https://s2runningcrew.site";
  }else if (mode === "sunyoung") {
    baseURL = "https://busanrun.store";
  }else {
    baseURL = "http://localhost:8080"
  }

  return {
    plugins: [react()],
    define: {
      __API_HOST__:JSON.stringify(baseURL),
    }
  };
})
