import { ITEMS_PER_PAGE } from "./../../constants/constants";
import { useQuery } from "@tanstack/react-query";
import instance from "../apiInstance";
import { QUERY_KEYS } from "../../constants/constants";
import { Todo } from "../../pages/TodosTablePage";

export interface GetTodosResponse {
  todos: Todo[];
  totalCount: number;
}

const getTodos = async (
  page: number,
  searchTerm: string,
  types: string[]
): Promise<GetTodosResponse> => {
  const { data } = await instance.get<GetTodosResponse>("/todos", {
    params: {
      itemsPerPage: ITEMS_PER_PAGE,
      page,
      name: searchTerm,
      types: types,
    },
  });
  return data;
};

const useGetTodosQuery = (
  page: number,
  searchTerm: string,
  types: string[]
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TODOS_QUERY, page],
    queryFn: () => getTodos(page, searchTerm, types),
  });
};

export default useGetTodosQuery;
