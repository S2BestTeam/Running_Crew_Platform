import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import MainContainer from "../../../../components/MainContainer/MainContainer";
import usePrincipalQuery from "../../../../queries/usePrincipalQuery";
import useCrewDetailQuery from "../../../../queries/useCrewDetailQuery";
import useMembersQuery from "../../../../queries/useMembersQuery";
import MemberModal from "./MemberModal/MemberModal";
import ReportModal from "./MemberModal/ReportModal/ReportModal";
import useUserDetailQuery from "../../../../queries/useUserDetailQuery";

function CrewMember() {
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
    <div css={s.layout}>
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
  );
}

export default CrewMember;
