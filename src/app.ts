import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import loggerMiddleware from './middlewares/logger.middleware';
import { globalErrorHandler, notFoundHandler } from './middlewares/error.middleware';
import apiRouter from './routes';
import config from './config';
import GmailRouter from './modules/gmail/gmail.route';


function createApp(): Application {
  const app = express();

  app.use(helmet());

  app.use(
    cors({
      origin: config.allowedOrigins,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(loggerMiddleware);

  app.use('/api/v1', apiRouter);
  app.use('/api/v1/gmail', GmailRouter)

  app.use(notFoundHandler);
  app.use(globalErrorHandler);

  return app;
}

export default createApp;
