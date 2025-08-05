import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SimpleSelect from "../components/SimpleSelect";
import { useApiSelect } from "../components/hooks/useSelect";

function AdditionalInfoPage() {
  const location = useLocation();
  const { options: gunguOptions, selectedValue: selectedGunguId, setSelectedValue: setSelectedGunguId, loading } = useApiSelect('gunguId', 'gunguName');
  const { email, name, oauthType } = location.state || {};

  const [nickname, setNickname] = useState("");

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
        oauthType,
        nickname,
      }),
    });

    const result = await response.json();
    console.log(result);
  };


  return (
    <div>
      <h2>추가 정보 입력</h2>
      <input type="file" name="profileFile"/>
      <div>
        <h3>이메일</h3>
        <input disabled value={email}/>
      </div>
      <div>
        <h3>이름</h3>
        <input disabled value={name}/>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <SimpleSelect
          label="군/구"
          value={selectedGunguId}
          onChange={(e) => setSelectedGunguId(e.target.value)}
          options={gunguOptions}
          loading={loading}
        />
        <button type="submit">제출</button>
      </form>
    </div>
  );
}

export default AdditionalInfoPage;