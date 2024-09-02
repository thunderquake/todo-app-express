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
import { AxiosError, HttpStatusCode } from "axios";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useDeleteTodoMutation from "../api/todo_service/deleteTodo";
import useGetTodosQuery from "../api/todo_service/getTodos";
import { TABLE_HEADERS, TODO_TYPES } from "../constants/constants";
import { parseTodoTypes } from "../helpers/parseTodoTypes";
import { InputFormModal } from "./InputFormModal";
import TodoTypeModal from "./StatsTable";
import TodosTablePagination from "./TablePagination";
import TodoFilterMenu from "./TodoFilter";
import TodoRows from "./TodoRows";
import TodoSearchBar from "./TodoSearch";

const TodosTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || "1");
  const [searchTerm, setSearchTerm] = useState(searchParams.get("name") || "");
  const [types, setTypes] = useState<string[]>(
    (() => {
      const typeParam = searchParams.get("type");
      return typeParam === "[]"
        ? TODO_TYPES
        : typeParam
        ? parseTodoTypes(typeParam)
        : TODO_TYPES;
    })()
  );

  useEffect(() => {
    const hasParams = Array.from(searchParams.keys()).length > 0;

    if (!hasParams) {
      setSearchParams({
        page: "1",
        type: "[]",
      });
    }
  }, [searchParams, setSearchParams]);

  const { data, error, isFetching, refetch } = useGetTodosQuery(
    page,
    searchTerm,
    types
  );
  const { mutate } = useDeleteTodoMutation();

  const isNotFound = useMemo(
    () =>
      error instanceof AxiosError
        ? error.response?.status === HttpStatusCode.NotFound
        : false,
    [error]
  );

  useEffect(() => {
    refetch();
  }, [page, refetch, searchTerm, types]);

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
          <TodoTypeModal />
          <TodoFilterMenu setTypes={setTypes} />
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
            {isFetching ? (
              <TableRow sx={{ height: 73 * 8 }}>
                <TableCell
                  colSpan={TABLE_HEADERS.length}
                  sx={{ height: "100%" }}
                  align="center"
                >
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : isNotFound ? (
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
