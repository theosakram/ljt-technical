import { _axios } from "@/shared/_axios";
import { AuthRequest, AuthResponse } from "./authType";

export const login = (payload: AuthRequest) => {
  return _axios.post<AuthResponse>("/login", payload);
};
