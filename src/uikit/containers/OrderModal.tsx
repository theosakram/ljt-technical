import { usePostOrder } from "@/modules/orders/orderHooks";
import { OrderRequest } from "@/modules/orders/orderType";
import { useInvalidateQuery } from "@/shared/hooks";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useToast,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  HStack,
  Select,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type OrderModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const schema = yup.object({
  consigneeName: yup.string().required("Name cannot be empty"),
  consigneeAddress: yup.string().required("Address cannot be empty"),
  consigneeCity: yup.string().required("City cannot be empty"),
  consigneeCountry: yup.string().required("Country cannot be empty"),
  consigneePostalCode: yup.string().required("Postal Code cannot be empty"),
  consigneeProvince: yup.string().required("Province cannot be empty"),
  consigneeNumber: yup.string().required("Phone number cannot be empty"),
  height: yup
    .number()
    .moreThan(0, "Must be more than zero")
    .required("Height cannot be empty"),
  weight: yup
    .number()
    .moreThan(0, "Must be more than zero")
    .required("Weight cannot be empty"),
  length: yup
    .number()
    .moreThan(0, "Must be more than zero")
    .required("Lenght cannot be empty"),
  width: yup
    .number()
    .moreThan(0, "Must be more than zero")
    .required("Width cannot be empty"),
  paymentType: yup.string().required("Payment type cannot be empty"),
});

export const OrderModal = (props: OrderModalProps) => {
  const { invalidateQuery } = useInvalidateQuery();
  const errorToast = useToast({
    position: "top-right",
    description: "Something is wrong. Try again later",
    duration: 3000, // 3 seconds
    isClosable: true,
    status: "error",
  });

  const { mutateAsync: order, isLoading } = usePostOrder({
    onSettled: props.onClose,
    onSuccess: () => invalidateQuery("getOrders"),
    onError: () => {
      // prevent duplicate toast
      if (!errorToast.isActive("new-order-error")) {
        errorToast({ id: "new-order-error" });
      }
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<OrderRequest>({
    defaultValues: {
      consigneeAddress: "",
      consigneeCity: "",
      consigneeCountry: "",
      consigneeName: "",
      consigneeNumber: "",
      consigneePostalCode: "",
      consigneeProvince: "",
      height: 0,
      length: 0,
      paymentType: "",
      weight: 0,
      width: 0,
    },
    resolver: yupResolver(schema),
  });

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Order</ModalHeader>
        <form
          style={{ width: "100%" }}
          onSubmit={handleSubmit((e) => {
            return order({
              ...e,
              height: +e.height,
              width: +e.width,
              weight: +e.weight,
              length: +e.length,
            });
          })}
        >
          <ModalCloseButton />
          <ModalBody>
            <VStack w="100%" spacing="1rem">
              <FormControl isInvalid={!!errors.consigneeName?.message}>
                <FormLabel htmlFor="consigneeName">Name</FormLabel>
                <Input
                  id="consigneeName"
                  placeholder="Name"
                  type="text"
                  borderColor="gray.400"
                  {...register("consigneeName")}
                  required
                />
                <FormErrorMessage>
                  {errors.consigneeName && errors.consigneeName.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  placeholder="Phone Number"
                  type="text"
                  borderColor="gray.400"
                  {...register("consigneeNumber")}
                  required
                />
                <FormErrorMessage>
                  {errors.consigneeNumber && errors.consigneeNumber.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel>Address</FormLabel>
                <VStack w="100%" spacing="0.5rem">
                  <Input
                    placeholder="Street"
                    type="text"
                    borderColor="gray.400"
                    {...register("consigneeAddress")}
                    required
                  />
                  <HStack w="100%" spacing="0.5rem">
                    <Input
                      placeholder="City"
                      type="text"
                      borderColor="gray.400"
                      {...register("consigneeCity")}
                      required
                    />

                    <Input
                      placeholder="Province"
                      type="text"
                      borderColor="gray.400"
                      {...register("consigneeProvince")}
                      required
                    />
                  </HStack>
                  <HStack w="100%" spacing="0.5rem">
                    <Input
                      placeholder="Country"
                      type="text"
                      borderColor="gray.400"
                      {...register("consigneeCountry")}
                      required
                    />

                    <Input
                      placeholder="Postal Code"
                      type="text"
                      borderColor="gray.400"
                      {...register("consigneePostalCode")}
                      required
                    />
                  </HStack>
                </VStack>
              </FormControl>

              <FormControl>
                <FormLabel>Payment Type</FormLabel>
                <Select required {...register("paymentType")}>
                  <option value="cod">COD</option>
                  <option value="prepaid">Prepaid</option>
                </Select>
                <FormErrorMessage>
                  {errors.paymentType && errors.paymentType.message}
                </FormErrorMessage>
              </FormControl>

              <VStack>
                <HStack w="100%" spacing="0.5rem">
                  <FormControl>
                    <FormLabel>Height</FormLabel>
                    <Input
                      placeholder="Height"
                      type="number"
                      borderColor="gray.400"
                      {...register("height")}
                      required
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Weight</FormLabel>
                    <Input
                      placeholder="Weight"
                      type="number"
                      borderColor="gray.400"
                      {...register("weight")}
                      required
                    />
                  </FormControl>
                </HStack>
                <HStack w="100%" spacing="0.5rem">
                  <FormControl>
                    <FormLabel>Length</FormLabel>
                    <Input
                      placeholder="Length"
                      type="number"
                      borderColor="gray.400"
                      {...register("length")}
                      required
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Width</FormLabel>
                    <Input
                      placeholder="Width"
                      type="number"
                      borderColor="gray.400"
                      {...register("width")}
                      required
                    />
                  </FormControl>
                </HStack>
              </VStack>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Button variant="ghost" onClick={props.onClose}>
                Close
              </Button>
              <Button colorScheme="teal" isLoading={isLoading} type="submit">
                Create
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
