import { useMutation } from "@tanstack/react-query";
import instance from "../apiInstance";
import { QUERY_KEYS } from "../../constants/constants";
import { IFormInput } from "../../components/InputFormModal";

export interface ResultMessage {
  message: string;
}

const editTodo = async ({
  todo,
  id,
}: {
  todo: IFormInput;
  id: string;
}): Promise<ResultMessage> => {
  const { data } = await instance.patch<ResultMessage>(`/todos/${id}`, todo);
  return data;
};

const useEditTodoMutation = () => {
  return useMutation({
    mutationFn: editTodo,
    mutationKey: [QUERY_KEYS.EDIT_TODO_QUERY],
    onSuccess: (data) => {
      console.log("Success:", data);
    },
    onError: (error) => {
      console.error("Error:", error.message);
      alert("There was an error editing the todo.");
    },
  });
};

export default useEditTodoMutation;
