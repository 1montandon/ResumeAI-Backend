import type { NextFunction, Request, Response } from 'express';
import HttpError from '../error/error.ts';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: 'error',
      message: err.message,
    });

    return;
  }

  res.status(500).json({
    status: 'error',
    message: 'Erro interno do servidor',
  });
}
