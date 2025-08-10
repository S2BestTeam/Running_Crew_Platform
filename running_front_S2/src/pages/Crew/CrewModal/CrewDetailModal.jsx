import React, { useMemo, useState } from "react";
import ReactModal from "react-modal";
/** @jsxImportSource @emotion/react */
import * as s from "../CrewList/styles";
import { baseURL } from "../../api/axios";
import { useGetCrewRunningBoardsQuery } from "../../queries/useGetCrewRunningBoardsQuery";
import { useGetCrewMembersQuery } from "../../queries/useGetCrewMembersQuery";

function CrewDetailModal({ crew, isOpen, onClose }) {
  const crewId = crew?.crew_id;

  const [tab, setTab] = useState("RUN"); // RUN | MEM
  const [status, setStatus] = useState("모집중"); // '모집중' | '마감'
  const page = 0;
  const size = 10;

  const boardsQuery = useGetCrewRunningBoardsQuery(crewId, {
    status,
    page,
    size,
    enabled: isOpen && tab === "RUN",
  });

  const membersQuery = useGetCrewMembersQuery(crewId, isOpen && tab === "MEM");

  const boards = useMemo(
    () => boardsQuery.data?.body ?? [],
    [boardsQuery.data]
  );
  const members = useMemo(
    () => membersQuery.data?.body ?? [],
    [membersQuery.data]
  );

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "#000000aa",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        },
        content: {
          position: "static",
          inset: "unset",
          padding: 0,
          border: "none",
          borderRadius: "12px",
          overflow: "hidden",
        },
      }}
    >
      {crew && (
        <div css={s.modalLayout}>
          <div css={s.modalContainerLeft}>
            {crew.crew_img_path ? (
              <img
                src={`${baseURL}/image${crew.crew_img_path}`}
                alt={crew.crew_name}
              />
            ) : (
              <div css={s.imagePlaceholder}>No Image</div>
            )}
          </div>

          <div css={s.modalContainerRight}>
            <header css={s.header}>
              <div css={s.headerTitle}>
                <h3>{crew.crew_name}</h3>
                <p>{crew.crew_description}</p>
              </div>
              <button css={s.closeBtn} onClick={onClose} aria-label="닫기">
                X
              </button>
            </header>

            <div css={s.tabs}>
              <button
                css={s.tabButton(tab === "RUN")}
                onClick={() => setTab("RUN")}
              >
                러닝모집
              </button>
              <button
                css={s.tabButton(tab === "MEM")}
                onClick={() => setTab("MEM")}
              >
                크루멤버
              </button>
            </div>

            <main css={s.main}>
              {tab === "RUN" && (
                <section>
                  <div css={s.filterRow}>
                    <label>
                      상태
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="모집중">모집중</option>
                        <option value="마감">마감</option>
                      </select>
                    </label>
                  </div>

                  {boardsQuery.isLoading && (
                    <div css={s.stateText}>불러오는 중...</div>
                  )}
                  {boardsQuery.isError && (
                    <div css={s.stateText}>목록을 불러오지 못했습니다.</div>
                  )}
                  {!boardsQuery.isLoading && boards.length === 0 && (
                    <div css={s.emptyBox}>등록된 정기모집이 없습니다.</div>
                  )}

                  <ul css={s.boardList}>
                    {boards.map((b) => (
                      <li key={b.board_id} css={s.boardItem}>
                        <div css={s.boardHeader}>
                          <span css={s.badge(b.status)}>{b.status}</span>
                          <h4>{b.title}</h4>
                        </div>
                        <p css={s.boardMeta}>
                          인원: <b>{b.max_participants}명</b>
                        </p>
                        {b.content && <p css={s.boardContent}>{b.content}</p>}
                        {b.latitude && b.longitude && (
                          <p css={s.boardMeta}>
                            위치: {b.latitude}, {b.longitude}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {tab === "MEM" && (
                <section>
                  {membersQuery.isLoading && (
                    <div css={s.stateText}>멤버 불러오는 중...</div>
                  )}
                  {membersQuery.isError && (
                    <div css={s.stateText}>
                      멤버 정보를 불러오지 못했습니다.
                    </div>
                  )}
                  {!membersQuery.isLoading && members.length === 0 && (
                    <div css={s.emptyBox}>아직 멤버가 없습니다.</div>
                  )}

                  <div css={s.memberGrid}>
                    {members.map((m) => (
                      <div key={m.user_id} css={s.memberCard}>
                        <div css={s.memberAvatar}>
                          {m.profile_img_path ? (
                            <img
                              src={`${baseURL}/image${m.profile_img_path}`}
                              alt={m.username}
                            />
                          ) : (
                            <span>{m.username?.[0] ?? "?"}</span>
                          )}
                        </div>
                        <p css={s.memberName}>{m.username}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </main>
          </div>
        </div>
      )}
    </ReactModal>
  );
}

export default CrewDetailModal;
