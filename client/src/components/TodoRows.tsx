import { TableRow, TableCell, IconButton } from "@mui/material";
import { Todo } from "../pages/TodosTablePage";
import { TODO_TYPE_ICONS } from "../constants/constants";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  QueryObserverResult,
  RefetchOptions,
  UseMutateFunction,
} from "@tanstack/react-query";
import { ResultMessage } from "../api/todo_service/postTodo";
import { GetTodosResponse } from "../api/todo_service/getTodos";

interface TodoRowsProps {
  data: Todo[];
  mutate: UseMutateFunction<ResultMessage, Error, string, unknown>;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<GetTodosResponse, Error>>;
}

const TodoRows = ({ data, mutate, refetch }: TodoRowsProps) => {
  const handleDelete = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        refetch();
      },
      onError: (error) => {
        console.error("There was an error: ", error);
      },
    });
  };

  return (
    <>
      {data.map((todo: Todo) => {
        const IconComponent = TODO_TYPE_ICONS[todo.type];
        return (
          <TableRow
            key={todo.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            hover
          >
            <TableCell>{IconComponent && <IconComponent />}</TableCell>
            <TableCell component="th" scope="row">
              {todo.name}
            </TableCell>
            <TableCell>{todo.description}</TableCell>
            <TableCell>
              {new Date(todo.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {new Date(todo.updated_at).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <IconButton color="primary" onClick={() => handleDelete(todo.id)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
};

export default TodoRows;
