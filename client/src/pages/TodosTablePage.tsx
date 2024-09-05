import { Box, Container } from "@mui/material";
import TodosTable from "../components/TodoTable";
import { TODO_TYPE_ICONS } from "../constants/constants";

export interface Todo {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  type: keyof typeof TODO_TYPE_ICONS;
}

const TodosTablePage = () => {
  return (
    <Box
      padding={0}
      margin={0}
      position={"fixed"}
      height={`100%`}
      width={`100%`}
      left={0}
      top={0}
      overflow={"hidden"}
      sx={{
        background: `rgb(52,131,224)`,
        backgroundImage: `linear-gradient(0deg, rgba(52,131,224,1) 0%, rgba(255,255,255,1) 100%)`,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{ minHeight: "100%", marginY: "auto", alignItems: "center" }}
      >
        <TodosTable />
      </Container>
    </Box>
  );
};

export default TodosTablePage;
