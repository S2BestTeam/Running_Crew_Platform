/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./styles";
import { reqPrincipal } from "../../../api/user/UserApi";
import MainContainer from "../../../components/MainContainer/MainContainer";
import api from "../../../api/axios";

function Mypage() {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const userInfo = async () => {
      try {
        const response = await reqPrincipal();
        console.log("불러온 유저 정보:", response?.data?.body?.user);
        setUserInfo(response?.data?.body?.user);
      } catch (err) {
        setError(err);
      }
    };

    userInfo();
  }, []);

  const handleProfileImgUpdateClick = () => {
    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      api.post(`/api/users/${userInfo.userId}/img`, formData, {
        headers: {
          "Content-Type": "mutipart/form-data",
        },
      });
    };

    fileInput.click();
  };

  return (
    <MainContainer>
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
                <img src="" alt="" />
              </div>
              <button onClick={handleProfileImgUpdateClick}>
                프로필 사진 변경하기
              </button>
            </div>
          </div>

          <div>이름: {userInfo?.fullName}</div>
          <div>이메일: {userInfo?.email}</div>
          <div>닉네임: {userInfo?.nickname}</div>
          <div>생년월일: {userInfo?.birthDate}</div>
          <div>연락처: {userInfo?.phoneNumber}</div>
          <div>성별: {userInfo?.gender}</div>
          <div>도시: {userInfo?.gungu.gunguName}</div>
        </div>
      </div>
    </MainContainer>
  );
}

export default Mypage;
