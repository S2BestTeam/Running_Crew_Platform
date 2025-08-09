import { useQuery } from "@tanstack/react-query";
import { reqGetCrewList } from "../api/crew/crewApi";

function useGetCrewListQuery({ page, size, searchText, gunguId }) {
  return useQuery({
    queryKey: ["getCrewList", page, size, searchText, gunguId],
    queryFn: async () =>
      await reqGetCrewList({ page, size, searchText, gunguId }),
  });
}

export default useGetCrewListQuery;