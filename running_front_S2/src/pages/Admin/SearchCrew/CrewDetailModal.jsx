import React, { useState } from "react";
import { useGetGatheringsQuery } from "../../../queries/useGetGatheringsQuery";

function CrewDetailModal({ crew, onClose }) {
  if (!crew) return null;

  const gatheringsQuery = useGetGatheringsQuery(crew?.crewId);
  const gatherings = gatheringsQuery?.data?.data?.body;
  const [activeTab, setActiveTab] = useState("info");
  console.log(gatherings);
  
  

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
        {/* 상단: 크루 썸네일 + 기본 정보 */}
        <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
          <div style={{ flexShrink: 0 }}>
            <img
              src={crew.thumbnailPicture}
              alt={crew.crewName}
              style={{
                width: "180px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "8px",
                backgroundColor: "#eee",
              }}
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <p><b>크루 ID:</b> {crew.crewId}</p>
            <p><b>크루 이름:</b> {crew.crewName}</p>
            <p><b>제목:</b> {crew.title}</p>
            <p><b>군구:</b> {crew.gunguName}</p>
            <p><b>창설자:</b> {crew.fullName} (userId: {crew.userId})</p>
            <p><b>정원:</b> {crew.limitedPeople} 명</p>
            <p><b>총 거리:</b> {crew.totalKm} km</p>
            <p><b>생성일:</b> {new Date(crew.createdAt).toLocaleString()}</p>
          </div>
        </div>

        {/* 탭 메뉴 */}
        <div style={{ display: "flex", borderBottom: "1px solid #ddd" }}>
          {["gatherings", "freeBoard", "notice", "inquiery"].map((tab) => (
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
              {tab === "gatherings" && "정모"}
              {tab === "freeBoard" && "자유게시판"}
              {tab === "notice" && "공지사항"}
              {tab === "inquiery" && "문의사항"}
            </div>
          ))}
        </div>

        {/* 탭 컨텐츠 */}
        <div style={{ padding: "20px", overflowY: "auto", flex: 1 }}>
          {activeTab === "gatherings" && (
            gatherings.length > 0 ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {
                  gatherings.map((gathering) => (
                    <div
                      key={gathering?.gatheringId}
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
                      <p>정모 이름 : {gathering?.title}</p>
                      <p>내용 : {gathering?.content}</p>
                      <p>모집일 / 시 : {gathering?.runningDate} / {gathering?.runningTime}</p>
                      <p>위치 : {gathering?.placeName}</p>
                      <p>주소 : {gathering?.address}</p>
                      <p>회비 : {gathering?.cost}</p>
                      <p>거리 : {gathering?.km}</p>
                      <p>등록자 : {gathering?.user?.fullName}</p>
                    </div>
                  ))}
              </div>
            ) : <p>등록된 정모가 없습니다.</p>
          )}

          {activeTab === "freeBoard" && (
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                background: "#fafafa",
              }}
            />
          )}

          {activeTab === "notice" && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={crew.profilePicture}
                alt={crew.crewName}
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  backgroundColor: "#eee",
                }}
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </div>
          )}

          {activeTab === "inquiery" && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={crew.profilePicture}
                alt={crew.crewName}
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  backgroundColor: "#eee",
                }}
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </div>
          )}
        </div>

        {/* 닫기 버튼 */}
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

export default CrewDetailModal;
