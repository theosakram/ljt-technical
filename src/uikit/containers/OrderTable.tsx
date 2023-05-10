import { Column } from "react-table";
import { BaseTable } from "../components/BaseTable";
import { useMemo } from "react";
import { useGetOrders } from "@/modules/orders/orderHooks";
import { Text, VStack } from "@chakra-ui/react";

type TableData = {
  index: number;
  name: string;
  address: {
    street: string;
    city: string;
    province: string;
    country: string;
    postalCode: string;
  };
  paymentType: string;
  dimension: {
    width: number;
    height: number;
    length: number;
    weight: number;
  };
  trackingNumber: string;
  phoneNumber: string;
};

export const OrderTable = () => {
  const { data, isLoading } = useGetOrders();

  const columns = useMemo((): Array<Column<TableData>> => {
    return [
      {
        Header: "#",
        accessor: "index",
      },

      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Address",
        accessor: "address",
        Cell: ({ value }) => {
          return (
            <VStack w="100%" spacing="0.5rem" align="start">
              <Text fontWeight="bold">Street</Text>
              <Text>{value.street}</Text>

              <Text fontWeight="bold">City</Text>
              <Text>{value.city}</Text>

              <Text fontWeight="bold">Province</Text>
              <Text>{value.province}</Text>

              <Text fontWeight="bold">Country</Text>
              <Text>{value.country}</Text>

              <Text fontWeight="bold">Postal Code</Text>
              <Text>{value.postalCode}</Text>
            </VStack>
          );
        },
      },
      {
        Header: "Payment Type",
        accessor: "paymentType",
      },
      {
        Header: "Dimension",
        accessor: "dimension",
        Cell: ({ value }) => {
          return (
            <VStack w="100%" spacing="0.5rem" align="start">
              <Text fontWeight="bold">Width</Text>
              <Text>{value.width}</Text>

              <Text fontWeight="bold">Length</Text>
              <Text>{value.length}</Text>

              <Text fontWeight="bold">Height</Text>
              <Text>{value.height}</Text>

              <Text fontWeight="bold">Weight</Text>
              <Text>{value.weight}</Text>
            </VStack>
          );
        },
      },
      {
        Header: "Tracking Number",
        accessor: "trackingNumber",
      },
      {
        Header: "Phone Number",
        accessor: "phoneNumber",
      },
    ];
  }, []);

  const tableData = useMemo((): Array<TableData> => {
    return (
      data?.data?.map((datum, i) => ({
        index: i + 1,
        name: datum.ConsigneeName,
        address: {
          street: datum.ConsigneeAddress,
          city: datum.ConsigneeCity,
          country: datum.ConsigneeCountry,
          province: datum.ConsigneeProvince,
          postalCode: datum.ConsigneePostalCode,
        },
        paymentType: datum.PaymentType,
        dimension: {
          height: datum.Height,
          width: datum.Width,
          length: datum.Length,
          weight: datum.Weight,
        },
        trackingNumber: datum.TrackingNumber,
        phoneNumber: datum.ConsigneeNumber,
      })) || []
    );
  }, [data]);

  return <BaseTable columns={columns} data={tableData} isLoading={isLoading} />;
};
