import { useQuery } from '@tanstack/react-query';
import { reqGetReportList } from '../api/Crew/reportApi';

export default function useGetReportListQuery({ crewId, enabled = true }) {
    const normalizedId = Number(crewId ?? '');

    return useQuery({
    queryKey: ['reportList', normalizedId],
    enabled: enabled && !!normalizedId,
    queryFn: async () => {
        const res = await reqGetReportList(normalizedId);
        return res.data;
    },
    });
}