import useGetTodosQuery from "../api/todo_service/getTodos";
import { Box, Container } from "@mui/material";
import TodosTable from "../components/TodoTable";
import { TODO_TYPE_ICONS } from "../constants/constants";

export interface Todo {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  type: keyof typeof TODO_TYPE_ICONS;
}

const TodosTablePage = () => {
  const { data: todos } = useGetTodosQuery();

  return (
    <Box
      padding={0}
      margin={0}
      height={`100vh`}
      width={`100vw`}
      sx={{
        background: `rgb(52,131,224)`,
        backgroundImage: `linear-gradient(0deg, rgba(52,131,224,1) 0%, rgba(255,255,255,1) 100%)`,
      }}
    >
      <Container maxWidth="xl">
        <TodosTable data={todos ?? []} />
      </Container>
    </Box>
  );
};

export default TodosTablePage;
