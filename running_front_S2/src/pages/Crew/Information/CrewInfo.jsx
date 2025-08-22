/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import * as s from './styles';
import { useCrewStore } from '../../../stores/useCrewStroes';
import WelcomeRegModal from '../Welcome/WelcomeRegModal/WelcomeRegModal';
import { reqCrewMember, reqGetMemberCount,  } from '../../../api/Crew/memberApi';
import usePrincipalQuery from '../../../queries/usePrincipalQuery';
import ContentLayout from '../../../components/ContentLayout/ContentLayout';

function CrewInfo() {
  const principal = usePrincipalQuery();
  const userId = principal?.data?.data?.body?.user?.userId;
  const { crew } = useCrewStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [ countMember, setCountMember ] = useState(1);
  const [isPending, setIsPending] = useState(false);

  const crewId = crew?.crewId;
  
  useEffect(() => {
    if (!crewId || !userId) return;
    reqCrewMember({ crewId, userId })
    .then((res) => {
      setIsMember(res.data.body);
    })
    .catch((err) => {
      console.error("API 에러:", err);
    });

    reqGetMemberCount(crewId)
    .then((res) => {
      setCountMember(res.data.body);
    });
  }, [crewId, userId, countMember]);
  

  return (
    <ContentLayout>
      {/* <div> */}
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
            {isMember && (
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
              crewId={crew?.crewId}
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
            <p>정모 일정</p>
          </div>

          <div>
            <p>크루 멤버 (count)</p>
            <div css={s.memberContainer}>
              <div css={s.memberBox}>
                <div css={s.memberImg}></div>
                <div css={s.memberInfo}>
                  <div css={s.memberName}>이름</div>
                  <div css={s.memberStatus}>안녕하세요</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}

export default CrewInfo;