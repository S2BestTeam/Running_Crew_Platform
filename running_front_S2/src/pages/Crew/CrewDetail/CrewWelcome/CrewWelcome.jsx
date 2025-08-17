/** @jsxImportSource @emotion/react */
import { reqRegisterCrewMember } from '../../../../api/Crew/crewApi';
import { useGetCrewWelcomeListQuery } from '../../../../queries/useGetCrewWelcomeListQuery';
import * as s from './styles';
import { useState } from 'react';

function CrewWelcome({ crewId, isCrewLeader }) {
  const crewWelcomeList = useGetCrewWelcomeListQuery(crewId);
  const welcomes = crewWelcomeList?.data?.body || [];
  const [selectedUser, setSelectedUser] = useState(null);

  const handleApproveOnClick = async () => {
    const reqRegCrewMember = {
      crewId: selectedUser?.crewId,
      userId: selectedUser?.userId,
    }
    await reqRegisterCrewMember(reqRegCrewMember);
    setSelectedUser(null);
  };

  const handleRejectOnClick = (welcomeId) => {
    console.log("거절:", welcomeId);
    console.log("selectedUser 전체 데이터:", selectedUser);
    setSelectedUser(null);
  };

  const handleSelectedRowOnClick = (welcome) => {
    if (isCrewLeader) {
      setSelectedUser(welcome);
    }
  };

  const handleCloseModalOnClick = () => {
    setSelectedUser(null);
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return "";
    const birthYear = new Date(birthDate).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear + 1;
  };

  // 신고이력이 있는지 확인하는 함수 (실제로는 API에서 가져와야 함)
  const hasReportHistory = (userId) => {
    // TODO: 실제 API 호출로 신고이력 확인
    // 현재는 임시로 일부 유저에게만 신고이력이 있다고 가정
    return userId % 2 === 0; // 임시
  };

  return (
    <div css={s.mainBox}>
      <h2>가입 인사</h2>
      {isCrewLeader && (
        <p css={s.instruction}>행을 클릭하면 상세 정보를 볼 수 있습니다.</p>
      )}
      
      <table css={s.table}>
        <thead>
          <tr>
            <th>No.</th>
            <th>닉네임</th>
            {isCrewLeader && <th>이름</th>}
            {isCrewLeader && <th>나이</th>}
            <th>자기소개</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody>
          {welcomes.length > 0 ? (
            welcomes.map((welcome) => {
              const age = calculateAge(welcome.birthDate);

              return (
                <tr 
                  key={welcome.welcomeRank}
                  css={isCrewLeader ? s.clickableRow : undefined}
                  onClick={() => handleSelectedRowOnClick(welcome)}
                >
                  <td>{welcome.welcomeRank}</td>
                  { isCrewLeader ? 
                  <td css={s.nicknameCell}>
                    {welcome.nickname}
                    {hasReportHistory(welcome.userId || welcome.user_id) && (
                      <span css={s.warningDot} title="신고 이력이 있습니다">⚠</span>
                    )}
                  </td>
                  :
                  <td css={s.nicknameCell}>
                    {welcome.nickname}
                  </td>
                  }
                  {isCrewLeader && <td>{welcome.fullName}</td>}
                  {isCrewLeader && <td>{age}</td>}
                  <td css={s.contentCell}>{welcome.content}</td>
                  <td>{new Date(welcome.createdAt).toLocaleDateString("ko-KR")}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={isCrewLeader ? 6 : 4}>등록된 가입 인사가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedUser && (
        <div css={s.modalOverlay}>
          <div css={s.detailModalContent}>
            <div css={s.modalHeader}>
              <h3>가입 신청 상세정보</h3>
              <button css={s.closeBtn} onClick={handleCloseModalOnClick}>×</button>
            </div>
            
            <div css={s.modalBody}>
              <div css={s.infoSection}>
                <h4>기본 정보</h4>
                <div css={s.infoGrid}>
                  <div css={s.infoItem}>
                    <span css={s.label}>No.:</span>
                    <span>{selectedUser.welcomeRank}</span>
                  </div>
                  <div css={s.infoItem}>
                    <span css={s.label}>닉네임:</span>
                    <span>{selectedUser.nickname}</span>
                  </div>
                  <div css={s.infoItem}>
                    <span css={s.label}>이름:</span>
                    <span>{selectedUser.fullName}</span>
                  </div>
                  <div css={s.infoItem}>
                    <span css={s.label}>나이:</span>
                    <span>{calculateAge(selectedUser.birthDate)}</span>
                  </div>
                  <div css={s.infoItem}>
                    <span css={s.label}>등록일:</span>
                    <span>{new Date(selectedUser.createdAt).toLocaleDateString("ko-KR")}</span>
                  </div>
                </div>
              </div>

              <div css={s.infoSection}>
                <h4>자기소개</h4>
                <div css={s.introContent}>
                  {selectedUser.content}
                </div>
              </div>

              <div css={s.infoSection}>
                <h4>
                  신고 이력
                  {hasReportHistory(selectedUser.userId || selectedUser.user_id) && (
                    <span css={s.warningBadge}>주의 필요</span>
                  )}
                </h4>
                <div css={s.reportHistory}>
                  {hasReportHistory(selectedUser.userId || selectedUser.user_id) ? (
                    <>
                      <div css={s.reportItem}>
                        <span css={s.reportDate}>2025-07-12</span>
                        <span css={s.reportType}>욕설 신고</span>
                        <span css={s.reportStatus}>처리완료</span>
                      </div>
                      <div css={s.reportItem}>
                        <span css={s.reportDate}>2025-08-01</span>
                        <span css={s.reportType}>불참 신고</span>
                        <span css={s.reportStatus}>검토중</span>
                      </div>
                    </>
                  ) : (
                    <div css={s.noReports}>신고 이력이 없습니다.</div>
                  )}
                </div>
              </div>
            </div>

            <div css={s.modalActions}>
              <button css={s.approveBtn} onClick={handleApproveOnClick}>
                승인
              </button>
              <button css={s.rejectBtn} onClick={() => handleRejectOnClick(selectedUser.welcomeId)}>
                거절
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CrewWelcome;