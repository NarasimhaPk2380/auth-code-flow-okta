import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { BadRequest } from "http-errors";
import logger from "../../loaders/logger";

export const joiValidation =
  (schema: Joi.ObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const errorsText = error.details.map((x) => x.message).join(", ");
      logger.error(errorsText);
      next(new BadRequest(`Validation error: ${errorsText}`));
    } else {
      next();
    }
  };
