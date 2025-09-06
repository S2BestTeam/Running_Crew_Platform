/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { IoSearch } from "react-icons/io5";
import MainContainer from "../../../components/MainContainer/MainContainer";
import { useParams, useSearchParams } from "react-router-dom";
import usePrincipalQuery from "../../../queries/usePrincipalQuery";
import useCrewDetailQuery from "../../../queries/useCrewDetailQuery";
import useMembersQuery from "../../../queries/useMembersQuery";
import { useEffect, useMemo, useRef, useState } from "react";
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

  const members = useMemo(() => {
    const pages = membersQuery?.data?.pages || [];
    return pages.flatMap((p) => p?.data?.body?.contents || []);
  }, [membersQuery.data]);


  useEffect(() => {
    setLeader(crewData?.body?.userId === userId);
  }, [crewData?.body?.userId, userId]);

  const handleSearchOnClick = () => {
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("page", "1");
      p.set("searchText", searchInput);
      return p;
    });
    membersQuery.refetch();
  };
  const handleSearchOnChange = (e) => setSearchInput(e.target.value);
  const handleSearchOnKeyDown = (e) => {
    if (e.key === "Enter") handleSearchOnClick();
  };

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
      { root: rootEl, rootMargin: "200px", threshold: 0 }
    );

    io.observe(sentinel);
    return () => io.disconnect();
  }, [membersQuery.hasNextPage, membersQuery.isFetchingNextPage]);

  const handlePickUser = (id) => {
    if (id == null) return;
    setSelectedMemberId(Number(id));
  };

  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [reportMemberId, setReportMemberId] = useState(null);

  if (isLoading) {
    return (
      <MainContainer>
        <div>로딩중...</div>
      </MainContainer>
    );
  }

  return (
      <div css={s.layout}>
        <h2>크루 멤버</h2>
        <div css={s.asd}>
          <div css={s.searchBar}>
            <input type="text" placeholder="닉네임/실명 검색" value={searchInput} onChange={handleSearchOnChange} css={s.searchInput}
              onKeyDown={handleSearchOnKeyDown} />
            <button css={s.searchButton} onClick={handleSearchOnClick}>
              <IoSearch />
            </button>
          </div>
          <div ref={scrollBoxRef} css={s.scrollBox}>
            {members.map((m) => (
              <div key={m.memberId} css={s.memberItem} onClick={() => setSelectedMemberId(m.memberId)}>
                <div css={s.memberInfo}>

                  {m.user.picture && (
                    <img
                      src={m?.user?.picture}
                      alt={m.user.nickname}
                      css={s.profileImg}
                    />
                  )}

                  <div css={s.textBox}>
                    <div css={s.nickname}>
                      {m.user.nickname}
                      {m.roleId === 1 && <span css={s.roleIcon}>👑</span>}
                      {m.roleId === 2 && <span css={s.roleIcon}>⭐</span>}
                    </div>
                    <div css={s.fullName}>{m.user.fullName}</div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={loadMoreRef} style={{ height: 8 }} />
          </div>

        {members.some((member) => member.userId === userId) ? (
          <>
            {selectedMemberId && (
              <MemberModal
                memberId={selectedMemberId}
                isOpen={!!selectedMemberId}
                isLeader={isLeader}
                onChanged={() => membersQuery.refetch()}
                onClose={() => setSelectedMemberId(null)}
                onReport={(memberId) => {
                  setSelectedMemberId(null);
                  setReportMemberId(memberId);
                }}
              />
            )}
            {reportMemberId && (
              <ReportModal
                crewId={crewId}
                memberId={reportMemberId}
                nickname={members.find((m) => m.memberId === reportMemberId)?.nickname}
                isOpen={!!reportMemberId}
                onClose={() => setReportMemberId(null)}
              />
            )}
          </>
        ) : (
          <div style={{ pointerEvents: "none", opacity: 0.5 }}>
            멤버가 아니어서 접근할 수 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}

export default Member;
