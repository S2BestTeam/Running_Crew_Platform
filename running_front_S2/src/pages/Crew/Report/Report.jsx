/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useState } from "react";
import useGetReportListQuery from "../../../queries/useGetReportListQuery";
import MemberModal from "../Member/MemberModal/MemberModal";
import { useCrewStore } from "../../../stores/useCrewStroes";
import ReportModal from "./ReportModal/ReportModal";

function Report({ isCrewLeader }) {
  const { crewId } = useCrewStore();
  const isEnabled = !!crewId && !!isCrewLeader;
  const { data } = useGetReportListQuery({
    crewId,
    enabled: isEnabled,
  });
  const [selectedMemberId, setSelectedMemberId] = useState(null);

  if (!isCrewLeader) return null;

  const reportList = data?.body ?? [];

  const handlePickMember = (memberId) => {
    if (!memberId) return;
    setSelectedMemberId(memberId);
  };

  const [reportOpen, setReportOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState({
    memberId: null,
    nickname: "",
    crewId,
  });

  const handleReport = (payload) => {
    const { memberId, nickname } = payload || {};
    setReportTarget({ memberId, nickname: nickname || "", crewId });
    setSelectedMemberId(null);
    setReportOpen(true);
  };

  return (
    <>
      <div css={s.title}>
        <h2>신고 사항</h2>
      </div>
      <table css={s.table}>
        <thead>
          <tr>
            <th css={s.th}>신고자</th>
            <th css={s.th}>피신고자</th>
            <th css={s.th}>사유</th>
            <th css={s.th}>신고 시각</th>
          </tr>
        </thead>
        <tbody>
          {reportList.length === 0 ? (
            <tr>
              <td style={{ paddingLeft : "2rem"}}>신고 내역이 없습니다.</td>
            </tr>
          ) : (
            reportList.map((r) => (
              <tr key={r.reportId}>
                <td css={s.td} onClick={() => handlePickMember(r.reportMemberId)} title="신고자 정보 보기">
                  {r.reporterUser === null ? "탈퇴한 유저입니다." : r.reporterUser?.fullName}
                </td>
                <td css={s.td} onClick={() => handlePickMember(r.reportedMemberId)} title="피신고자 정보 보기">
                  {r.reportedUser?.fullName}
                </td>
                <td css={s.td}>{r.reason}</td>
                <td css={s.td}>{r.createdAt ? new Date(r.createdAt).toLocaleString() : "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selectedMemberId && (
        <MemberModal
          memberId={selectedMemberId}
          isOpen={!!selectedMemberId}
          isLeader={isCrewLeader}
          onClose={() => setSelectedMemberId(null)}
          onChanged={() => {
            setSelectedMemberId(null);
          }}
          onReport={(payload) => handleReport(payload)}
        />
      )}
      <ReportModal
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
        memberId={reportTarget.memberId}
        nickname={reportTarget.nickname}
        crewId={reportTarget.crewId}
      />
    </>
  );
}
export default Report;