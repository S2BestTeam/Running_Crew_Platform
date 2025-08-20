import React, { useEffect, useState } from 'react';
import usePrincipalQuery from '../../../queries/usePrincipalQuery';
import { useParams } from 'react-router-dom';
import useGetReportListQuery from '../../../queries/useGetReportListQuery';
import MemberModal from '../Member/MemberModal/MemberModal';
import useUserDetailQuery from '../../../queries/useUserDetailQuery';

function Report({ crewId, isCrewLeader, onPickUser }) {
    if (!isCrewLeader) return null;

    // 모든 hooks를 컴포넌트 최상단에 위치
    const [selectedUserId, setSelectedUserId] = useState(null);
    const { data, isLoading, isError } = useGetReportListQuery({
        crewId,
        enabled: isCrewLeader,
    });
    const userId = selectedUserId;

    // 핸들러 함수도 hooks 다음에 위치
    const handleClickUser = (userId) => {
        setSelectedUserId(userId);
        console.log(userId);
    };

    // early return은 hooks 이후에
    if (isLoading || isError) return null;

    const reportList = data?.body ?? [];

    // 나머지 렌더링 로직...
    return (
        <div>
            {reportList.map((r) => (
                <div key={r.reportId}>
                    <div onClick={() => handleClickUser(r.reportedUserId)}>
                        {r.reportedUserName}
                    </div>
                    <div onClick={() => handleClickUser(r.reporterUserId)}>
                        {r.reporterUserName}
                    </div>
                    <div>{r.reason}</div>
                </div>
            ))}

            {selectedUserId && (
                <MemberModal
                    userId={selectedUserId}
                    isOpen={!!selectedUserId}
                    iseader={isCrewLeader}
                    onClose={() => setSelectedUserId(null)}
                />
            )}
        </div>
    );
}
export default Report;