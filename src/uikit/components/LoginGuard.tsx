import { PropsWithChildren, useEffect } from "react";
import { PageLoading } from "./PageLoading";
import { useRouter } from "next/router";
import { useCookieStore } from "@/modules/cookie/cookieStore";

export const LoginGuard = ({ children }: PropsWithChildren) => {
  const { session } = useCookieStore();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  if (session || router.pathname === "/login") {
    return <>{children}</>;
  }

  return <PageLoading />;
};
