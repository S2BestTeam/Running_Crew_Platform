import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  let baseURL = "http://localhost:8080";

  // 진우
  if (mode === "wlsdn") {
    baseURL = "https://s2runningcrew.store";
  }else {
    baseURL = "http://localhost:8080"
  }

  // 다정
  // if (mode === "dajeong") {
  //   baseURL = "https://s2runningcrew.site";
  // }else {
  //   baseURL = "http://localhost:8080"
  // }

  // 선영
  // if (mode === "sunyoung") {
  //   baseURL = "https://busanrun.store";
  // }else {
  //   baseURL = "http://localhost:8080"
  // }

  return {
    plugins: [react()],
    define: {
      __API_HOST__:JSON.stringify(baseURL),
    }
  };
})
