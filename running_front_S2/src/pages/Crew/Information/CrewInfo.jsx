/** @jsxImportSource @emotion/react */
import { useEffect, useMemo, useState } from 'react';
import * as s from './styles';
import { useCrewStore } from '../../../stores/useCrewStroes';
import WelcomeRegModal from '../Welcome/WelcomeRegModal/WelcomeRegModal';
import { reqGetMemberCount, reqGetMembers, } from '../../../api/Crew/memberApi';
import usePrincipalQuery from '../../../queries/usePrincipalQuery';
import ContentLayout from '../../../components/ContentLayout/ContentLayout';
import useGetCrewRoleQuery from '../../../queries/useGetCrewRoleQuery';
import { MdMoreHoriz } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useGetGatheringsQuery } from '../../../queries/useGetGatheringsQuery';

function CrewInfo() {
  const principal = usePrincipalQuery();
  const navigate = useNavigate();
  const userId = principal?.data?.data?.body?.user?.userId;
  const { crew, crewId } = useCrewStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [countMember, setCountMember] = useState(1);
  const [isPending, setIsPending] = useState(false);
  const CrewRoleQuery = useGetCrewRoleQuery(userId);

  const crewRole = CrewRoleQuery?.data?.some((role) => role.crewId === Number(crewId));

  const isCrewMember = !!crewRole;
  const [members, setMembers] = useState([]);
  const displayMembers = (members ?? []).slice(0, 6);
  const [gatherings, setGatherings] = useState([]);
  const { data } = useGetGatheringsQuery(crewId);
  console.log(data)

  useEffect(() => {
    if (!crewId) return; (
      async () => {
        try {
          const res = await reqGetMembers(crewId);
          // console.log("멤버 응답:", res.data);
          setMembers(res.data.body ?? []);
        }
        catch (e) {
          console.error("멤버 불러오기 실패:", e);
          alert("멤버 정보를 불러오는 중 오류가 발생했습니다.");
        }
      })();
  }, [crewId]);

  useEffect(() => {
    const body = data?.data?.body;
    if (body) setGatherings(body);
  }, [data]);
  console.log(gatherings)

  useEffect(() => {
    if (!crewId || !userId) return;
    reqGetMemberCount(crewId)
      .then((res) => {
        setCountMember(res.data.body);
      });
  }, [userId, countMember]);

  const getKey = (dateStr, timeStr) =>
    dateStr ? `${dateStr.replaceAll("-", "")}${(timeStr || "00:00").replace(":", "")}` : null;

  const nowKey = (() => {
    const n = new Date();
    const y = n.getFullYear();
    const m = String(n.getMonth() + 1).padStart(2, "0");
    const d = String(n.getDate()).padStart(2, "0");
    const hh = String(n.getHours()).padStart(2, "0");
    const mm = String(n.getMinutes()).padStart(2, "0");
    return `${y}${m}${d}${hh}${mm}`;
  })();

  const formatDateTime = (dateStr, timeStr) => {
    if (!dateStr && !timeStr) return "-";
    const d = new Date(dateStr);
    const yoils = ["일", "월", "화", "수", "목", "금", "토"];
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const w = yoils[d.getDay()];
    return `${y}.${m}.${day} (${w}) ${timeStr || ""}`;
  };

  const displayGatherings = useMemo(() => {
    const list = (gatherings ?? []).filter(g => {
      const k = getKey(g.runningDate, g.runningTime);
      return k && k >= nowKey;
    });
    list.sort((a, b) => getKey(a.runningDate, a.runningTime).localeCompare(getKey(b.runningDate, b.runningTime)));
    return list.slice(0, 3);
  }, [gatherings]);
  // console.log(displayGatherings)

  return (
    <ContentLayout>
      <div css={s.mainBox}>
        <div css={s.titleBox}>
          <div css={s.banner}>
            <div>
              <img src={crew?.thumbnailPicture} alt="" />
            </div>
          </div>
          <div css={s.crewInfoSection}>
            <div css={s.profilePicture}>
              <img src={crew?.profilePicture} alt="크루 프로필" />
            </div>

            <div css={s.crewTextBox}>
              <h2>{crew?.crewName}</h2>
              <div css={s.crewText}>
                <p css={s.gungu}>{crew?.gunguName}</p>
                <p>멤버수 {countMember} / {crew?.limitedPeople}</p>
                <p>•</p>
                <p>총 {crew?.totalKm} KM</p>
              </div>
            </div>
            {!isCrewMember && (
              <button
                css={s.Button}
                onClick={() => setIsOpen(true)}
                disabled={isPending || countMember >= crew?.limitedPeople}
              >
                {countMember >= crew?.limitedPeople ? "정원마감" : isPending ? "처리중" : "크루가입"}
              </button>
            )}
            {isOpen && (
              <WelcomeRegModal
                setIsOpen={setIsOpen}
                crewId={crewId}
                onSuccess={() => setIsPending(true)}
              />
            )}
          </div>
        </div>

        <div css={s.mainLine}>
          <div>
            <p css={s.fontBold}>한줄 소개</p>
            <div>{crew?.title}</div>
            <p css={s.fontBold}>크루 소개</p>
            <div dangerouslySetInnerHTML={{ __html: crew?.content }} />
          </div>

          <div>
            <p css={s.fontBold}>정모 일정</p>
            <div css={s.gatheringRow}>
              {displayGatherings.map(g => (
                <div key={g.gatheringId} css={s.gatheringItem}>
                  <div css={s.gatheringThumbWrap}>
                    <img css={s.gatheringThumb} src={g.thumbnailPicture} alt={g.title ?? "gathering"} />
                  </div>
                  <div css={s.gatheringTextBox}>
                    <div css={s.gatheringTitle}>{g.title ?? "-"}</div>
                    <div css={s.gatheringPlace}>{g.placeName ?? "-"}</div>
                    <div css={s.gatheringDate}>{formatDateTime(g.runningDate, g.runningTime)}</div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                css={s.moreBtn}
                aria-label="멤버 전체 보기"
                onClick={() => navigate(`/crews/${crewId}/gathering`)}
              >
                <MdMoreHoriz size={22} />
              </button>
            </div>
          </div>

          <div>
            <p css={s.fontBold}>크루 멤버 ({countMember})</p>
            <div css={s.memberRow}>
              {displayMembers.map((m) => (
                <div key={m.memberId} css={s.memberItem}>
                  <div css={s.avatarWrap}>
                    <img css={s.avatar} src={m.user?.picture} alt={m.user?.nickname ?? "member"} />
                  </div>
                  <div css={s.textBox}>
                    <div>
                      {m.roleId === 1 && <span css={s.badge}>👑</span>}
                      {m.roleId === 2 && <span css={s.badge}>⭐</span>}
                    </div>
                    <div css={s.nickname}>{m.user?.nickname ?? "이름없음"}</div>
                    <div css={s.fullName}>{m.user?.fullName ?? ""}</div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                css={s.moreBtn}
                aria-label="멤버 전체 보기"
                onClick={() => navigate(`/crews/${crewId}/members`)}
              >
                <MdMoreHoriz size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}

export default CrewInfo;