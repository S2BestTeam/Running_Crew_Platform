/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./styles";
<<<<<<< HEAD
=======
import { reqPrincipal } from "../../../api/user/UserApi";
>>>>>>> origin/14-마이페이지-수정-기능-및-css-작업
import MainContainer from "../../../components/MainContainer/MainContainer";
import api from "../../../api/axios";
import usePrincipalQuery from "../../../queries/usePrincipalQuery";

function Mypage() {
<<<<<<< HEAD
=======
  const [gunguList, setGunguList] = useState([]);
  const [nickname, setNickname] = useState("");
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");

  const [errors, setErrors] = useState({
    nickname: "",
    phoneNumber: "",
  });

>>>>>>> origin/14-마이페이지-수정-기능-및-css-작업
  const principalQuery = usePrincipalQuery();
  const userInfo = principalQuery.data?.data?.body.user;

  const handleProfileImgUpdateClick = () => {
    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      await api.post(`/api/users/${userInfo.userId}/img`, formData, {
        headers: {
          "Content-Type": "mutipart/form-data",
        },
      });
      principalQuery.refetch();
    };

    fileInput.click();
  };

<<<<<<< HEAD
=======
  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setNickname(value);
    setIsNicknameChecked(false);
    const errorMsg = validateField("nickname", value);
    setErrors((prev) => ({ ...prev, nickname: errorMsg }));
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

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    const errorMsg = validateField("phoneNumber", value);
    setErrors((prev) => ({ ...prev, phoneNumber: errorMsg }));
  };

>>>>>>> origin/14-마이페이지-수정-기능-및-css-작업
  return (
    <MainContainer>
      {!principalQuery.isLoading && (
        <div css={s.container}>
          <div>
            왼쪽 사이드바
            <h2>마이페이지</h2>
          </div>
          <div>
            <div>
              <div>
                <h2>프로필 사진</h2>
                <div>
                  <img src={userInfo?.profileImg} alt="" />
                </div>
                <button onClick={handleProfileImgUpdateClick}>
                  프로필 사진 변경하기
                </button>
              </div>
            </div>

<<<<<<< HEAD
            <div>이름: {userInfo?.fullName}</div>
            <div>이메일: {userInfo?.email}</div>
            <div>닉네임: {userInfo?.nickname}</div>
            <div>생년월일: {userInfo?.birthDate}</div>
            <div>연락처: {userInfo?.phoneNumber}</div>
            <div>
              성별:{" "}
              {userInfo?.gender == 1
                ? "남자"
                : userInfo?.gender == 2
                ? "여자"
                : ""}
            </div>
            <div>도시: {userInfo?.gungu?.gunguName}</div>
=======
            <div>이름</div>
            <input disabled value={userInfo?.fullName}/>
            <div>이메일</div>
            <input disabled value={userInfo?.email}/>
            <div>닉네임:</div>
            <input
              type="text"
              value={userInfo?.nickname}
              onChange={handleNicknameChange}
              required
            />
            <button onClick={handleCheckNickname} disabled={!nickname.trim()}>
              {isNicknameChecked ? "❤️ 사용 가능!" : "닉네임 중복 확인"}
            </button>
            {errors.nickname && <p style={{ color: "red" }}>{errors.nickname}</p>}

            <div>생년월일</div>
            <input disabled value={userInfo?.birthDate}/>
            <div>연락처</div>
            <input
              type="tel"
              value={userInfo?.phoneNumber}
              onChange={handlePhoneChange}
              required
            />
            {errors.phoneNumber && (
              <p style={{ color: "red" }}>{errors.phoneNumber}</p>
            )}
            <div css={gender}>
              <div>성별</div>
              <div
                css={[box, gender === "1" && selectedBox]}
                onClick={() => setGender("1")}
              >
                남자
              </div>
              <div
                css={[box, gender === "2" && selectedBox]}
                onClick={() => setGender("2")}
              >
                여자
              </div>
          </div>
            <div>도시: {userInfo?.gungu.gunguName}</div>
>>>>>>> origin/14-마이페이지-수정-기능-및-css-작업
          </div>
        </div>
      )}
    </MainContainer>
  );
}

<<<<<<< HEAD
export default Mypage;
=======
export default Mypage;
>>>>>>> origin/14-마이페이지-수정-기능-및-css-작업
