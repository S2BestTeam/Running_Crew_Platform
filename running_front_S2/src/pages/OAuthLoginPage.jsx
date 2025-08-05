function OAuthLoginPage() {
  const handleLogin = (provider) => {
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
  };

  return (
    <div>
      <h1>OAuth 로그인</h1>
      <button onClick={() => handleLogin("google")}>Google 로그인</button>
      <button onClick={() => handleLogin("kakao")}>Kakao 로그인</button>
      <button onClick={() => handleLogin("naver")}>Naver 로그인</button>
    </div>
  );
}

export default OAuthLoginPage;
