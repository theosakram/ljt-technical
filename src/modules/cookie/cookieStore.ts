import Cookie, { CookieSetOptions } from "universal-cookie";
import { AuthResponse } from "../auth/authType";

const cookie = new Cookie();
export const useCookieStore = () => {
  const browserCookie = cookie.getAll<AuthResponse>();

  const setCookie = (
    key: keyof AuthResponse,
    value: string,
    options?: CookieSetOptions
  ) => {
    return cookie.set(key, value, options);
  };

  return {
    ...browserCookie,
    setCookie,
  };
};
