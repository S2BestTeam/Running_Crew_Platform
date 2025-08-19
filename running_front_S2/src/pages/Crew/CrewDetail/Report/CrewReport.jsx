import React, { useState } from 'react';
import usePrincipalQuery from '../../../../queries/usePrincipalQuery';
import { useParams } from 'react-router-dom';
import useGetReportListQuery from '../../../../queries/useGetReportListQuery';
import MemberModal from '../CrewMember/MemberModal/MemberModal';


function CrewReport({ crewId, isCrewLeader, onPickUser }) {
    if (!isCrewLeader) return null;
    const [selectedUserId, setSelectedUserId] = useState(null);
    const { data, isLoading, isError } = useGetReportListQuery({
        crewId,
        enabled: isCrewLeader,
    });
    if (isLoading || isError) return null;
    const reportList = data?.body ?? [];
    const handleClickUser = (id) => {
        if (!id) return;
        if (typeof onPickUser === "function") {
            onPickUser(id);
        } else {
            setSelectedUserId(id);
        }
    };


    return (
        <div>
            {reportList.map((r) => (
                <div key={r.reportId}>
                    <div onClick={() => r.reporterUserId && handleClickUser(r.reporterUserId)}>
                        {r.reporterUserName}
                    </div>
                    <div onClick={() => r.reportedUserId && handleClickUser(r.reportedUserId)}>
                        {r.reportedUserName}
                    </div>
                    <div>{r.reason}</div>
                </div>
            ))}

            {selectedUserId && (
                <MemberModal
                    crewId={crewId}
                    userId={selectedUserId}
                    isOpen={!!selectedUserId}
                    isLeader={isCrewLeader}
                    onClose={() => setSelectedUserId(null)}
                />
            )}
        </div>
    );
}

export default CrewReport;
