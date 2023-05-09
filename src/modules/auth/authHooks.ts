import { UseMutationOptions, useMutation } from "react-query";
import { AuthRequest, AuthResponse } from "./authType";
import { login } from "./authService";
import { AxiosResponse } from "axios";

export const useAuth = (
  options?: UseMutationOptions<
    AxiosResponse<AuthResponse>,
    unknown,
    AuthRequest
  >
) => {
  return useMutation(["login"], login, options);
};
