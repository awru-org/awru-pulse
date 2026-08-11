import { Router } from 'express';
import healthRouter from '../modules/health/health.routes';

/**
 * Central API router — v1
 *
 * Mount all feature module routers here.
 * Each import follows the pattern:
 *   import <name>Router from '../modules/<name>/<name>.routes';
 *   router.use('/<name>', <name>Router);
 */

const router = Router();

router.use('/health', healthRouter);

// 👉 Add more module routers below as the app grows, e.g.:
// import usersRouter from '../modules/users/users.routes';
// router.use('/users', usersRouter);

export default router;
