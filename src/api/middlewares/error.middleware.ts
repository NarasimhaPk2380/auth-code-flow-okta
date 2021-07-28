import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";
import logger from "../../loaders/logger";

export class ErrorHandlerMiddleware {
  public isProduction = process.env.NODE_ENV || "development"; // default as development;
  public error(
    error: HttpError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    res.status(error.statusCode || 500);
    res.json({
      name: error.name,
      message: error.message,
      errors: error[`errors`] || [],
    });

    if (this.isProduction) {
      logger.error(error.name, error.message);
    } else {
      logger.error(error.name, error.stack);
    }
  }
}

export const ErrorHandlerInstance = new ErrorHandlerMiddleware();
