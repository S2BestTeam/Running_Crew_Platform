import React, { useEffect, useRef, useState } from "react";
import MainContainer from "../../../components/MainContainer/MainContainer";
import { useNavigate, useParams } from "react-router-dom";
import { useCrewDetailQuery } from "../../../queries/useCrewDetailQuery";
import usePrincipalQuery from "../../../queries/usePrincipalQuery";
import useMembersQuery from "../../../queries/useMembersQuery";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import MemberModal from "./MemberModal/MemberModal";
import useUserDetailQuery from "../../../queries/useUserDetailQuery";
import ReportModal from "./MemberModal/ReportModal/ReportModal";

function CrewMember() {
  const navigate = useNavigate();
  const { crewId } = useParams();
  const principal = usePrincipalQuery();
  const userId = principal?.data?.data?.body?.user?.userId;
  const { data: crewData, isLoading } = useCrewDetailQuery(crewId);
  const { data: myDetail } = useUserDetailQuery({
    crewId,
    userId,
    enabled: !!crewId && !!userId,
  });
  const isLeader = myDetail?.roleId === 2;

  const [searchInput, setSearchInput] = useState("");
  const membersQuery = useMembersQuery({ crewId, searchInput, size: 20 });

  const [members, setMembers] = useState([]);

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [reportUserId, setReportUserId] = useState(null);

  useEffect(() => {
    const pages = membersQuery?.data?.pages || [];
    const merged = pages.flatMap((p) => p?.data?.body?.contents || []);
    setMembers(merged);
  }, [membersQuery.data]);

  const loadMoreRef = useRef(null);

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && membersQuery.hasNextPage && !membersQuery.isFetchingNextPage) {
          membersQuery.fetchNextPage();
        }
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [membersQuery.hasNextPage, membersQuery.isFetchingNextPage, membersQuery.fetchNextPage]);

  const crew = crewData?.body || {
    crewId: Number(crewId),
    crewProfileImg: "",
    crewName: "",
    userId: 0,
    title: "",
    content: "",
    limitedPeople: 0,
    crewTotalKm: 0,
  };

  if (isLoading) {
    return (
      <MainContainer>
        <div>로딩중...</div>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <div css={s.layout}>
        <div css={s.leftBox}>
          <div>
            <div css={s.crewInfoBox}>
              <div css={s.crewImgBox}></div>
              <div css={s.crewNameBox} onClick={() => navigate(`/crews/${crewId}`)}>
                {crew.crewName}
              </div>
            </div>
            <div css={s.buttonContainer}>
              <button onClick={() => navigate(`/crews/${crewId}/members`)}>크루 멤버</button>
              <button>정모 일정</button>
              <button>가입 인사</button>
              <button>자유게시판</button>
              <button>사진첩</button>
              <button>공지사항</button>
              <button>문의사항</button>
              {crew.userId === userId && (
                <>
                  <button onClick={() => navigate(`/crews/${crew.crewId}/report`)}>신고사항</button>
                  <button onClick={() => navigate(`/crews/${crew.crewId}/setting`)}>설정</button>
                </>
              )}
            </div>
          </div>
          {crew.userId !== userId && (
            <div css={s.getout}>
              <button>탈퇴하기</button>
            </div>
          )}
        </div>

        <div>
          <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="닉네임/실명 검색" />
          <div>
            {members.map((m) => (
              <div key={m.crewMemberId} css={s.memberItem} onClick={() => setSelectedUserId(m.userId)}>
                {/* <img src={m.profileImg} alt="" css={s.profileImg} /> */}
                <div css={s.memberInfo}>
                  <div css={s.nickname}>
                    {m.nickname}
                    {m.roleId === 2 && <span css={s.roleIcon}>👑</span>}
                    {m.roleId === 3 && <span css={s.roleIcon}>⭐</span>}
                  </div>
                  <div css={s.fullName}>{m.fullName}</div>
                </div>
              </div>
            ))}
          </div>
          <div ref={loadMoreRef} style={{ height: 1 }} />
          {selectedUserId && (
            <MemberModal
              crewId={crewId}
              userId={selectedUserId}
              isOpen={!!selectedUserId}
              isLeader={isLeader}
              onChanged={() => membersQuery.refetch()}
              onClose={() => setSelectedUserId(null)}
              onReport={(userId) => {
                setSelectedUserId(null);
                setReportUserId(userId);
              }}
            />
          )}
          {reportUserId && (
            <ReportModal
              crewId={crewId}
              userId={reportUserId}
              nickname={members.find((m) => m.userId === reportUserId)?.nickname}
              isOpen={!!reportUserId}
              onClose={() => setReportUserId(null)}
            />
          )}
        </div>
      </div>
    </MainContainer>
  );
}

export default CrewMember;
