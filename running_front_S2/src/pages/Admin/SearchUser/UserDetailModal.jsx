/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import useGetMyCrewsQuery from "../../../queries/useGetMyCrewsQuery";
import useGetMyGatheringQuery from "../../../queries/useGetMyGatheringQuery";
import * as s from "./styles";

function UserDetailModal({ user, onClose, onSave }) {
  if (!user) return null;

  const [activeTab, setActiveTab] = useState("crews");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    nickname: user.nickname,
    phoneNumber: user.phoneNumber,
  });

  const userCrewsQuery = useGetMyCrewsQuery(user.userId);
  const userGatheringQuery = useGetMyGatheringQuery(user.userId);

  const myCrews = userCrewsQuery?.data?.body || [];
  const myGatherings = userGatheringQuery?.data?.body || [];
  const userPosts = user.posts || [];

  const handleUserInputOnChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    const updateUser = {
      userId: userData.userId,
    }
    
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      nickname: user.nickname,
      phoneNumber: user.phoneNumber,
    });
    setIsEditing(false);
  };

  return (
    <div css={s.overlay}>
      <div css={s.modal}>
        <div css={s.editIcon} onClick={() => setIsEditing(true)}>
          <FaPen size={18} />
        </div>

        <div css={s.profileSection}>
          <div css={s.profileImageWrapper}>
            {user.picture ? (
              <img src={user.picture} alt={user.fullName} css={s.profileImage} />
            ) : (
              <div css={s.noImage}>{user.nickname}</div>
            )}
          </div>

          <div>
            {isEditing ? (
              <>
                <p>
                  <b>닉네임:</b>{" "}
                  <input name="nickname" value={userData.nickname} onChange={handleUserInputOnChange} />
                </p>
                <p>
                  <b>전화번호:</b>{" "}
                  <input name="phoneNumber" value={userData.phoneNumber} onChange={handleUserInputOnChange} />
                </p>
                <div css={s.editButtons}>
                  <button css={s.saveButton} onClick={handleSave}>저장</button>
                  <button css={s.cancelButton} onClick={handleCancel}>취소</button>
                </div>
              </>
            ) : (
              <>
                <p><b>성명:</b> {user.fullName}</p>
                <p><b>닉네임:</b> {user.nickname}</p>
                <p><b>이메일:</b> {user.email}</p>
                <p><b>주소:</b> {user.address}</p>
                <p><b>전화번호:</b> {user.phoneNumber}</p>
              </>
            )}
          </div>
        </div>

        <div css={s.tabMenu}>
          {["crews", "gatherings", "posts"].map((tab) => (
            <div
              key={tab}
              css={[s.tab, activeTab === tab && s.activeTab]}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "crews" && "가입된 크루"}
              {tab === "gatherings" && "참여한 일정"}
              {tab === "posts" && "작성한 글"}
            </div>
          ))}
        </div>

        <div css={s.tabContent}>
          {activeTab === "crews" && (
            myCrews.length > 0 ? (
              <div css={s.cardWrapper}>
                {myCrews.map((crew) => (
                  <div key={crew?.crewId} css={s.card}>
                    <p><b>크루 이름:</b> {crew?.crewName}</p>
                    <p><b>권한:</b> {crew?.roleName}</p>
                  </div>
                ))}
              </div>
            ) : <p>가입된 크루가 없습니다.</p>
          )}

          {activeTab === "gatherings" && (
            myGatherings.length > 0 ? (
              <div css={s.gatheringWrapper}>
                {myGatherings.map((event, idx) => (
                  <div key={idx} css={s.gatheringCard}>
                    <p><b>크루:</b> {event?.crewName}</p>
                    <p><b>제목:</b> {event?.title}</p>
                    <p><b>날짜/시간:</b> {event?.runningDate} {event?.runningTime}</p>
                    <p><b>장소:</b> {event?.placeName}</p>
                  </div>
                ))}
              </div>
            ) : <p>참여한 일정이 없습니다.</p>
          )}

          {activeTab === "posts" && (
            userPosts.length > 0 ? (
              <div css={s.postWrapper}>
                {userPosts.map((post) => (
                  <div key={post.postId} css={s.postCard}>
                    <p><b>제목:</b> {post.title}</p>
                    <p><b>작성일:</b> {post.createdAt}</p>
                  </div>
                ))}
              </div>
            ) : <p>작성한 글이 없습니다.</p>
          )}
        </div>

        {/* 닫기 버튼 */}
        <div css={s.footer}>
          <button css={s.closeButton} onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
}

export default UserDetailModal;
