import { UseMutationOptions, useMutation } from "react-query";
import { AuthRequest, AuthResponse } from "./authType";
import { login } from "./authService";
import { AxiosResponse } from "axios";
import { queryKeys } from "@/shared/constant";

export const useAuth = (
  options?: UseMutationOptions<
    AxiosResponse<AuthResponse>,
    unknown,
    AuthRequest
  >
) => {
  return useMutation([queryKeys.auth], login, options);
};
