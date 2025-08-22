// import { useInfiniteQuery } from "@tanstack/react-query";
// import { reqGetCrewFreeBoard } from "../api/Crew/freeboardApi";

// export default function useGetCrewFreeBoardQuery({ crewId, searchText = "", size = 20 }) {
//   return useInfiniteQuery({
//     queryKey: ["getCrewFreeBoard", { crewId, searchText, size }],
//     queryFn: async ({ pageParam = 1 }) => {
//       const res = await reqGetCrewFreeBoard({ crewId, page: pageParam, size, searchText });
//       return res;
//     },
//     getNextPageParam: (lastPage, allPages) => {
//       const body = lastPage?.data?.body;
//       if (!body) return undefined;
//       const currentPage = Number(body.page ?? allPages.length) || 1;
//       const totalPages = Number(body.totalPages ?? 1) || 1;
//       return currentPage < totalPages ? currentPage + 1 : undefined;
//     },
//     staleTime: 60000,
//     keepPreviousData: true,
//   });
// }

import { useQuery } from "@tanstack/react-query";
import { reqGetFreeBoards } from "../api/Crew/freeboardApi";


export default function useGetCrewFreeBoardQuery({ crewId, page = 1, size = 10, searchText = "" }) {
  return useQuery({
    queryKey: ["freeBoards", crewId, page, size, searchText],
    queryFn: () => reqGetFreeBoards({ crewId, page, size, searchText }),
    keepPreviousData: true,     
    staleTime: 5 * 1000,
  });
}
