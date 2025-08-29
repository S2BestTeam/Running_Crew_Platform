import React, { useState } from "react";
import useGetMyCrewsQuery from "../../../queries/useGetMyCrewsQuery";
import useGetMyGatheringQuery from "../../../queries/useGetMyGatheringQuery";

function UserDetailModal({ user, onClose }) {
  if (!user) return null;

  const [activeTab, setActiveTab] = useState("crews");

  const userCrewsQuery = useGetMyCrewsQuery(user.userId);
  const userGatheringQuery = useGetMyGatheringQuery(user.userId);

  const myCrews = userCrewsQuery?.data?.body || [];
  const myGatherings = userGatheringQuery?.data?.body || [];
  const userPosts = user.posts || [];

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          width: "80%",
          maxHeight: "90%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 상단: 프로필 & 기본 정보 */}
        <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
          <div style={{ flexShrink: 0 }}>
            <img
              src={user.picture}
              alt={user.fullName}
              style={{
                width: "140px",
                height: "140px",
                objectFit: "cover",
                borderRadius: "8px",
                backgroundColor: "#eee",
                display: user.picture ? "block" : "none"
              }}
            />
            {!user.picture && (
              <div
                style={{
                  width: "140px",
                  height: "140px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#ccc",
                  color: "#fff",
                  borderRadius: "8px",
                  textAlign: "center",
                  fontSize: "14px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}
              >
                {user.nickname}
              </div>
            )}
          </div>

          <div>
            <p><b>ID:</b> {user.userId}</p>
            <p><b>성명:</b> {user.fullName}</p>
            <p><b>닉네임:</b> {user.nickname}</p>
            <p><b>이메일:</b> {user.email}</p>
            <p><b>주소:</b> {user.address}</p>
            <p><b>전화번호:</b> {user.phoneNumber}</p>
          </div>
        </div>

        {/* 탭 메뉴 */}
        <div style={{ display: "flex", borderBottom: "1px solid #ddd" }}>
          {["crews", "gatherings", "posts"].map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                textAlign: "center",
                padding: "10px 0",
                cursor: "pointer",
                fontWeight: activeTab === tab ? "bold" : "normal",
                borderBottom: activeTab === tab ? "2px solid #007bff" : "none",
              }}
            >
              {tab === "crews" && "가입된 크루"}
              {tab === "gatherings" && "참여한 일정"}
              {tab === "posts" && "작성한 글"}
            </div>
          ))}
        </div>

        {/* 탭 컨텐츠 */}
        <div style={{ padding: "20px", overflowY: "auto", flex: 1 }}>
          {activeTab === "crews" && (
            myCrews.length > 0 ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {myCrews.map((crew) => (
                  <div
                    key={crew?.crewId}
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "10px",
                      minWidth: "180px",
                      maxWidth: "220px",
                      background: "#f9f9f9",
                      flex: "1 1 auto",
                    }}
                  >
                    <p><b>크루 이름:</b> {crew?.crewName}</p>
                    <p><b>권한:</b> {crew?.roleName}</p>
                  </div>
                ))}
              </div>
            ) : <p>가입된 크루가 없습니다.</p>
          )}

          {activeTab === "gatherings" && (
            myGatherings.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {myGatherings.map((event, idx) => (
                  <div
                    key={idx}
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "10px",
                      background: "#f5f5f5"
                    }}
                  >
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
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {userPosts.map((post) => (
                  <div
                    key={post.postId}
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "10px",
                      background: "#fefefe",
                    }}
                  >
                    <p><b>제목:</b> {post.title}</p>
                    <p><b>작성일:</b> {post.createdAt}</p>
                  </div>
                ))}
              </div>
            ) : <p>작성한 글이 없습니다.</p>
          )}
        </div>

        <div style={{ padding: "10px 20px", borderTop: "1px solid #ddd", textAlign: "right" }}>
          <button
            onClick={onClose}
            style={{
              padding: "10px 20px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#007bff",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDetailModal;
