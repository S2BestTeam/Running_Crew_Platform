import { useQuery } from "@tanstack/react-query";
import { reqGetCrew } from "../api/crew/CrewApi";

export const useGetCrewQuery = () => useQuery({
    queryKey: ["getCrew"],
    queryFn: async () => await reqGetCrew(),
    staleTime: 0,
    gcTime: 0
})