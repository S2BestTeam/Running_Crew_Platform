import { useQuery } from "@tanstack/react-query";
import { reqGetRoleId } from "../api/Crew/memberApi";
import usePrincipalQuery from "./usePrincipalQuery";

export default function useGetCrewRoleId(crewId) {
  const { data: principal, isSuccess } = usePrincipalQuery();

  const userId = principal?.data?.body?.user?.userId;
  const uId = Number(userId);

  const enabled =
    isSuccess && Number.isFinite(crewId) && Number.isFinite(uId);

  return useQuery({
    queryKey: ["roleId", crewId, uId],
    queryFn: () => reqGetRoleId({ crewId, userId: uId }),
    enabled,
    staleTime: 60_000,
  })
};
