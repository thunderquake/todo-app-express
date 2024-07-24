import { ITEMS_PER_PAGE } from "./../../constants/constants";
import { useQuery } from "@tanstack/react-query";
import instance from "../apiInstance";
import { QUERY_KEYS } from "../../constants/constants";
import { Todo } from "../../pages/TodosTablePage";

interface GetTodosParams {
  itemsPerPage: number;
  page: number;
}

const getTodos = async ({ itemsPerPage, page }: GetTodosParams) => {
  const { data: result } = await instance.get<Todo[]>("/todos", {
    params: {
      itemsPerPage,
      page,
    },
  });
  return result;
};

const useGetTodosQuery = (page: number = 1) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TODOS_QUERY, page],
    queryFn: () => getTodos({ itemsPerPage: ITEMS_PER_PAGE, page }),
  });
};

export default useGetTodosQuery;
