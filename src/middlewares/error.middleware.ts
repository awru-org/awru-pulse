import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response.util';

// ─── Custom application error class ──────────────────────────────────────────

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, this.constructor);
  }
}

// ─── 404 handler — mount AFTER all routes ────────────────────────────────────

export function notFoundHandler(req: Request, res: Response): void {
  sendError(res, `Route not found: ${req.method} ${req.originalUrl}`, 404);
}

// ─── Global error handler ─────────────────────────────────────────────────────

export function globalErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    sendError(res, err.message, err.statusCode);
    return;
  }

  // Log unexpected errors to the console
  console.error('[Unhandled Error]', err);

  sendError(res, 'Internal server error', 500);
}
