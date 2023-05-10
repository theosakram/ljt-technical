import { LoginForm } from "@/uikit/containers/LoginForm";
import { Box, Center } from "@chakra-ui/react";

const LoginPage = () => {
  return (
    <Center w="100%" h="100vh">
      <Box w="25%" p="1rem" borderRadius="md" border="1px solid gray">
        <LoginForm />
      </Box>
    </Center>
  );
};

export const getStaticProps = async () => {
  return {
    props: {},
  };
};

export default LoginPage;
