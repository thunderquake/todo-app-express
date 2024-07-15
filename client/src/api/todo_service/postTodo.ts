import { Todo } from "./../../pages/TodosTablePage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "../apiInstance";
import { QUERY_KEYS } from "../../constants/constants";

interface ResultMessage {
  message: string;
}

const postTodo = async (todo: Todo): Promise<ResultMessage> => {
  const { data } = await instance.post<ResultMessage>("/todos", todo);
  return data;
};

const usePostTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postTodo,
    mutationKey: [QUERY_KEYS.POST_TODO_QUERY],
    onSuccess: (data) => {
      console.log("Success:", data);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_TODOS_QUERY] });
    },
    onError: (error) => {
      console.error("Error:", error.message);
      alert("There was an error adding the todo.");
    },
  });
};

export default usePostTodoMutation;
