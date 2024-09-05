import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/constants";
import instance from "../apiInstance";

export interface TodoStatisticsResponse {
  [type: string]: number;
}

const getTodoStatistics = async (): Promise<TodoStatisticsResponse> => {
  const { data } = await instance.get<TodoStatisticsResponse>("/todos/stats");
  return data;
};

const useGetTodoStatisticsQuery = () => {
  return useQuery<TodoStatisticsResponse>({
    queryKey: [QUERY_KEYS.GET_TODO_STATS_QUERY],
    queryFn: getTodoStatistics,
  });
};

export default useGetTodoStatisticsQuery;
