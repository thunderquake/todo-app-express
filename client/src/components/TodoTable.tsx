import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { TABLE_HEADERS } from "../constants/constants";
import useGetTodosQuery from "../api/todo_service/getTodos";
import TodoRows from "./TodoRows";

import { InputFormModal } from "./InputFormModal";

const TodosTable = () => {
  const { data: todos, refetch } = useGetTodosQuery();
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", borderRadius: "4px" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            fontWeight={700}
            fontSize={"20px"}
            sx={{ flexGrow: 1 }}
          >
            Todos
          </Typography>
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
            <TodoRows data={todos ?? []} />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TodosTable;
