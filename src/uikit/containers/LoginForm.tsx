import { useAuth } from "@/modules/auth/authHooks";
import { useCookieStore } from "@/modules/cookie/cookieStore";
import {
  useToast,
  VStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormData = {
  username: string;
  password: string;
};

const schema: yup.ObjectSchema<FormData> = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const LoginForm = () => {
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
    resolver: yupResolver(schema),
  });

  return (
    <form
      style={{ width: "100%" }}
      onSubmit={handleSubmit((e) => {
        return login({ username: e.username, password: e.password });
      })}
    >
      <VStack w="100%" spacing="1rem">
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            id="username"
            placeholder="Username"
            type="text"
            borderColor="gray.400"
            {...register("username")}
            required
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
            borderColor="gray.400"
            required
            {...register("password")}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          isLoading={isSubmitting}
          alignSelf="start"
          colorScheme="teal"
        >
          Login
        </Button>
      </VStack>
    </form>
  );
};
