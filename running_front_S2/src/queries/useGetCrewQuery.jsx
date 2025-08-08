import { useQuery } from "@tanstack/react-query";
import { reqGetCrew } from "../api/crew/crewApi";

export const useGetCrewQuery = () => useQuery({
    queryKey: ["getCrew"],
    queryFn: async () => await reqGetCrew(),
    staleTime: 0,
    gcTime: 0
})