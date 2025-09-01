/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import useGetMyCrewsQuery from "../../../queries/useGetMyCrewsQuery";
import useGetMyGatheringQuery from "../../../queries/useGetMyGatheringQuery";
import * as s from "./styles";
import { reqCheckNickname, reqDeleteUser, reqUserInfoUpdate, reqUserProfileUpdate } from "../../../api/User/UserApi";
import { SIGNUP_REGEX, SIGNUP_REGEX_ERROR_MESSAGE } from "../../../constants/signupRegex";
import { useQueryClient } from "@tanstack/react-query";
import { reqReportDelete, reqUserReported } from "../../../api/Admin/adminApi";
import { MdDelete } from "react-icons/md";

function UserDetailModal({ user, onClose, onSave }) {
  if (!user) return null;

  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("crews");
  const [isEditing, setIsEditing] = useState(false);
  const [reports, setReports] = useState({ madeReports: [], receivedReports: [] });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await reqUserReported(user?.userId);
        setReports(response.data.body);
      } catch (err) {
        console.error("신고 내역 불러오기 실패", err);
      }
    };
    fetchReports();
  }, [user?.userId]);
  

  const [updateUser, setUpdateUser] = useState({
    userId: user.userId,
    picture : user.picture,
    fullName : user.fullName,
    email: user.email,
    address : user.address,
    nickname: user.nickname || "",
    phoneNumber: user.phoneNumber || "",
  });

  const [isNicknameChecked, setIsNicknameChecked] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [errors, setErrors] = useState({
    nickname: "",
    phoneNumber: "",
  });

  const userCrewsQuery = useGetMyCrewsQuery(user.userId);
  const userGatheringQuery = useGetMyGatheringQuery(user.userId);

  const myCrews = userCrewsQuery?.data?.body || [];
  const myGatherings = userGatheringQuery?.data?.body || [];
  const userPosts = user.posts || [];

  const handleProfileImgUpdateClick = () => {
      const fileInput = document.createElement("input");
      fileInput.setAttribute("type", "file");
      fileInput.setAttribute("accept", "image/*");
      fileInput.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
  
        try {
          const formData = new FormData();
          formData.append("profileFile", file);
          await reqUserProfileUpdate(user?.userId, formData);
          alert("프로필 사진 변경이 저장되었습니다.");
        } catch (error) {
          alert("프로필 사진 변경에 실패했습니다.");
          console.error(error);
        }
      };
      fileInput.click();
    };

  const validateField = (field, value) => {
    switch (field) {
      case "nickname":
        if (!SIGNUP_REGEX.nickName.test(value)) {
          return SIGNUP_REGEX_ERROR_MESSAGE.nickName;
        }
        return "";
      case "phoneNumber":
        if (!SIGNUP_REGEX.phoneNumber.test(value)) {
          return SIGNUP_REGEX_ERROR_MESSAGE.phoneNumber;
        }
        return "";
      default:
        return "";
    }
  };

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setUpdateUser((prev) => ({ ...prev, nickname: value }));

    if (value !== user.nickname) {
      setIsNicknameChecked(false);
    } else {
      setIsNicknameChecked(true);
    }

    const errorMsg = validateField("nickname", value);
    setErrors((prev) => ({ ...prev, nickname: errorMsg }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setUpdateUser((prev) => ({ ...prev, phoneNumber: value }));

    const errorMsg = validateField("phoneNumber", value);
    setErrors((prev) => ({ ...prev, phoneNumber: errorMsg }));
  };

  const handleNicknameCheck = async () => {
    const nickname = updateUser.nickname.trim();
    if (!nickname) return;
    if (nickname === user.nickname) {
      setIsNicknameChecked(true);
      alert("현재 사용 중인 닉네임입니다.");
      return;
    }

    try {
      const response = await reqCheckNickname(nickname);
      const isAvailable = response.data.body === "false";
      if (isAvailable) {
        setIsNicknameChecked(true);
        alert("사용 가능한 닉네임입니다.");
      } else {
        setIsNicknameChecked(false);
        alert("중복된 닉네임입니다.");
      }
    } catch (error) {
      alert("중복확인 중 오류가 발생했습니다.");
      console.error(error);
    }
  };

  const validateAll = () => {
    const nicknameError = validateField("nickname", updateUser.nickname);
    const phoneError = validateField("phoneNumber", updateUser.phoneNumber);

    setErrors({
      nickname: nicknameError,
      phoneNumber: phoneError,
    });

    if (updateUser.nickname !== user.nickname && !isNicknameChecked) {
      alert("닉네임 중복 확인을 해주세요.");
      return false;
    }

    return !nicknameError && !phoneError;
  };

  const hasChanges = () => {
    return (
      updateUser.nickname !== user.nickname ||
      updateUser.phoneNumber !== user.phoneNumber
    );
  };

  const handleSave = async () => {
    if (!validateAll()) return;
    if (!hasChanges()) {
      alert("변경된 내용이 없습니다.");
      return;
    }

    setIsSaving(true);
    try {
      await reqUserInfoUpdate(updateUser);
      queryClient.invalidateQueries(["searchUser", user.userId]); 
      alert("유저 정보가 성공적으로 저장되었습니다.");
      if (onSave) onSave(updateUser);
      setIsEditing(false);
    } catch (error) {
      alert("정보 저장에 실패했습니다.");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setUpdateUser({
      userId: user.userId,
      nickname: user.nickname,
      phoneNumber: user.phoneNumber,
    });
    setErrors({ nickname: "", phoneNumber: "" });
    setIsEditing(false);
  };

  const handleReportDeleteOnClick = async (reportId) => {
    try {
      await reqReportDelete(reportId);
      alert("신고 내역이 삭제되었습니다.");
      
      const response = await reqUserReported(user?.userId);
      setReports(response.data.body);
    } catch (error) {
      alert("신고 삭제에 실패했습니다.");
      console.error("신고 삭제 오류:", error);
    }
  };

  const handleUserDeleteOnClick = async (e, userId) => {
    e.stopPropagation();
    if (window.confirm('정말 추방시겠습니까?')) {
      try {
        await reqDeleteUser(userId);
        alert('유저를 추방시켰습니다.');
        navigate('/');
      } catch (error) {
        alert('추방 처리 중 오류가 발생했습니다.');
        console.error(error);
      }
    }
  }

  return (
    <div css={s.overlay}>
      <div css={s.modal}>
        <div css={s.editIcon} onClick={() => setIsEditing(true)}>
          <FaPen css={s.ModifyButton} size={18} />
          <MdDelete css={s.deleteButton} size={22} onClick={(e) => handleUserDeleteOnClick(e, user?.userId)}/>
        </div>

        <div css={s.profileSection}>
          <div css={s.profileImageWrapper}  onClick={handleProfileImgUpdateClick}>
            <img src={user.picture} alt={user.fullName} css={s.profileImage} />
          </div>

          <div>
            {isEditing ? (
              <>
                <p><b>성명:</b> {user.fullName}</p>
                <p>
                  <b>닉네임:</b>{" "}
                  <input
                    name="nickname"
                    value={updateUser.nickname}
                    onChange={handleNicknameChange}
                  />
                  {errors.nickname && <p css={s.nicknameErrMsg}>{errors.nickname}</p>}
                  <button
                    onClick={handleNicknameCheck}
                    disabled={!updateUser.nickname.trim() || errors.nickname}
                  >
                    {isNicknameChecked ? "❤️ 사용 가능!" : "중복 확인"}
                  </button>
                </p>
                <p><b>이메일:</b> {user.email}</p>
                <p><b>주소:</b> {user.address}</p>
                <p>
                  <b>전화번호:</b>{" "}
                  <input
                    name="phoneNumber"
                    value={updateUser.phoneNumber}
                    onChange={handlePhoneChange}
                  />
                  {errors.phoneNumber && <p css={s.errMsg}>{errors.phoneNumber}</p>}
                </p>
                <div css={s.editButtons}>
                  <button css={s.saveButton} onClick={handleSave} disabled={isSaving}>
                    {isSaving ? "저장 중..." : "저장"}
                  </button>
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
          {["crews", "gatherings", "report" , "posts"].map((tab) => (
            <div
              key={tab}
              css={[s.tab, activeTab === tab && s.activeTab]}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "crews" && "가입된 크루"}
              {tab === "gatherings" && "참여한 일정"}
              {tab === "report" && "신고 이력"}
              {tab === "posts" && "작성한 글"}
            </div>
          ))}
        </div>

        <div css={s.tabContent}>
          {activeTab === "crews" &&
            (myCrews.length > 0 ? (
              <div css={s.cardWrapper}>
                {myCrews.map((crew) => (
                  <div key={crew?.crewId} css={s.card}>
                    <p><b>크루 이름:</b> {crew?.crewName}</p>
                    <p><b>권한:</b> {crew?.roleName}</p>
                  </div>
                ))}
              </div>
            ) : <p>가입된 크루가 없습니다.</p>)}

          {activeTab === "gatherings" &&
            (myGatherings.length > 0 ? (
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
            ) : <p>참여한 일정이 없습니다.</p>)}

          {activeTab === "report" && (
            <div>
              <h3>📌 내가 신고한 내역</h3>
              {reports.madeReports.length > 0 ? (
                <ul css={s.reportList}>
                  {reports.madeReports.map((r) => (
                    <li key={r.reportId} css={s.reportItem}>
                      <div css={s.reportContent}>
                        <div css={s.reportMain}>
                          <span css={s.reportReason}>{r.reason}</span>
                          <span css={s.reportTarget}>→ {r.reportedMemberName}</span>
                        </div>
                        <span css={s.reportDate}>{new Date(r.createdAt).toLocaleDateString("ko-KR")}<MdDelete css={s.deleteButton} onClick={() => handleReportDeleteOnClick(r.reportId)}/></span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>📭 내가 신고한 내역이 없습니다.</p>
              )}

              <h3>📌 내가 신고당한 내역</h3>
              {reports.receivedReports.length > 0 ? (
                <ul css={s.reportList}>
                  {reports.receivedReports.map((r) => (
                    <li key={r.reportId} css={s.reportItem}>
                      <div css={s.reportContent}>
                        <div css={s.reportMain}>
                          <span css={s.reportReason}>{r.reason}</span>
                          <span css={s.reportTarget}>← {r.reportMemberName}</span>
                        </div>
                        <span css={s.reportDate}>{new Date(r.createdAt).toLocaleDateString("ko-KR")}<MdDelete css={s.deleteButton} onClick={() => handleReportDeleteOnClick(r.reportId)}/></span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>📭 내가 신고당한 내역이 없습니다.</p>
              )}
            </div>
          )}

          {activeTab === "posts" &&
            (userPosts.length > 0 ? (
              <div css={s.postWrapper}>
                {userPosts.map((post) => (
                  <div key={post.postId} css={s.postCard}>
                    <p><b>제목:</b> {post.title}</p>
                    <p><b>작성일:</b> {post.createdAt}</p>
                  </div>
                ))}
              </div>
            ) : <p>작성한 글이 없습니다.</p>)}
        </div>

        <div css={s.footer}>
          <button css={s.closeButton} onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
}

export default UserDetailModal;
