import morgan, { StreamOptions } from 'morgan';
import config from '../config';

// Pipe morgan output to console (works with any logger library too)
const stream: StreamOptions = {
  write: (message: string) => process.stdout.write(message),
};

// Use 'combined' format in production for richer logs; 'dev' otherwise
const format = config.node_env === 'production' ? 'combined' : 'dev';

const loggerMiddleware = morgan(format, { stream });

export default loggerMiddleware;
