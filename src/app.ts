import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import loggerMiddleware from './middlewares/logger.middleware';
import { globalErrorHandler, notFoundHandler } from './middlewares/error.middleware';
import apiRouter from './routes';
import config from './config';

/**
 * Application factory — creates and configures the Express app.
 * Kept separate from server.ts so the app can be imported in tests
 * without binding to a port.
 */
function createApp(): Application {
  const app = express();

  // ── Security headers ────────────────────────────────────────────────────────
  app.use(helmet());

  // ── CORS ────────────────────────────────────────────────────────────────────
  app.use(
    cors({
      origin: config.allowedOrigins,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    })
  );

  // ── Body parsing ────────────────────────────────────────────────────────────
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // ── HTTP request logging ────────────────────────────────────────────────────
  app.use(loggerMiddleware);

  // ── API routes ──────────────────────────────────────────────────────────────
  app.use('/api/v1', apiRouter);

  // ── 404 & global error handlers (always last) ───────────────────────────────
  app.use(notFoundHandler);
  app.use(globalErrorHandler);

  return app;
}

export default createApp;
