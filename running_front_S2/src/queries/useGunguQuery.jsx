import { useQuery } from "@tanstack/react-query";
import { reqGungu } from "../api/useReqList";

export const useGunguQuery = useQuery({
  queryKey:["gungu"],
  queryFn: async () => await reqGungu(),
})