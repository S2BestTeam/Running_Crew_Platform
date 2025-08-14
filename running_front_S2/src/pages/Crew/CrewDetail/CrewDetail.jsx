/** @jsxImportSource @emotion/react */
import * as s from './styles';
import MainContainer from '../../../components/MainContainer/MainContainer';

function CrewDetail(props) {
  const [ crew, setCrew] = useState({
    name: "",
    gunguId: 0,
    crewProfileImg: "",
    crewName: "",
    useId: 0,
    title: "",
    content: "",
    limtedPeople: 0,
    crewTotalKm: 0,
  });
  
  return (
    <MainContainer>
      <div css={s.layout}>
        <div css={s.leftBox}>
          <div>
            <div css={s.crewInfoBox}>
              <div css={s.crewImgBox}></div>
              <div css={s.crewNameBox}>달빛런</div>
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
                {/* <img src="/images/crew-banner.jpg" alt="크루 배너" /> */}
              </div>
              <div css={s.crewInfoSection}>
                <div css={s.profileImg}>
                  <div></div>
                  <img src="/images/crew-profile.jpg" alt="크루 프로필" />
                </div>

                <div css={s.crewTextBox}>
                  <h2>달빛런</h2>
                  <div css={s.crewText}>
                    <p css={s.gungu}>북구</p>
                    <p>멤버수 30</p>
                    <p>•</p>
                    <p>총 5 KM</p>
                  </div>
                </div>
                <button css={s.joinButton}>크루가입</button>
              </div>
            </div>
            <div css={s.mainLine}>
            <div>
              <p>크루 소개 들어갈 공간</p>
            </div>
            <div>
              <p>정모 일정</p>
              <div>

              </div>
            </div>

            <div>
              <p>크루 멤버 (count)</p>
              <div css={s.memberContainer}>
                {/* {members.map((member) => ( */}
                  {/* <div css={s.memberBox} key={member.id}> */}
                  <div css={s.memberBox}>
                    <div css={s.memberImg}>
                      {/* <img src={member.img} alt={member.name} /> */}
                    </div>
                    {/* <div css={s.memberName}>{member.name}</div> */}
                    {/* <div css={s.memberStatus}>{member.status}</div> */}
                    <div css={s.memberInfo}>
                      <div css={s.memberName}>이름</div>
                      <div css={s.memberStatus}>안녕하세요</div>
                    </div>
                  </div>
                {/* ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}

export default CrewDetail;