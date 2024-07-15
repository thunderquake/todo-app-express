import { TableRow, TableCell } from "@mui/material";
import { Todo } from "../pages/TodosTablePage";
import { TODO_TYPE_ICONS } from "../constants/constants";

interface TodoRowsProps {
  data: Todo[];
}

const TodoRows = ({ data }: TodoRowsProps) => {
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
          </TableRow>
        );
      })}
    </>
  );
};

export default TodoRows;
