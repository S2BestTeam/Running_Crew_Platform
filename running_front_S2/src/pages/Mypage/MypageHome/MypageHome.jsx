/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useEffect, useState } from "react";
import usePrincipalQuery from "../../../queries/usePrincipalQuery";
import { reqCheckNickname, reqUserProfileUpdate } from "../../../api/User/userApi";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function Mypage() {
  const principalQuery = usePrincipalQuery();
  const userInfo = principalQuery.data?.data?.body.user;
  const userId = userInfo?.userId;

  const [ nickname, setNickname] = useState("");
  const [ isNicknameChecked, setIsNicknameChecked ] = useState(false);
  const [ phoneNumber, setPhoneNumber ] = useState("");

  useEffect(() => {
    setNickname(userInfo?.nickname);
    setPhoneNumber(userInfo?.phoneNumber);
  },[])

  const handleProfileImgUpdateClick = () => {
    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("profileFile", file);
      await reqUserProfileUpdate(userId, formData);
      principalQuery.refetch();
    };

    fileInput.click();
  };

  const handleNicknameOnChange = (e) => {
    const value = e.target.value;
    setNickname(value);
    setIsNicknameChecked(false);
  };

  const handleNicknameOnCheck = async () => {
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

  const handlePhoneOnChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
  };

  return (
    <>
      {!principalQuery.isLoading && (
        <div css={s.layout}>
          <div css={s.userInfoContainer}>
            <div css={s.title}>내 정보 관리</div>
              <div>
                <div css={s.aAndbImg}>
                  <div css={s.profileImgBox} onClick={handleProfileImgUpdateClick}>
                    <img src={userInfo?.profileImg} alt="" />
                  </div>
                  <button css={s.button}>저장</button>
                </div>
              </div>
              <div>
                <Box css={s.TextFieldBox} sx={{
                    "& .MuiInputBase-input": {
                      fontSize: "1.2rem",
                    }}}>
                  <div css={s.line}>
                    <div css={s.nickNameBox}>
                      <TextField label="닉네임" variant="outlined" value={nickname}
                        onChange={handleNicknameOnChange} InputLabelProps={{ shrink: true }} sx={{width: '40rem'}}/>
                      <button onClick={handleNicknameOnCheck}>
                        {isNicknameChecked ? "❤️ 사용 가능!" : "닉네임 중복 확인"}
                      </button>
                    </div>
                    <div css={s.aAndb}>
                      <div>
                        <TextField label="이름" disabled variant="outlined" value={userInfo?.fullName} InputLabelProps={{ shrink: true }}  css={s.font} sx={{width: '40rem'}}/>
                      </div>
                      <div>
                        <div>
                          <TextField label="이메일" disabled variant="outlined" value={userInfo?.email} InputLabelProps={{ shrink: true }} sx={{width: '40rem'}}/>
                        </div>
                        <div css={s.oauthType}>{userInfo?.oauthType} 아이디로 가입한 유저입니다.</div>
                      </div>
                    </div>
                    <div css={s.aAndb}>
                      <div>
                        <TextField label="생년월일" disabled variant="outlined" value={userInfo?.birthDate} InputLabelProps={{ shrink: true }} sx={{width: '40rem'}}/>
                      </div>
                      <div>
                        <TextField label="성별" disabled variant="outlined" value={userInfo?.gender === 1 ? "남성" : "여성"} InputLabelProps={{ shrink: true }} sx={{width: '40rem'}}/>
                      </div>
                    </div>
                    <div css={s.aAndb}>
                      <div>
                        <TextField label="연락처" variant="outlined" value={phoneNumber} type="tel"
                          onChange={handlePhoneOnChange} InputLabelProps={{ shrink: true }} sx={{width: '40rem'}}/>
                      </div>
                      <div>
                        <TextField label="도시" disabled variant="outlined" value={userInfo?.address} InputLabelProps={{ shrink: true }} sx={{width: '40rem'}}/>
                      </div>
                    </div>
                  </div>
                </Box>
              </div>
              <div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Mypage;