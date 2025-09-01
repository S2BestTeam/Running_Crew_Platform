/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { useMemo, useState } from "react";
import { useGetGatheringsQuery } from "../../../queries/useGetGatheringsQuery";
import useMembersQuery from "../../../queries/useMembersQuery";
import { Settings } from "lucide-react";
import { reqExpelMember, reqUpdateMemberRole } from "../../../api/Crew/memberApi";

function CrewDetailModal({ crew, onClose}) {
  if (!crew) return null;
  const crewId = crew?.crewId;

  const gatheringsQuery = useGetGatheringsQuery(crewId);
  const gatherings = gatheringsQuery?.data?.data?.body;
  const [activeTab, setActiveTab] = useState("info");
  const [openMemberMenu, setOpenMemberMenu] = useState(null);
  
  const membersQuery = useMembersQuery({ 
    crewId: crewId, 
    searchText: "", 
    size: 50
  });

  const members = useMemo(() => {
    const pages = membersQuery?.data?.pages || [];
    return pages.flatMap((p) => p?.data?.body?.contents || []);
  }, [membersQuery.data]);

  const handleMemberMenuToggle = (memberId) => {
    setOpenMemberMenu(openMemberMenu === memberId ? null : memberId);
  };

  const handleRoleChange = async (memberId, roleId) => {
    try {
      await reqUpdateMemberRole({ memberId, roleId });
      alert(`권한이 변경되었습니다. (roleId: ${roleId})`);
      setOpenMemberMenu(null);
      membersQuery.refetch();
    } catch (e) {
      alert(e?.response?.data?.message ?? "권한 변경 실패");
    }
  };

  const handleExpelMember = async (memberId) => {
    if (!confirm("정말 추방하시겠습니까?")) return;
    try {
      await reqExpelMember({ memberId });
      alert("멤버가 추방되었습니다.");
      setOpenMemberMenu(null);
      membersQuery.refetch();
    } catch (e) {
      alert(e?.response?.data?.message ?? "추방 실패");
    }
  };

  return (
    <div css={s.overlay}>
      <div css={s.modal}>
        <div css={s.header}>
          <div css={s.headerTop}>
            <img
              src={crew.thumbnailPicture}
              alt={crew.crewName}
              css={s.crewThumbnail}
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <div css={s.crewTitleBox}>
              <h3>{crew.crewName}</h3>
              <p>{crew.title}</p>
            </div>
          </div>
          
          <div css={s.crewMeta}>
            <span>창설자: {crew.fullName}</span>
            <span>정원: {crew.limitedPeople}명</span>
            <span>총거리: {crew.totalKm}km</span>
            <span>지역: {crew.gunguName}</span>
          </div>
        </div>

        <div css={s.tabs}>
          {["members", "gatherings", "freeBoard", "notice"].map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              css={s.tab(activeTab === tab)}
            >
              {tab === "members" && "멤버"}
              {tab === "gatherings" && "정모"}
              {tab === "freeBoard" && "자유게시판"}
              {tab === "notice" && "공지사항"}
            </div>
          ))}
        </div>

        <div css={s.content}>
          {activeTab === "members" && (
            membersQuery.isLoading ? (
              <div css={s.emptyState}>멤버 목록을 불러오는 중...</div>
            ) : members.length > 0 ? (
              <div>
                {members.map((member, index) => (
                  <div key={member.memberId} css={s.memberItem(index < members.length - 1)}>
                    <img
                      src={member.user?.picture || "/default-avatar.png"}
                      alt={member.user?.nickname}
                      css={s.memberAvatar}
                    />
                    <div css={s.memberInfo}>
                      <div css={s.memberName}>
                        {member.user?.nickname}
                        {member.roleId === 1 && <span>👑</span>}
                        {member.roleId === 2 && <span>⭐</span>}
                      </div>
                      <div css={s.memberFullName}>{member.user?.fullName}</div>
                    </div>

                    <div css={s.memberActions}>
                      {member.createdAt && <div css={s.memberDate}>{new Date(member.createdAt).toLocaleDateString("ko-KR")}</div>}
                      <div css={s.settingsBtn} onClick={() => handleMemberMenuToggle(member.memberId)}>
                        <Settings />
                      </div>
                    </div>

                    {openMemberMenu === member.memberId && (
                      <div css={s.memberMenu}>
                        <div css={s.menuItem} onClick={() => handleRoleChange(member.memberId, 2)}>⭐ 매니저로 변경</div>
                        <div css={s.menuItem} onClick={() => handleRoleChange(member.memberId, 3)}>👤 일반 멤버로 변경</div>
                        {member.roleId === 2 && (
                          <div css={[s.menuItem, s.menuPrimary]} onClick={() => handleRoleChange(member.memberId, 1)}>👑 크루장으로 승격</div>
                        )}
                        <div css={[s.menuItem, s.menuDanger]} onClick={() => handleExpelMember(member.memberId)}>❌ 추방하기</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div css={s.emptyState}>멤버가 없습니다.</div>
            )
          )}
          {activeTab === "gatherings" && (
            gatherings?.length > 0 ? (
              <div>
                {gatherings.map((gathering, index) => (
                  <div key={gathering?.gatheringId} css={s.gatheringItem(index < gatherings.length - 1)}>
                    <div css={s.gatheringTitle}>{gathering?.title}</div>
                    <div css={s.gatheringContent}>
                      <div>{gathering?.content}</div>
                      <div>📅 {gathering?.runningDate} {gathering?.runningTime}</div>
                      <div>📍 {gathering?.placeName} ({gathering?.address})</div>
                      <div css={s.gatheringMeta}>
                        <span>💰 {gathering?.cost}</span>
                        <span>🏃 {gathering?.km}km</span>
                        <span>👤 {gathering?.user?.fullName}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div css={s.emptyState}>등록된 정모가 없습니다.</div>
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
        </div>

        <div css={s.footer}>
          <button css={s.closeBtn} onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
}


export default CrewDetailModal;
