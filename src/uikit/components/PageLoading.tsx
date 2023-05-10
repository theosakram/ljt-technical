import { Center, Spinner } from "@chakra-ui/react";

export type PageLoadingProps = {
  h?: string;
};

export const PageLoading = ({ h = "100vh" }: PageLoadingProps) => {
  return (
    <Center w="100%" h={h}>
      <Spinner />
    </Center>
  );
};
