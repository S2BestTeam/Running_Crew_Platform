import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { reqGunguList } from "../../../api/useReqList";
import { reqCheckNickname, reqRegisterUser } from "../../../api/user/UserApi";
import { useQueryClient } from "@tanstack/react-query";

function Signup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [gunguList, setGunguList] = useState([]);
  const [selectedGunguId, setSelectedGunguId] = useState("");
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const name = searchParams.get("name");
  const oauthType = searchParams.get("oauthType");

  const [nickname, setNickname] = useState("");
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [profileImgPath, setProfileImgPath] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  useEffect(() => {
    reqGunguList()
      .then((res) => setGunguList(res.data.body))
      .catch((err) => console.error(err));
  }, []);

  const BIRTHDAY_YEAR_LIST = Array.from({ length: 50 }, (_, i) => 1970 + i);
  const BIRTHDAY_MONTH_LIST = Array.from({ length: 12 }, (_, i) => i + 1);
  const BIRTHDAY_DAY_LIST = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setIsNicknameChecked(false);
  };

  const handleCheckNickname = async () => {
    if (!nickname.trim()) return;
    try {
      const response = await reqCheckNickname(nickname);
      const isAvailable = response.data.body === "false";
      if (isAvailable) {
        setIsNicknameChecked(true);
        alert("사용 가능한 닉네임입니다!");
      } else {
        alert("중복된 닉네임입니다.");
      }
    } catch {
      alert("중복확인 중 오류가 발생했습니다.");
    }
  };

  const handleOnRegisterUser = async () => {
    const birthDate = `${selectedYear}-${selectedMonth.padStart(
      2,
      "0"
    )}-${selectedDay.padStart(2, "0")}`;
    const user = {
      email,
      oauthType,
      fullName: name,
      nickname,
      birthDate,
      gender: parseInt(gender),
      profileImg: profileImgPath,
      phoneNumber,
      gunguId: parseInt(selectedGunguId),
    };

    try {
      const result = await reqRegisterUser(user);
      const accessToken = result?.data?.body?.accessToken;

      if (accessToken) {
        const bearerToken = `Bearer ${accessToken}`;
        localStorage.setItem("AccessToken", bearerToken);
        await queryClient.invalidateQueries({ queryKey: ["principal"] });
        alert("회원가입이 완료되었습니다!");
        navigate("/");
      } else {
        alert("회원가입은 되었지만 토큰 발급에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <div>
      <h2>추가 정보 입력</h2>

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

      <div>
        <h3>닉네임</h3>
        <input
          type="text"
          value={nickname}
          onChange={handleNicknameChange}
          required
        />
        <button onClick={handleCheckNickname} disabled={!nickname.trim()}>
          {isNicknameChecked ? "❤️ 사용 가능!" : "닉네임 중복 확인"}
        </button>
      </div>

      <div>
        <h3>전화번호</h3>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>

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

      <FormControl fullWidth>
        <InputLabel id="gungu-select-label">구/군</InputLabel>
        <Select
          labelId="gungu-select-label"
          value={selectedGunguId}
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

export default Signup;
