import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { reqCheckNickname, reqRegisterUser } from "../api/User/UserApi";

function AdditionalInfoPage() {
  const location = useLocation();
  const [gunguList, setGunguList] = useState([]);
  const [selectedGunguId, setSelectedGunguId] = useState("");

  // OAuth에서 받아온 데이터
  const { email, name, oauthType } = location.state || {};

  // 추가 입력 필드들
  const [nickname, setNickname] = useState("");
  const [isNicknameChecked, setIsNicknameChecked] = useState(false); // 중복 확인 여부 저장
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [profileImgPath, setProfileImgPath] = useState("");

  // 생일 관련 state
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  // 구/군 목록 가져오기
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/regions/gungu")
      .then((res) => {
        console.log(res);
        setGunguList(res.data.body);
      })
      .catch((err) => console.error(err));
  }, []);

  // 생일 선택 옵션들
  const BIRTHDAY_YEAR_LIST = Array.from({ length: 50 }, (_, i) => 1970 + i);
  const BIRTHDAY_MONTH_LIST = Array.from({ length: 12 }, (_, i) => i + 1);
  const BIRTHDAY_DAY_LIST = Array.from({ length: 31 }, (_, i) => i + 1);

  // 닉네임 중복 확인
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setIsNicknameChecked(false); // 닉네임 변경 시 중복 확인 다시 하도록 초기화
  };

  const handleCheckNickname = async () => {
  if (!nickname.trim()) return;

  try {
    const response = await reqCheckNickname(nickname);
    const isNicknameAvailable = response.data.body === "false"; // "false"면 사용 가능

    if (isNicknameAvailable) {
      setIsNicknameChecked(true);
      alert("사용 가능한 닉네임입니다!");
    } else {
      alert("중복된 닉네임입니다.");
    }
  } catch{
    alert("중복확인 중 오류가 발생했습니다.");
  }
};


  const handleOnRegisterUser = async () => {
    const birthDate = `${selectedYear}-${selectedMonth
      .toString()
      .padStart(2, "0")}-${selectedDay.toString().padStart(2, "0")}`;
    const userInfo = {
      email: email,
      oauthType: oauthType,
      fullName: name,
      nickname: nickname,
      birthDate: birthDate,
      gender: parseInt(gender),
      profileImg: profileImgPath,
      phoneNumber: phoneNumber,
      gunguId: parseInt(selectedGunguId),
    };

    console.log("보낼 데이터:", userInfo);

    try {
      const result = await reqRegisterUser(userInfo);
      console.log("회원가입 성공:", result);
      alert("회원가입이 완료되었습니다!");
      // 성공 후 페이지 이동 등 처리
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <div>
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
              setProfileImgPath(`/images/${file.name}`);
            }
          }}
        />
        {profileImgPath && <p>선택된 이미지: {profileImgPath}</p>}
      </div>

      <div>
        <h3>이메일</h3>
        <input disabled value={email} />
      </div>
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
    value={nickname}
    onChange={handleNicknameChange}
    required
  />

  {/* ✅ 닉네임 중복 확인 버튼 */}
  {/* ✅ 닉네임 중복 확인 버튼 */}
<button
  type="button"
  onClick={handleCheckNickname}
  disabled={!nickname.trim()} // 입력 없으면 비활성화
  style={{ marginTop: '8px' }}
>
  {isNicknameChecked ? "❤️ 사용 가능!" : "닉네임 중복 확인"}
</button>

</div>

      {/* 전화번호 */}
      <div>
        <h3>전화번호</h3>
        <input
          type="tel"
          placeholder="010-1234-5678"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>

      {/* 성별 */}
      <div>
        <h3>성별</h3>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">선택하세요</option>
          <option value="1">남자</option>
          <option value="2">여자</option>
        </select>
      </div>

      {/* 구/군 선택 */}
      <FormControl fullWidth>
        <InputLabel id="gungu-select-label">구/군</InputLabel>
        <Select
          labelId="gungu-select-label"
          id="gungu-select"
          value={selectedGunguId}
          label="구/군"
          onChange={(e) => setSelectedGunguId(e.target.value)}
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
        <div style={{ display: "flex", gap: "10px" }}>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            required
          >
            <option value="">년도</option>
            {BIRTHDAY_YEAR_LIST.map((year) => (
              <option key={year} value={year}>
                {year}년
              </option>
            ))}
          </select>

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            required
          >
            <option value="">월</option>
            {BIRTHDAY_MONTH_LIST.map((month) => (
              <option key={month} value={month}>
                {month}월
              </option>
            ))}
          </select>

          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            required
          >
            <option value="">일</option>
            {BIRTHDAY_DAY_LIST.map((day) => (
              <option key={day} value={day}>
                {day}일
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 제출 버튼 */}
      <button
        type="button"
        onClick={handleOnRegisterUser}
        disabled={
          !isNicknameChecked ||
          !nickname ||
          !phoneNumber ||
          !profileImgPath ||
          !selectedGunguId ||
          !selectedYear ||
          !selectedMonth ||
          !selectedDay ||
          !gender
        }
      >
        회원가입 완료
      </button>
    </div>
  );
}

export default AdditionalInfoPage;
