import { useQuery } from "@tanstack/react-query";
import { reqGetCrewRunningBoards } from "../api/crew/CrewApi";

export const useGetCrewRunningBoardsQuery = (crewId, { status = "모집중", page = 0, size = 10, enabled = true } = {}) =>
  useQuery({
    queryKey: ["crewBoards", crewId, status, page, size],
    queryFn: () => reqGetCrewRunningBoards({ crewId, status, page, size }).then(b => b.data),
    enabled: enabled && !!crewId,
    staleTime: 0,
    gcTime: 0,
  });
