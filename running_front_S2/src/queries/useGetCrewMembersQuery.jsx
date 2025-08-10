import { useQuery } from "@tanstack/react-query";
import { reqGetCrewMembers } from "../api/crew/CrewApi";

export const useGetCrewMembersQuery = (crewId, enabled = true) =>
  useQuery({
    queryKey: ["crewMembers", crewId],
    queryFn: () => reqGetCrewMembers(crewId).then(r => r.data),
    enabled: enabled && !!crewId,
    staleTime: 0,
    gcTime: 0,
  });
