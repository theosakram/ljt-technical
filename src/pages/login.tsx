import { useAuth } from "@/modules/auth/authHooks";
import { useCookieStore } from "@/modules/cookie/cookieStore";
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Center,
  FormErrorMessage,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

type FormData = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const { setCookie } = useCookieStore();
  const router = useRouter();
  const toast = useToast();

  const { mutateAsync: login } = useAuth({
    onError: () => {
      if (!toast.isActive("error-login")) {
        toast({
          id: "error-login",
          title: "Login Error",
          status: "error",
          position: "top-right",
          isClosable: true,
        });
      }
    },
    onSuccess: (data) => {
      setCookie("session", data.data.session);
      setCookie("user", data.data.user);

      return router.push("/");
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      password: "",
      username: "",
    },
  });

  return (
    <form
      style={{ width: "100%" }}
      onSubmit={handleSubmit((e) => {
        return login({ username: e.username, password: e.password });
      })}
    >
      <Center w="100%" h="100vh">
        <VStack w="50%" align="start" spacing="1rem">
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              id="username"
              placeholder="Username"
              type="text"
              {...register("username", {
                required: { value: true, message: "Cannot be empty" },
              })}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              {...register("password", {
                required: { value: true, message: "Cannot be empty" },
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <Button type="submit" isLoading={isSubmitting}>
            Login
          </Button>
        </VStack>
      </Center>
    </form>
  );
};

export default LoginPage;
