import { Response } from "express";
import { StatusCodes } from "http-status-codes";

interface IError {
  name?: string;
  httpCode: StatusCodes;
  message: string;
}

export class HttpError extends Error {
  public readonly name: string;
  public readonly httpCode: StatusCodes;

  constructor(args: IError) {
    super(args.message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = args.name || "Error";
    this.httpCode = args.httpCode;

    Error.captureStackTrace(this);
  }
}

class ErrorHandler {
  public handleError(error: Error | HttpError, res: Response) {
    if (error instanceof HttpError) {
      return res
        .status(error.httpCode)
        .json({ name: error.name, message: error.message });
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ name: error.name, message: error.message });
  }
}

export default new ErrorHandler();
