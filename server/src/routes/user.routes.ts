import { Router } from 'express';
import { authenticate, requireAdmin } from '../middlewares/authMiddleware';
import { asyncHandler } from '../middlewares/errorHandler';
import { getAllUsers, getUserById, updateUser, deleteUser, getProfile, updateProfile, getLeaderboard } from '../controllers/user.controller';

const router = Router();

// Admin routes
router.get('/', authenticate, requireAdmin, asyncHandler(getAllUsers));
router.get('/:id', authenticate, requireAdmin, asyncHandler(getUserById));
router.put('/:id', authenticate, requireAdmin, asyncHandler(updateUser));
router.delete('/:id', authenticate, requireAdmin, asyncHandler(deleteUser));

// User routes
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.get('/leaderboard', getLeaderboard);

export default router; 