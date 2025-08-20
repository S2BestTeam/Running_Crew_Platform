import { useQuery } from "@tanstack/react-query";
import { reqCrewGatherings } from "../api/Crew/gatheringApi";

export const useGetGatheringsQuery = (crewId) =>
  useQuery({
    queryKey: ["gatherings"],
    queryFn: async () => await reqCrewGatherings(crewId),
  });
