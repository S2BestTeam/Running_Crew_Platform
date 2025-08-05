import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";

function AdditionalInfoPage() {
  const location = useLocation();
  const [ gunguList, setGunguList ] = useState([]);
  const [ selectedGunguId, setSelectedGunguId ] = useState("");
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


  useEffect(() => {
    axios.get('http://localhost:8080/api/regions/gungu')
      .then((res) =>{
        console.log(res);
        setGunguList(res.data.body)
      })
      .catch((err) => console.error(err));
  }, []);


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
      <FormControl fullWidth>
        <InputLabel id="sido-select-label">시/도</InputLabel>
        <Select
          labelId="sido-select-label"
          id="sido-select"
          value={selectedGunguId}
          label="시/도"
          onChange={(e) => setSelectedGunguId(e.target.value)}
        >
          {
            gunguList.map((gungu) => (
              <MenuItem key={gungu.gunguId} value={gungu.gunguId}>
                {gungu.gunguName}
              </MenuItem>
          ))}
        </Select>
      </FormControl>
        <button type="submit">제출</button>
      </form>
    </div>
  );
}

export default AdditionalInfoPage;