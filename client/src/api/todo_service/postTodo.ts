import { Todo } from "./../../pages/TodosTablePage";
import { useMutation } from "@tanstack/react-query";
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
  return useMutation({
    mutationFn: postTodo,
    mutationKey: [QUERY_KEYS.POST_TODO_QUERY],
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};

export default usePostTodoMutation;
