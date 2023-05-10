import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "react-query";
import { OrderError, OrderRequest, OrderResponse } from "./orderType";
import { queryKeys } from "@/shared/constant";
import { getOrders, postOrder } from "./orderService";
import { AxiosResponse } from "axios";
import { useCookieStore } from "../cookie/cookieStore";

export const useGetOrders = (
  options?: UseQueryOptions<
    OrderResponse,
    unknown,
    OrderResponse,
    Array<string>
  >
) => {
  const { session } = useCookieStore();

  return useQuery(
    [queryKeys.getOrders],
    () => getOrders({ Authorization: session }),
    options
  );
};

export const usePostOrder = (
  options?: UseMutationOptions<
    AxiosResponse<OrderResponse>,
    unknown,
    OrderRequest
  >
) => {
  const { session } = useCookieStore();

  return useMutation(
    [queryKeys.postOrder],
    (payload) => postOrder(payload, { Authorization: session }),
    options
  );
};
