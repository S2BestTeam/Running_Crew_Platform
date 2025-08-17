/** @jsxImportSource @emotion/react */
import { reqRegisterCrewMember } from '../../../../api/Crew/crewApi';
import { reqGetReportByUserId } from '../../../../api/User/userApi';
import useGetCrewWelcomeListQuery from '../../../../queries/useGetCrewWelcomeListQuery';
import { useCrewStore } from '../../../../stores/useCrewStroes';
import * as s from './styles';
import { useEffect, useState } from 'react';

function CrewWelcome({ isCrewLeader }) {
  const { crewId } = useCrewStore();
  const crewWelcomeList = useGetCrewWelcomeListQuery(crewId);
  const welcomes = crewWelcomeList?.data?.body || [];
  const [selectedUser, setSelectedUser] = useState(null);
  const userId = selectedUser?.userId;
  const [ reports, setReports ] = useState([]);
  
  useEffect(() => {
    if (!userId) return;
    const fetchData = async () => {
      try {
        const res = await reqGetReportByUserId(userId);
        setReports(res.data.body);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  },[userId])

  const handleApproveOnClick = async () => {
    const reqRegCrewMember = {
      crewId,
      userId: selectedUser?.userId,
    }
    await reqRegisterCrewMember(reqRegCrewMember);
    setSelectedUser(null);
  };

  const handleRejectOnClick = () => {
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

  const hasReport = (userId) => {
    if (selectedUser?.userId === userId) {
      return reports && reports.length > 0;
    }
    return false;
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
                    {hasReport(welcome.userId) && (
                      <span css={s.warningDot} title="신고 이력이 있습니다">🔴</span>
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
                  {reports && reports.length > 0 && (
                    <span css={s.warningBadge}>주의 필요</span>
                  )}
                </h4>
                <div css={s.reportHistory}>
                  {reports && reports.length > 0 ? (
                    <div css={s.reportItem}>
                      {reports.map((report, index) => (
                        <div key={index} css={s.reportDetail}>
                          <div css={s.reportDate}>
                            <strong>신고일:</strong> {new Date(report.createdAt).toLocaleDateString("ko-KR")}
                          </div>
                          <div css={s.reportReason}>
                            <strong>신고 사유:</strong> {report.reason?.reason}
                          </div>
                        </div>
                      ))}
                    </div>
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