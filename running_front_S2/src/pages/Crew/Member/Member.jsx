
/** @jsxImportSource @emotion/react */
import * as s from "./styles";


import MainContainer from "../../../components/MainContainer/MainContainer";
import { useParams, useSearchParams } from "react-router-dom";
import usePrincipalQuery from "../../../queries/usePrincipalQuery";
import useCrewDetailQuery from "../../../queries/useCrewDetailQuery";
import useMembersQuery from "../../../queries/useMembersQuery";
import { useEffect, useRef, useState } from "react";
import MemberModal from "./MemberModal/MemberModal";
import ReportModal from "../Report/ReportModal/ReportModal";

function Member() {
  const { crewId } = useParams();
  const principal = usePrincipalQuery();
  const userId = principal?.data?.data?.body?.user?.userId;
  const { data: crewData, isLoading } = useCrewDetailQuery(crewId);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchText = searchParams.get("searchText") || "";
  const [searchInput, setSearchInput] = useState(searchText);

  const [isLeader, setLeader] = useState(false);
  const membersQuery = useMembersQuery({ crewId, searchText: searchInput, size: 10 });

  const [members, setMembers] = useState([]);

  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [reportUserId, setReportUserId] = useState(null);

  useEffect(() => {
    const pages = membersQuery?.data?.pages || [];
    const merged = pages.flatMap((p) => p?.data?.body?.contents || []);
    setMembers(merged);
    setLeader(crewData?.body.userId === userId);
    console.log(crewData)
    console.log(crewData === userId)
  }, [membersQuery.data]);

  const handleSearchOnChange = (e) => setSearchInput(e.target.value);
  const handleSearchOnClick = () => {
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("page", "1");
      p.set("searchText", searchInput);
      return p;
    });
  };
  const handleSearchOnKeyDown = (e) => { if (e.key === "Enter") handleSearchOnClick(); };

  const scrollBoxRef = useRef(null);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const rootEl = scrollBoxRef.current;
    const sentinel = loadMoreRef.current;
    if (!rootEl || !sentinel) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && membersQuery.hasNextPage && !membersQuery.isFetchingNextPage) {
          membersQuery.fetchNextPage();
        }
      },
      {
        root: rootEl,
        rootMargin: "200px",
        threshold: 0,
      }
    );

    io.observe(sentinel);
    return () => io.disconnect();
  }, [membersQuery.hasNextPage, membersQuery.isFetchingNextPage]);

  const crew = crewData?.body || {
    crewId: Number(crewId), profilePicture: "", crewName: "", userId: 0,
    title: "", content: "", limitedPeople: 0, crewTotalKm: 0,
  };

  const handlePickUser = (id) => {
    if (id == null) return;
    setSelectedMemberId(Number(id));
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
      <div css={s.rightPane}>

        <div css={s.searchBar}>
          <input value={searchInput} onChange={handleSearchOnChange} onKeyDown={handleSearchOnKeyDown} placeholder="닉네임/실명 검색" />
          <button onClick={handleSearchOnClick}>검색</button>
          <div ref={scrollBoxRef} css={s.scrollBox}>
            {members.map((m) => (
              <div key={m.memberId} css={s.memberItem} onClick={() => setSelectedMemberId(m.memberId)}>
                <div css={s.memberInfo}>
                  <div css={s.nickname}>
                    {m.user.nickname}
                    {m.roleId === 1 && <span css={s.roleIcon}>👑</span>}
                    {m.roleId === 2 && <span css={s.roleIcon}>⭐</span>}
                  </div>
                  <div css={s.fullName}>{m.user.fullName}</div>
                </div>
              </div>
            ))}
            <div ref={loadMoreRef} style={{ height: 8 }} />
          </div>

          {selectedMemberId && (
            <MemberModal
              memberId={selectedMemberId}
              isOpen={!!selectedMemberId}
              isLeader={isLeader}
              onChanged={() => membersQuery.refetch()}
              onClose={() => setSelectedMemberId(null)}
              onReport={(userId) => {
                setSelectedMemberId(null);
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
    </div>
  );
}

export default Member;
