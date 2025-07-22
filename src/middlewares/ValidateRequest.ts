import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import catchAsync from "../utils/CatchAsync";

const validateRequest = (schema: ZodTypeAny) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log("inside validation", req.body);
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });

    next();
  });
};

export default validateRequest;
