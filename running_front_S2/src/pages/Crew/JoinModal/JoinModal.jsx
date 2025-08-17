/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import usePrincipalQuery from '../../../queries/usePrincipalQuery';
import * as s from './styles';
import { reqJoinCrew } from '../../../api/Crew/crewApi';

function JoinModal({setIsOpen, crewId}) {
  const principal = usePrincipalQuery();
  const userSimpleInfo = principal?.data?.data?.body?.user;
  const birthYear = new Date(userSimpleInfo.birthDate).getFullYear(); 
  const currentYear = new Date().getFullYear(); 
  const age = (currentYear - birthYear) + 1;
  const [ simpleInfo, setSimpleInfo ] = useState("");
  
  const handleJoinCrewOnClick = async () => {
    const updatedCrewMember = {
        userId: userSimpleInfo.userId,
        content: simpleInfo,
    };
    try {
      await reqJoinCrew(crewId, updatedCrewMember);
      alert("가입 신청이 완료되었습니다.")
    } catch (error) {
      alert("가입 신청중 오류가 발생했습니다." + error);
    }
    setIsOpen(false);
  }
  
  return (
    <div css={s.background} onClick={() => setIsOpen(false)}>
      <div css={s.modalBox} onClick={(e) => e.stopPropagation()}>
        <h2>크루 가입</h2>
        <p>닉네임</p>
        <input type="text" value={userSimpleInfo.nickname} disabled/>
        <p>나이</p>
        <input type="text" value={age} disabled/>
        <p>자기소개</p>
        <input type="text" placeholder='편하게 작성해주세요!' value={simpleInfo} onChange={(e) => setSimpleInfo(e.target.value)}/>
        <div css={s.buttons}>
          <button onClick={() => setIsOpen(false)}>닫기</button>
          <button onClick={handleJoinCrewOnClick}>확인</button>
        </div>
      </div>
    </div>
  );
}

export default JoinModal;