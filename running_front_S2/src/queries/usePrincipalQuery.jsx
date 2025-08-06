import { useQuery } from "@tanstack/react-query";
import { reqPrincipal } from "../api/user/UserApi";

function usePrincipalQuery() {
  return useQuery({
    queryKey: ["principal"],
    queryFn: async () => await reqPrincipal(),
  });
}

export default usePrincipalQuery;
