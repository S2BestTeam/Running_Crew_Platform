import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { reqRegisterUser } from "../../api/user/userApi";
import { reqGungu } from "../../api/useReqList";

function Signup(props) {
  const navigate = useNavigate();
  const [ searchParams ] = useSearchParams();
  const email = searchParams.get("email");
  const name = searchParams.get("name");
  const oauthType = searchParams.get("oauthType");
  const [gunguList, setGunguList] = useState([]);

  const [ userData, setUserData ] = useState({
    email : email,
    fullName : name,
    oauthType : oauthType,
    nickname : "",
    gender : "",
    phoneNumber : "",
    birthDate: {
      year: "",
      month: "",
      day: ""
    },
    profileImg: "",
    gunguId: "",
  })


  const BIRTHDAY_YEAR_LIST = Array.from(
    { length: 50 },
    (_, i) => 1970 + i,
  );
  const BIRTHDAY_MONTH_LIST = Array.from({ length: 12 }, (_, i) => i + 1);
  const BIRTHDAY_DAY_LIST = Array.from({ length: 31 }, (_, i) => i + 1);

  useEffect(() => {
    reqGungu()
      .then((res) => {
        setGunguList(res.data.body)
      })
      .catch((err) => console.error(err));
  }, []);


  const handleSubmit = async (e) => {
    const birthDate = `${userData.birthDate.year}-${userData.birthDate.month.padStart(2, '0')}-${userData.birthDate.day.padStart(2, '0')}`;
    const submitData = {
      ...userData,
      birthDate : birthDate
    };
    try {
      const result = await reqRegisterUser(submitData);
      console.log("회원가입 성공:", result);
      alert("회원가입이 완료되었습니다!");
      navigate("/");
    } catch (error) {
      console.log(submitData);
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다.");
    }

  };

  return (
    <div style={{backgroundColor: "white"}}>
      <h2>추가 정보 입력</h2>

      {/* 프로필 이미지 */}
      <div>
        <h3>프로필 이미지</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setUserData({...userData, profileImg : `/images/${file.name}`});
            }
          }}
        />
        {userData.profileImg && <p>선택된 이미지: {userData.profileImg}</p>}
      </div>

      {/* 이메일 */}
      <div>
        <h3>이메일</h3>
        <input disabled value={email} />
      </div>

      {/* 이름 */}
      <div>
        <h3>이름</h3>
        <input disabled value={name} />
      </div>

      {/* 닉네임 */}
      <div>
        <h3>닉네임</h3>
        <input
          type="text"
          placeholder="닉네임"
          value={userData.nickname}
          onChange={(e) => setUserData({ ...userData, nickname: e.target.value })}
        />
      </div>

      {/* 전화번호 */}
      <div>
        <h3>전화번호</h3>
        <input
          type="tel"
          placeholder="010-1234-5678"
          value={userData.phoneNumber}
          onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
        />
      </div>

      {/* 성별 */}
      <div>
        <h3>성별</h3>
        <select
          value={userData.gender}
          onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
        >
          <option value="">선택하세요</option>
          <option value="1">남자</option>
          <option value="2">여자</option>
        </select>
      </div>

      {/* 군/구 */}
      <FormControl style={{backgroundColor: "gray", width: "fit-content"}}>
        <InputLabel id="gungu-select-label">구/군</InputLabel>
        <Select
          labelId="gungu-select-label"
          id="gungu-select"
          value={userData.gunguId}
          label="구/군"
          onChange={(e) => setUserData({...userData, gunguId : e.target.value})}
          required
        >
          {gunguList.map((gungu) => (
            <MenuItem key={gungu.gunguId} value={gungu.gunguId}>
              {gungu.gunguName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* 생일 */}
      <div>
        <h3>생일</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select
            value={userData.birthDate.year}
            onChange={(e) =>
              setUserData({
                ...userData,
                birthDate: { ...userData.birthDate, year: e.target.value }
              })
            }
          >
            <option value="">년도</option>
            {BIRTHDAY_YEAR_LIST.map((year) => (
              <option key={year} value={year}>{year}년</option>
            ))}
          </select>

          <select
            value={userData.birthDate.month}
            onChange={(e) =>
              setUserData({
                ...userData,
                birthDate: { ...userData.birthDate, month: e.target.value }
              })
            }
          >
            <option value="">월</option>
            {BIRTHDAY_MONTH_LIST.map((month) => (
              <option key={month} value={month}>{month}월</option>
            ))}
          </select>

          <select
            value={userData.birthDate.day}
            onChange={(e) =>
              setUserData({
                ...userData,
                birthDate: { ...userData.birthDate, day: e.target.value }
              })
            }
          >
            <option value="">일</option>
            {BIRTHDAY_DAY_LIST.map((day) => (
              <option key={day} value={day}>{day}일</option>
            ))}
          </select>
        </div>
      </div>
        <button type="submit" onClick={handleSubmit}>제출</button>
    </div>
  );
}

export default Signup;