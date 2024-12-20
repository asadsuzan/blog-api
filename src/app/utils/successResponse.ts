import { Response } from 'express';

interface SuccessResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
}

const sendSuccessResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T,
): Response<SuccessResponse<T>> => {
  return res.status(statusCode).json({
    success: true,
    message,
    statusCode,
    data,
  });
};

export default sendSuccessResponse;
