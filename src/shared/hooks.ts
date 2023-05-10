import { useQueryClient } from "react-query";
import { queryKeys } from "./constant";

type QueryKeys = keyof typeof queryKeys;

export const useInvalidateQuery = () => {
  const queryClient = useQueryClient();

  return {
    invalidateQuery: (query: QueryKeys) => {
      return queryClient.invalidateQueries({
        queryKey: [queryKeys[query]],
      });
    },
  };
};
