import { useQuery } from "@tanstack/react-query"
import { reqCrewDetail } from "../api/Crew/crewApi";

export const useCrewDetailQuery = (crewId) => {
  return useQuery({
    queryKey: ["crewDetail", crewId],
    queryFn: async () => {
      const response = await reqCrewDetail(crewId);
      return response.data;
    }
  })
}