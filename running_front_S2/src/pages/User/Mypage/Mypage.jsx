/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./styles";
import MainContainer from "../../../components/MainContainer/MainContainer";
import api from "../../../api/axios";
import usePrincipalQuery from "../../../queries/usePrincipalQuery";

function Mypage() {
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
          </div>
        </div>
      )}
    </MainContainer>
  );
}

export default Mypage;