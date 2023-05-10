import { Center, Text } from "@chakra-ui/react";

export const EmptyState = () => {
  return (
    <Center w="100%" h="10rem">
      <Text fontSize="1.25rem" fontWeight="semibold">
        There are no data to show
      </Text>
    </Center>
  );
};
