import { QueryProvider } from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";

const LoginGuard = dynamic(
  () =>
    import("../uikit/components/LoginGuard").then((comp) => comp.LoginGuard),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Luwjistik Technical</title>
      </Head>
      <ThemeProvider>
        <QueryProvider>
          <LoginGuard>
            <Component {...pageProps} />
          </LoginGuard>
        </QueryProvider>
      </ThemeProvider>
    </>
  );
}
