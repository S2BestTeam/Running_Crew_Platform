import { useQuery } from "@tanstack/react-query";
<<<<<<< HEAD
import { reqGetCrewList } from "../api/crew/crewApi";
=======
import { reqGetCrewList } from "../api/crew/CrewApi";
>>>>>>> origin/14-마이페이지-수정-기능-및-css-작업

function useGetCrewListQuery({ page, size, searchText, gunguId }) {
  return useQuery({
    queryKey: ["getCrewList", page, size, searchText, gunguId],
    queryFn: async () =>
      await reqGetCrewList({ page, size, searchText, gunguId }),
  });
}

<<<<<<< HEAD
export default useGetCrewListQuery;
=======
export default useGetCrewListQuery;
>>>>>>> origin/14-마이페이지-수정-기능-및-css-작업
