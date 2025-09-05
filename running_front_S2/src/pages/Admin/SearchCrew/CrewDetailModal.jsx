/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { BiSolidChevronLeftSquare, BiSolidChevronRightSquare } from "react-icons/bi";
import { Settings } from "lucide-react";

import { useGetGatheringsQuery } from "../../../queries/useGetGatheringsQuery";
import useMembersQuery from "../../../queries/useMembersQuery";
import useGetCrewFreeBoardQuery from "../../../queries/useGetCrewFreeBoardQuery";
import useGetCrewNoticeQuery from "../../../queries/useGetCrewNoticeQuery";

import { reqExpelMember, reqUpdateMemberRole } from "../../../api/Crew/memberApi";
import Pagination from "../../../components/Pagination/Pagination";
import MessageSendModal from "./MessageModal/MessageSendModal";

function CrewDetailModal({ crew, onClose }) {
  if (!crew) return null;
  const navigate = useNavigate();
  const crewId = Number(crew?.crewId);

  const [activeTab, setActiveTab] = useState("members");
  const [openMemberMenu, setOpenMemberMenu] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchText = searchParams.get("searchText") || "";
  const [searchInput, setSearchInput] = useState(searchText);
  const size = 10;
  const [msgOpen, setMsgOpen] = useState(false);
  const membersQuery = useMembersQuery({ crewId, searchText: "", size: 50, enabled: activeTab === "members" });
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
      membersQuery.refetch?.();
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
      membersQuery.refetch?.();
    } catch (e) {
      alert(e?.response?.data?.message ?? "추방 실패");
    }
  };

  const gatheringsQuery = useGetGatheringsQuery(crewId, { enabled: activeTab === "gatherings" });
  const gatherings = gatheringsQuery?.data?.data?.body || [];

  const {
    data: freeData,
    isLoading: freeLoading,
    isError: freeError,
  } = useGetCrewFreeBoardQuery({ crewId, page, size, searchText, enabled: activeTab === "freeBoard" });

  const freeBody = freeData?.data?.body;
  const freeTotalPages = freeBody?.totalPages ?? 1;
  const freeTotalElements = freeBody?.totalElements ?? 0;
  const freeLists = useMemo(() => freeBody?.contents ?? [], [freeBody]);
  const freeStart = (page - 1) * size;

  const handleSearchOnClick = () => {
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("page", "1");
      p.set("searchText", searchInput);
      return p;
    });
  };

  const {
    data: noticeData,
    isLoading: noticeLoading,
    isError: noticeError,
  } = useGetCrewNoticeQuery({ crewId, page, size, searchText, enabled: activeTab === "notice" });

  const noticeBody = noticeData?.data?.body;
  const noticeTotalPages = noticeBody?.totalPages ?? 1;
  const noticeTotalElements = noticeBody?.totalElements ?? 0;
  const noticeList = useMemo(() => noticeBody?.contents ?? [], [noticeBody]);
  const noticeStart = (page - 1) * size;


  const goPage = (next) => {
    const maxPages = activeTab === "freeBoard" ? freeTotalPages : noticeTotalPages;
    const nextPage = Math.min(Math.max(1, next), maxPages);
    setSearchParams({ page: String(nextPage), searchText });
  };

  const handlePostOnClick = (freeId) => {
    if (!freeId) return;
    navigate(`/crews/${crewId}/freeBoards/${freeId}`);
  };

  return (
    <>
      <div css={s.overlay}>
        <div css={s.modal}>
          <div css={s.header}>
            <div css={s.headerTop}>
              <img
                src={crew.thumbnailPicture}
                alt={crew.crewName}
                css={s.crewThumbnail}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
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
              <button onClick={() => setMsgOpen(true)}>메세지 보내기</button>
            </div>
          </div>

          <div css={s.tabs}>
            {[
              { key: "members", label: "멤버" },
              { key: "gatherings", label: "정모" },
              { key: "freeBoard", label: "자유게시판" },
              { key: "notice", label: "공지사항" },
            ].map((tab) => (
              <div key={tab.key} onClick={() => setActiveTab(tab.key)} css={s.tab(activeTab === tab.key)}>
                {tab.label}
              </div>
            ))}
          </div>

          <div css={s.content}>
            {/* 멤버 */}
            {activeTab === "members" &&
              (membersQuery.isLoading ? (
                <div css={s.emptyState}>멤버 목록을 불러오는 중...</div>
              ) : members.length > 0 ? (
                <div>
                  {members.map((member, index) => (
                    <div key={member.memberId} css={s.memberItem(index < members.length - 1)}>
                      <img src={member.user?.picture || "/default-avatar.png"} alt={member.user?.nickname} css={s.memberAvatar} />
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
                          <div css={s.menuItem} onClick={() => handleRoleChange(member.memberId, 2)}>
                            ⭐ 매니저로 변경
                          </div>
                          <div css={s.menuItem} onClick={() => handleRoleChange(member.memberId, 3)}>
                            👤 일반 멤버로 변경
                          </div>
                          {member.roleId === 2 && (
                            <div css={[s.menuItem, s.menuPrimary]} onClick={() => handleRoleChange(member.memberId, 1)}>
                              👑 크루장으로 승격
                            </div>
                          )}
                          <div css={[s.menuItem, s.menuDanger]} onClick={() => handleExpelMember(member.memberId)}>
                            ❌ 추방하기
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div css={s.emptyState}>멤버가 없습니다.</div>
              ))}

            {/* 정모 */}
            {activeTab === "gatherings" &&
              (gatherings?.length > 0 ? (
                <div>
                  {gatherings.map((g, index) => (
                    <div key={g?.gatheringId} css={s.gatheringItem(index < gatherings.length - 1)}>
                      <div css={s.gatheringTitle}>{g?.title}</div>
                      <div css={s.gatheringContent}>
                        <div>{g?.content}</div>
                        <div>
                          📅 {g?.runningDate} {g?.runningTime}
                        </div>
                        <div>
                          📍 {g?.placeName} ({g?.address})
                        </div>
                        <div css={s.gatheringMeta}>
                          <span>💰 {g?.cost}</span>
                          <span>🏃 {g?.km}km</span>
                          <span>👤 {g?.user?.fullName}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div css={s.emptyState}>등록된 정모가 없습니다.</div>
              ))}

            {activeTab === "freeBoard" && (
              <div css={s.container}>
                <h2>자유게시판</h2>
                <div css={s.searchBox}>
                  <div css={s.inputGroup}>
                    <input
                      type="text"
                      placeholder="검색어를 입력하세요."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      css={s.searchInput}
                    />
                    <button css={s.searchButton} onClick={handleSearchOnClick}>
                      <IoSearch />
                    </button>

                  </div>
                </div>

                {freeLoading ? (
                  <div>불러오는 중…</div>
                ) : freeError ? (
                  <div>문제가 발생했어요.</div>
                ) : (
                  <>
                    <table css={s.table}>
                      <thead>
                        <tr>
                          <th css={s.th}>번호</th>
                          <th css={s.th}>제목</th>
                          <th css={s.th}>작성자</th>
                          <th css={s.th}>등록일</th>
                        </tr>
                      </thead>
                      <tbody>
                        {freeLists.map((board, index) => (
                          <tr key={board.freeId} className={s.tr} onClick={() => handlePostOnClick(board.freeId)}>
                            <td css={s.td}>{freeTotalElements - (freeStart + index)}</td>
                            <td css={s.tdTitle}>{board.title}</td>
                            <td css={s.td}>{board?.user?.nickname}</td>
                            <td css={s.td}>{board.createdAt}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <Pagination
                      page={page}                // 1-base 현재 페이지
                      totalPages={freeTotalPages}    // 총 페이지 수
                      onChange={(p) => goPage(p)}// 페이지 변경 핸들러
                      windowSize={1}
                    />
                  </>
                )}
              </div>
            )}

            {activeTab === "notice" && (
              <div css={s.container}>
                <h2>공지사항</h2>

                <div css={s.searchBox}>
                  <div css={s.inputGroup}>
                    <input
                      type="text"
                      placeholder="검색어를 입력하세요."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      css={s.searchInput}
                    />
                    <button css={s.searchButton} onClick={handleSearchOnClick}>
                      <IoSearch />
                    </button>

                    {/* 관리자 전용: 항상 보임 */}
                    <button css={s.registerButton} onClick={() => navigate(`/crews/${crewId}/notice/register`)}>
                      공지글 등록
                    </button>
                  </div>
                </div>

                {noticeLoading ? (
                  <div>불러오는 중…</div>
                ) : noticeError ? (
                  <div>문제가 발생했어요.</div>
                ) : (
                  <>
                    <table css={s.table}>
                      <thead>
                        <tr>
                          <th css={s.th}>번호</th>
                          <th css={s.th}>제목</th>
                          <th css={s.th}>작성자</th>
                          <th css={s.th}>등록일</th>
                        </tr>
                      </thead>
                      <tbody>
                        {noticeList.map((notice, index) => (
                          <tr
                            key={notice.noticeId}
                            onClick={() => navigate(`/crews/${crewId}/notices/${notice.noticeId}`)}
                            className={s.tr}
                          >
                            <td css={s.td}>{noticeTotalElements - (noticeStart + index)}</td>
                            <td css={s.tdTitle}>{notice.title}</td>
                            <td css={s.td}>{notice?.user?.nickname}</td>
                            <td css={s.td}>{notice.createdAt}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <Pagination
                      page={page}                // 1-base 현재 페이지
                      totalPages={noticeTotalPages}    // 총 페이지 수
                      onChange={(p) => goPage(p)}// 페이지 변경 핸들러
                      windowSize={1}
                    />
                  </>
                )}
              </div>
            )}
          </div>

          <div css={s.footer}>
            <button css={s.closeBtn} onClick={onClose}>
              닫기
            </button>
          </div>
        </div>
      </div>
      <MessageSendModal
        open={msgOpen}
        onClose={() => setMsgOpen(false)}
        crewId={crewId /* 또는 crew.crewId */}
      />
    </>
  );
}

export default CrewDetailModal;