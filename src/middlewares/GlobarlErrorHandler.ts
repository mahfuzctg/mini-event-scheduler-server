import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../config";

import handleCastError from "../errors/HandleCastError";
import handleDuplicateError from "../errors/HandleDuplicateError";
import handleValidationError from "../errors/HandleValidationError";

import AppError from "../errors/AppError";
import HandleZodError from "../errors/HandleZodError";
import { TErrorSources } from "../interface/Error";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err?.statusCode);

  // Setting default values
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = HandleZodError(err as any);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [{ path: "", message: err.message }];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [{ path: "", message: err.message }];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });

  // next(); // Ensure proper middleware flow
};

export default globalErrorHandler;
