import { Response } from "express";

type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  meta?: TMeta;
  data: T;
};

const sendResponse = <T>(res: Response, payload: TResponse<T>): void => {
  const { statusCode, success, message, meta, data } = payload;

  res.status(statusCode).json({
    success,
    message,
    meta,
    data,
  });
};

export default sendResponse;
