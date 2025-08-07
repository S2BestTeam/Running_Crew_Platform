/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";

function Signin() {
  const handleLogin = (provider) => {
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
  };

  return (
    <div css={s.container}>
      <div css={s.loginTitle}>S2BestTeam</div>
      <div css={s.buttons}>
        <button onClick={() => handleLogin("google")}>
          <FcGoogle />
          구글 계정으로 로그인
        </button>
        <button onClick={() => handleLogin("kakao")}>
          <RiKakaoTalkFill />
          카카오 계정으로 로그인
        </button>
        <button onClick={() => handleLogin("naver")}>
          <SiNaver />
          네이버 계정으로 로그인
        </button>
      </div>
    </div>
  );
}

export default Signin;
