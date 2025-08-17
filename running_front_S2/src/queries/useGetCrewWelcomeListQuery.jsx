import { useQuery } from "@tanstack/react-query"
import { reqCrewWelcomes } from "../api/Crew/crewApi";

export const useGetCrewWelcomeListQuery = (crewId) => {
  return useQuery({
    queryKey: ["crewWelcomeList", crewId],
    queryFn: async () => {
      const res = await reqCrewWelcomes(crewId);
      return res.data;
    }
  })
}