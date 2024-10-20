import { ResultMessage } from "./postTodo";
import instance from "../apiInstance";
import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/constants";

const deleteTodo = async (id: string): Promise<ResultMessage> => {
  const { data } = await instance.delete<ResultMessage>(`/todos/${id}`);
  return data;
};

const useDeleteTodoMutation = () => {
  return useMutation({
    mutationFn: deleteTodo,
    mutationKey: [QUERY_KEYS.DELETE_TODO_QUERY],
    onSuccess: (data) => {
      console.log("Success:", data);
    },
    onError: (error) => {
      console.error("Error:", error.message);
      alert("There was an error deleting the todo.");
    },
  });
};

export default useDeleteTodoMutation;
