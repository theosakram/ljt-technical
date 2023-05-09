import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <ChakraProvider resetCSS>
      <ColorModeProvider
        options={{ initialColorMode: "light", useSystemColorMode: false }}
      >
        {children}
      </ColorModeProvider>
    </ChakraProvider>
  );
};
