import { Request, Response, NextFunction } from 'express';
import { BaseError } from '@/shared/errors/BaseError';
import { HttpStatusCodes } from '@/shared/utils/httpStatusCodes';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(`[ERROR] ${err.name}: ${err.message}`);

  if (err instanceof BaseError) {
    res.status(err.statusCode).json({ error: err.message });
  }
  // Error no esperado
  res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error interno del servidor' });
}