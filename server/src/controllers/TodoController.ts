import { Request, Response } from "express";
import { TodoBody, UpdateTodoBody } from "../types/todoTypes";
import {
  createTodoService,
  deleteTodoService,
  editTodoService,
  getTodosService,
  getTodoStatisticsService,
} from "../services/TodoService";
import { StatusCodes } from "http-status-codes";
import { ERROR_MESSAGES } from "../constants/constants";

export const getTodos = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const itemsPerPage = Number(req.query.itemsPerPage) || 10;
    const page = Number(req.query.page) || 1;
    const name = (req.query.name as string) || "";
    const types = (req.query.types as string[]) || [];

    const result = await getTodosService({
      itemsPerPage,
      page,
      name,
      types,
    });

    if (result.todos.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: ERROR_MESSAGES.TODOS_NOT_FOUND });
    }
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGES.TODOS_NOT_FOUND });
  }
};

export const getTodoStatistics = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const statistics = await getTodoStatisticsService();

    return res.status(200).json(statistics);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving TODO statistics" });
  }
};

export const createTodo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, description, type }: TodoBody = req.body;
    const result = await createTodoService({ name, description, type });
    return res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: ERROR_MESSAGES.TODO_CREATION_FAILED,
    });
  }
};

export const editTodo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const enteredValues: UpdateTodoBody = req.body;
    const uuid = req.params.id;
    const result = await editTodoService(uuid, enteredValues);
    return res.status(StatusCodes.ACCEPTED).json(result);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: ERROR_MESSAGES.TODO_UPDATE_FAILED,
    });
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const uuid = req.params.id;
    const result = await deleteTodoService(uuid);
    return res.status(StatusCodes.NO_CONTENT).json(result);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: ERROR_MESSAGES.TODO_DELETION_FAILED,
    });
  }
};
