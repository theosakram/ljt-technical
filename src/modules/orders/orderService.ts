import { _axios } from "@/shared/_axios";
import { OrderRequest, OrderResponse } from "./orderType";

type Context = {
  Authorization: string;
};

export const getOrders = async (context?: Context) => {
  const { data } = await _axios.get<OrderResponse>("/orders", {
    headers: context,
  });

  return data;
};

export const postOrder = async (payload: OrderRequest, context?: Context) => {
  return await _axios.post<OrderResponse>("/orders", payload, {
    headers: context,
  });
};
