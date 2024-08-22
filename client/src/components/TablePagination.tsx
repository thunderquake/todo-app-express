import { ITEMS_PER_PAGE } from "../constants/constants";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "@mui/material";

interface TablePaginationProps {
  todosLength: number;
}

const TodosTablePagination: React.FC<TablePaginationProps> = ({
  todosLength,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || "1");

  const pageCount = Math.ceil(todosLength / ITEMS_PER_PAGE);
  const handleChangePage = (newPage: number) => {
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      params.set("page", newPage.toString());
      return params;
    });
  };

  return (
    <Pagination
      count={pageCount}
      page={page}
      onChange={(_, page) => handleChangePage(page)}
      showFirstButton
      showLastButton
      siblingCount={2}
      sx={{ marginX: "auto" }}
      size="large"
    />
  );
};

export default TodosTablePagination;
