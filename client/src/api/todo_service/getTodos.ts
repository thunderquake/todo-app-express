import { useQuery } from "@tanstack/react-query";
import instance from "../apiInstance";
import { QUERY_KEYS } from "../../constants/constants";
import { Todo } from "../../pages/TodosTablePage";

const getTodos = async () => {
  const { data: result } = await instance.get<Todo[]>("/todos");
  return result;
};

const useGetTodosQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TODOS_QUERY],
    queryFn: getTodos,
  });
};

export default useGetTodosQuery;
