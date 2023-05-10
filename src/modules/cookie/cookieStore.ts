import Cookie, { CookieSetOptions } from "universal-cookie";
import { AuthResponse } from "../auth/authType";

export const cookie = new Cookie();
export const useCookieStore = () => {
  const browserCookie = cookie.getAll<AuthResponse>();

  const setCookie = (
    key: keyof AuthResponse,
    value: string,
    options?: CookieSetOptions
  ) => {
    return cookie.set(key, value, options);
  };

  const logout = () => {
    cookie.remove("session");
    cookie.remove("user");

    return (window.location.href = "/");
  };

  return {
    ...browserCookie,
    logout,
    setCookie,
  };
};
