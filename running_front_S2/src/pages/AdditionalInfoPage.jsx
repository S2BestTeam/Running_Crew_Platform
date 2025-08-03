import { useLocation } from "react-router-dom";
import { useState } from "react";

function AdditionalInfoPage() {
  const location = useLocation();
  const { email, name, providerId } = location.state || {};

  const [nickname, setNickname] = useState("");
  const [region, setRegion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    const response = await fetch("/api/user-info", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        providerId,
        nickname,
        region,
      }),
    });

    const result = await response.json();
    console.log(result);
  };

  return (
    <div>
      <h2>추가 정보 입력</h2>
      <input disabled value={email}/>
      <p>이름: {name}</p>
      <p>providerId: {providerId}</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          type="text"
          placeholder="지역"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />
        <button type="submit">제출</button>
      </form>
    </div>
  );
}

export default AdditionalInfoPage;
