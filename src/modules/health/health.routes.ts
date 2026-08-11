import { Router } from 'express';
import { healthCheck } from './health.controller';

const router = Router();

// GET /api/v1/health
router.get('/', healthCheck);

export default router;
