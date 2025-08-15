/** @jsxImportSource @emotion/react */
import * as s from './styles';
import MainContainer from '../../../components/MainContainer/MainContainer';
import { useParams } from 'react-router-dom';
import usePrincipalQuery from '../../../queries/usePrincipalQuery';
import { useCrewDetailQuery } from '../../../queries/useCrewDetailQuery';

function CrewDetail() {
  const principal = usePrincipalQuery();
  const userId = principal?.data?.data?.body?.user?.userId;

  const { crewId } = useParams();

  const { data: crewData } = useCrewDetailQuery(crewId);

  const crew = crewData?.body || {
    gunguId: 0,
    crewProfileImg: "",
    crewName: "",
    userId: 0,
    title: "",
    content: "",
    limtedPeople: 0,
    crewTotalKm: 0,
  };

  return (
    <MainContainer>
      <div css={s.layout}>
        <div css={s.leftBox}>
          <div>
            <div css={s.crewInfoBox}>
              <div css={s.crewImgBox}></div>
              <div css={s.crewNameBox}>{crew.crewName}</div>
            </div>
            <div css={s.buttonContainer}>
              <button>크루 멤버</button>
              <button>정모 일정</button>
              <button>가입 인사</button>
              <button>자유게시판</button>
              <button>사진첩</button>
              <button>공지사항</button>
              <button>문의사항</button>
            </div>
          </div>

          <div css={s.getout}>
            <button>탈퇴하기</button>
          </div>
        </div>

        <div css={s.mainBox}>
          <div css={s.titleBox}>
            <div css={s.banner}>
              <div></div>
            </div>
            <div css={s.crewInfoSection}>
              <div css={s.profileImg}>
                <div></div>
                <img src={crew.crewProfileImg} alt="크루 프로필" />
              </div>

              <div css={s.crewTextBox}>
                <h2>{crew.crewName}</h2>
                <div css={s.crewText}>
                  <p css={s.gungu}>{crew.gunguName}</p>
                  <p>멤버수 30</p>
                  <p>•</p>
                  <p>총 {crew.crewTotalKm} KM</p>
                </div>
              </div>
              { crew.userId === userId 
                ? <button css={s.modifyButton}>크루 수정</button>
                : <button css={s.joinButton}>크루가입</button>
              }
            </div>
          </div>

          <div css={s.mainLine}>
            <div>
              <p css={s.fontBold}>한줄 소개</p>
              <div>{crew.title}</div>
              <p css={s.fontBold}>크루 소개</p>
              <div dangerouslySetInnerHTML={{ __html: crew.content }} />
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
      </div>
    </MainContainer>
  );
}

export default CrewDetail;