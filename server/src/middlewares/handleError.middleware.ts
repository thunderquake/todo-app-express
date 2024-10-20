import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/todos.errors";
import ErrorHandler from "../utils/todos.errors";

export const errorHandleMiddleware = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  ErrorHandler.handleError(err, res);
};
