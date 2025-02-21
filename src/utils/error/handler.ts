import { Request, Response, NextFunction } from "express";
import { AuthorizeError, NotFoundError, ValidationError } from "./errors";
import { logger } from "../logger";

export const HandleErrorWithLogger = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let reportError = true;
  let status = 500;
  let data = error.message;

  if (
    error instanceof NotFoundError ||
    error instanceof ValidationError ||
    error instanceof AuthorizeError
  ) {
    reportError = false;
    status = error.status || 500;
  }

  if (reportError) {
    logger.error(error);
  } else {
    logger.warn(error);
  }

  res.status(status).json({ error: data });
};