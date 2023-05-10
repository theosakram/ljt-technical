import {
  Box,
  BoxProps,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Column, useTable } from "react-table";
import { PageLoading } from "./PageLoading";
import { EmptyState } from "./EmptyState";

export interface BaseTableProps<T extends object> {
  columns: Array<Column<T>>;
  data: Array<T>;
  isError?: boolean;
  isLoading?: boolean;
  wrapperProps?: BoxProps;
}

export const BaseTable = <T extends object>({
  columns,
  data,
  isLoading,
  isError,
  wrapperProps,
}: BaseTableProps<T>) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<T>({ columns, data });

  if (isLoading) {
    return <PageLoading h="10rem" />;
  }

  if (isError || !data || !data.length) {
    return <EmptyState />;
  }

  return (
    <Box w="100%" {...wrapperProps}>
      <TableContainer borderRadius="md">
        <Table
          {...getTableProps()}
          variant="striped"
          colorScheme="blackAlpha"
          size="sm"
          whiteSpace="normal"
        >
          <Thead bg="teal">
            {headerGroups.map((headerGroup, i) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={i}>
                {headerGroup.headers.map((column, j) => (
                  <Th
                    {...column.getHeaderProps()}
                    key={j}
                    color="white"
                    textTransform="capitalize"
                  >
                    {column.render("Header")}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row, k) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={k}>
                  {row.cells.map((cell, l) => {
                    return (
                      <Td {...cell.getCellProps()} key={l}>
                        {cell.render("Cell")}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
