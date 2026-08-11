import { Request, Response, NextFunction } from 'express';

// ─── Standard API response shapes ────────────────────────────────────────────

export interface ApiSuccess<T = unknown> {
  success: true;
  message: string;
  data?: T;
  meta?: PaginationMeta;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ─── Re-export Express handler types for convenience ─────────────────────────

export type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export type SyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
