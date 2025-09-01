import { useMemo, useState } from "react";
import { useGetGatheringsQuery } from "../../../queries/useGetGatheringsQuery";
import useMembersQuery from "../../../queries/useMembersQuery";
import { Settings } from "lucide-react"

function CrewDetailModal({ crew, onClose }) {
  if (!crew) return null;

  const gatheringsQuery = useGetGatheringsQuery(crew?.crewId);
  const gatherings = gatheringsQuery?.data?.data?.body;
  const [activeTab, setActiveTab] = useState("info");
  
  const membersQuery = useMembersQuery({ 
    crewId: crew?.crewId, 
    searchText: "", 
    size: 50
  });

  const members = useMemo(() => {
    const pages = membersQuery?.data?.pages || [];
    return pages.flatMap((p) => p?.data?.body?.contents || []);
  }, [membersQuery.data]);

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
          {["members", "gatherings", "freeBoard", "notice", "inquiery"].map((tab) => (
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
              {tab === "members" && "멤버"}
              {tab === "gatherings" && "정모"}
              {tab === "freeBoard" && "자유게시판"}
              {tab === "notice" && "공지사항"}
              {tab === "inquiery" && "문의사항"}
            </div>
          ))}
        </div>

        {/* 탭 컨텐츠 */}
        <div style={{ padding: "20px", overflowY: "auto", flex: 1 }}>
          {activeTab === "members" && (
            membersQuery.isLoading ? (
              <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
                멤버 목록을 불러오는 중...
              </div>
            ) : members.length > 0 ? (
              <div>
                {members.map((member, index) => {
                  const formatDate = (dateString) => {
                    if (!dateString) return "";
                    try {
                      const date = new Date(dateString);
                      return isNaN(date.getTime()) ? "" : date.toLocaleDateString("ko-KR");
                    } catch {
                      return "";
                    }
                  };

                  return (
                    <div
                      key={member.memberId}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "12px 0",
                        borderBottom: index < members.length - 1 ? "1px solid #f0f0f0" : "none",
                        gap: "12px",
                      }}
                    >
                      <div>
                        <img
                          src={member.user?.picture || "/default-avatar.png"}
                          alt={member.user?.nickname}
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            backgroundColor: "#f5f5f5",
                          }}
                        />
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <div style={{ 
                          fontWeight: "500", 
                          fontSize: "14px", 
                          color: "#333",
                          marginBottom: "2px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px"
                        }}>
                          {member.user?.nickname}
                          {member.roleId === 1 && (
                            <span style={{ fontSize: "16px" }}>👑</span>
                          )}
                          {member.roleId === 2 && (
                            <span style={{ fontSize: "16px" }}>⭐</span>
                          )}
                        </div>
                        <div style={{ 
                          fontSize: "12px", 
                          color: "#666"
                        }}>
                          {member.user?.fullName}
                        </div>
                        <div>
                          <Settings />
                        </div>
                      </div>
                      
                      {formatDate(member.createdAt) && (
                        <div style={{ 
                          fontSize: "11px", 
                          color: "#999",
                          textAlign: "right"
                        }}>
                          {formatDate(member.createdAt)}
                        </div>
                      )}
                    </div>
                  );
                })}
                
                {membersQuery.hasNextPage && (
                  <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <button
                      onClick={() => membersQuery.fetchNextPage()}
                      disabled={membersQuery.isFetchingNextPage}
                      style={{
                        padding: "8px 16px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        backgroundColor: "#fff",
                        color: "#666",
                        cursor: "pointer",
                        fontSize: "13px",
                      }}
                    >
                      {membersQuery.isFetchingNextPage ? "로딩 중..." : "더 보기"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "40px", color: "#999" }}>
                멤버가 없습니다.
              </div>
            )
          )}

          {activeTab === "gatherings" && (
            gatherings?.length > 0 ? (
              <div>
                {gatherings.map((gathering, index) => (
                  <div
                    key={gathering?.gatheringId}
                    style={{
                      padding: "15px 0",
                      borderBottom: index < gatherings.length - 1 ? "1px solid #f0f0f0" : "none",
                    }}
                  >
                    <div style={{ fontWeight: "500", fontSize: "15px", color: "#333", marginBottom: "8px" }}>
                      {gathering?.title}
                    </div>
                    <div style={{ fontSize: "13px", color: "#666", lineHeight: "1.4" }}>
                      <div style={{ marginBottom: "4px" }}>{gathering?.content}</div>
                      <div style={{ marginBottom: "4px" }}>
                        📅 {gathering?.runningDate} {gathering?.runningTime}
                      </div>
                      <div style={{ marginBottom: "4px" }}>
                        📍 {gathering?.placeName} ({gathering?.address})
                      </div>
                      <div style={{ display: "flex", gap: "15px", marginTop: "6px" }}>
                        <span>💰 {gathering?.cost}</span>
                        <span>🏃 {gathering?.km}km</span>
                        <span>👤 {gathering?.user?.fullName}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "40px", color: "#999" }}>
                등록된 정모가 없습니다.
              </div>
            )
          )}

          {activeTab === "freeBoard" && (
            <div style={{ textAlign: "center", padding: "40px", color: "#999" }}>
              자유게시판 내용이 없습니다.
            </div>
          )}

          {activeTab === "notice" && (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <img
                src={crew.profilePicture}
                alt={crew.crewName}
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  backgroundColor: "#f5f5f5",
                }}
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </div>
          )}

          {activeTab === "inquiery" && (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <img
                src={crew.profilePicture}
                alt={crew.crewName}
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  backgroundColor: "#f5f5f5",
                }}
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </div>
          )}
        </div>

        <div style={{ padding: "15px 20px", borderTop: "1px solid #eee", textAlign: "right" }}>
          <button
            onClick={onClose}
            style={{
              padding: "8px 20px",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#007bff",
              color: "#fff",
              cursor: "pointer",
              fontSize: "14px"
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