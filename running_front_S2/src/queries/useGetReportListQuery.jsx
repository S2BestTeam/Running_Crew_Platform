import { useQuery } from '@tanstack/react-query';
import { reqGetReportList } from '../api/Crew/reportApi';

export default function useGetReportListQuery({ crewId, enabled = true }) {
    return useQuery({
        queryKey: ['reportList', crewId],
        enabled: enabled && !!crewId,           
        queryFn: async () => {
            const res = await reqGetReportList({ crewId });
            return res.data;                
        },
    });
}
