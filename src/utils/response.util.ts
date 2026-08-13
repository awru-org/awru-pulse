import { Response } from 'express';
import { ApiError, ApiSuccess, PaginationMeta } from '../types';

export function sendSuccess<T>(
  res: Response,
  message: string,
  data?: T,
  statusCode = 200,
  meta?: PaginationMeta
): void {
  const body: ApiSuccess<T> = { success: true, message };
  if (data !== undefined) body.data = data;
  if (meta) body.meta = meta;

  res.status(statusCode).json(body);
}


export function sendError(
  res: Response,
  message: string,
  statusCode = 500,
  errors?: Record<string, string[]>
): void {
  const body: ApiError = { success: false, message };
  if (errors) body.errors = errors;

  res.status(statusCode).json(body);
}
