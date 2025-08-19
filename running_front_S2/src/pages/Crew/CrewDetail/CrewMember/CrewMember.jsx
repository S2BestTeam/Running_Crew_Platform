import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { css } from "@emotion/react";
import MainContainer from "../../../../components/MainContainer/MainContainer";
import usePrincipalQuery from "../../../../queries/usePrincipalQuery";
import useCrewDetailQuery from "../../../../queries/useCrewDetailQuery";
import useMembersQuery from "../../../../queries/useMembersQuery";
import MemberModal from "./MemberModal/MemberModal";
import useUserDetailQuery from "../../../../queries/useUserDetailQuery";
import ReportModal from "../Report/ReportModal/ReportModal";
import CrewReport from "../Report/CrewReport";

function CrewMember() {
  const { crewId } = useParams();
  const principal = usePrincipalQuery();
  const userId = principal?.data?.data?.body?.user?.userId;
  const { data: crewData, isLoading } = useCrewDetailQuery(crewId);
  const { data: myDetail } = useUserDetailQuery({ crewId, userId, enabled: !!crewId && !!userId });
  const isLeader = myDetail?.roleId === 2;

  const [searchParams, setSearchParams] = useSearchParams();
  const searchText = searchParams.get("searchText") || "";
  const [searchInput, setSearchInput] = useState(searchText);

  const membersQuery = useMembersQuery({ crewId, searchText: searchInput, size: 10 });

  const [members, setMembers] = useState([]);

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [reportUserId, setReportUserId] = useState(null);

  useEffect(() => {
    const pages = membersQuery?.data?.pages || [];
    const merged = pages.flatMap((p) => p?.data?.body?.contents || []);
    setMembers(merged);
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
    crewId: Number(crewId), crewProfileImg: "", crewName: "", userId: 0,
    title: "", content: "", limitedPeople: 0, crewTotalKm: 0,
  };

  const handlePickUser = (id) => {
    if (id == null) return;
    setSelectedUserId(Number(id));
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
              <div key={m.crewMemberId} css={s.memberItem} onClick={() => setSelectedUserId(m.userId)}>
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
            <div ref={loadMoreRef} style={{ height: 8 }} />
          </div>

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
    </div>
  );
}

export default CrewMember;
