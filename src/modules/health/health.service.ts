import config from '../../config';

export interface HealthStatus {
  status: 'ok' | 'degraded';
  environment: string;
  uptime: number;
  timestamp: string;
}

/**
 * Returns the current health status of the application.
 * Extend this to add DB ping checks, cache checks, etc.
 */
export function getHealthStatus(): HealthStatus {
  return {
    status: 'ok',
    environment: config.node_env,
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  };
}
