import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { TABLE_HEADERS } from "../constants/constants";
import useGetTodosQuery from "../api/todo_service/getTodos";
import TodoRows from "./TodoRows";
import { useSearchParams } from "react-router-dom";
import { InputFormModal } from "./InputFormModal";
import { useEffect, useMemo, useState } from "react";
import TodosTablePagination from "./TablePagination";
import useDeleteTodoMutation from "../api/todo_service/deleteTodo";
import TodoSearchBar from "./TodoSearch";
import { AxiosError, HttpStatusCode } from "axios";

const TodosTable = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || "1");
  const [searchTerm, setSearchTerm] = useState(searchParams.get("name") || "");

  const { data, error, isLoading, refetch } = useGetTodosQuery(
    page,
    searchTerm
  );
  const { mutate } = useDeleteTodoMutation();

  const isNotFound = useMemo(
    () =>
      error instanceof AxiosError
        ? error.response?.status === HttpStatusCode.NotFound
        : false,
    [error]
  );

  console.log(isLoading);

  useEffect(() => {
    refetch();
  }, [page, refetch, searchTerm]);

  return (
    <Paper
      sx={{
        width: "100%",
        mb: 2,
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        borderRadius: "8px",
      }}
    >
      <TableContainer
        sx={{
          height: "705px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            fontWeight={700}
            fontSize="20px"
            sx={{ flexGrow: 1 }}
          >
            Todos
          </Typography>
          <TodoSearchBar setSearchTerm={setSearchTerm} />
          <InputFormModal refetch={refetch} />
        </Toolbar>
        <Table sx={{ minWidth: 650, maxHeight: 800 }} stickyHeader>
          <TableHead>
            <TableRow>
              {TABLE_HEADERS.map((header) => (
                <TableCell
                  key={header}
                  sx={{ fontWeight: 700, fontSize: "16px" }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && (
              <TableRow sx={{ height: 73 * 8 }}>
                <TableCell
                  colSpan={TABLE_HEADERS.length}
                  sx={{ height: "100%" }}
                  align="center"
                >
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
            {isNotFound ? (
              <TableRow sx={{ height: 73 * 8 }}>
                <TableCell
                  colSpan={TABLE_HEADERS.length}
                  sx={{ height: "100%" }}
                >
                  <Typography textAlign={"center"}>No todos found!</Typography>
                </TableCell>
              </TableRow>
            ) : (
              <TodoRows
                data={data?.todos ?? []}
                mutate={mutate}
                refetch={refetch}
              />
            )}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
      </TableContainer>
      <Box width={"100%"} mx={"auto"} display={"flex"} paddingY={"8px"}>
        <TodosTablePagination todosLength={data ? data.totalCount : 0} />
      </Box>
    </Paper>
  );
};

export default TodosTable;
