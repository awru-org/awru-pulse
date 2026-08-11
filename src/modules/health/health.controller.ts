import { Request, Response, NextFunction } from 'express';
import { getHealthStatus } from './health.service';
import { sendSuccess } from '../../utils/response.util';

/**
 * GET /api/v1/health
 * Returns server health information.
 */
export async function healthCheck(
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const status = getHealthStatus();
  sendSuccess(res, 'Server is healthy', status);
}
