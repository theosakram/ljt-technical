import { useCookieStore } from "@/modules/cookie/cookieStore";
import { OrderModal } from "@/uikit/containers/OrderModal";
import { OrderTable } from "@/uikit/containers/OrderTable";
import { AddIcon } from "@chakra-ui/icons";
import {
  VStack,
  Button,
  Text,
  useDisclosure,
  Box,
  Spacer,
  Flex,
} from "@chakra-ui/react";

const Home = () => {
  const orderModalDisclosure = useDisclosure();
  const { logout } = useCookieStore();

  return (
    <VStack w="100%" spacing="1rem" align="start" p="3rem">
      <Text fontSize="3rem" fontWeight="bold">
        Order Data
      </Text>

      <Flex w="100%">
        <Button
          leftIcon={<AddIcon />}
          colorScheme="teal"
          variant="solid"
          onClick={orderModalDisclosure.onOpen}
        >
          Create order
        </Button>
        <Spacer />
        <Button onClick={logout}>Logout</Button>
      </Flex>

      <OrderTable />
      <OrderModal
        isOpen={orderModalDisclosure.isOpen}
        onClose={orderModalDisclosure.onClose}
      />
    </VStack>
  );
};

export const getStaticProps = async () => {
  return {
    props: {},
  };
};

export default Home;
