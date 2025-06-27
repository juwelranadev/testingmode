import { Router } from 'express';
import { authenticate, requireAdmin } from '../middlewares/authMiddleware';
import { asyncHandler } from '../middlewares/errorHandler';
import { getDashboardStats, getSystemSettings, updateSystemSettings } from '../controllers/admin.controller';

const router = Router();

// All admin routes require authentication and admin role
router.use(authenticate, requireAdmin);

// Dashboard
router.get('/dashboard', asyncHandler(getDashboardStats));

// System settings
router.get('/settings', asyncHandler(getSystemSettings));
router.put('/settings', asyncHandler(updateSystemSettings));

export default router; 