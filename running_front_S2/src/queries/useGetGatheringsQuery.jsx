import { useQuery } from "@tanstack/react-query";
import { reqCrewGatherings } from "../api/Crew/crewGatheringApi";

export const useGetGatheringsQuery = (crewId) =>
  useQuery({
    queryKey: ["gatherings"],
    queryFn: async () => await reqCrewGatherings(crewId),
  });
