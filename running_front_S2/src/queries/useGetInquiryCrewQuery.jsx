import { useQuery } from "@tanstack/react-query"
import { reqGetInquiriesCrew } from "../api/Inquiry/crewInquiryApi"

export const useGetInquiryCrewQuery = () => {
  return useQuery({
    queryKey: ["inquiryCrewList"],
    queryfn: reqGetInquiriesCrew(),
    staleTime: 1000 * 60 * 5,
  })
}