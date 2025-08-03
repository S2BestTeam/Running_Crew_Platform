import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function OAuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const email = searchParams.get("email");
    const name = searchParams.get("name");
    const providerId = searchParams.get("providerId");

    if (!accessToken || !email) {
      console.error("Missing OAuth data");
      return;
    }

    // 저장 (임시: localStorage 사용)
    localStorage.setItem("accessToken", accessToken);

    // 상태 전달 or 쿼리로 넘김
    navigate("/additional-info", {
      state: {
        email,
        name,
        providerId,
      },
    });
  }, []);

  return <div>로그인 처리 중입니다...</div>;
}

export default OAuthCallbackPage;
