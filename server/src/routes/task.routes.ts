import { Router } from 'express';
import { authenticate, requireAdmin } from '../middlewares/authMiddleware';
import { asyncHandler } from '../middlewares/errorHandler';
import { getAllTasks, getTaskById, createTask, updateTask, deleteTask, completeTask } from '../controllers/task.controller';

const router = Router();

// Public routes
router.get('/', getAllTasks);
router.get('/:id', getTaskById);

// Admin routes
router.post('/', authenticate, requireAdmin, asyncHandler(createTask));
router.put('/:id', authenticate, requireAdmin, asyncHandler(updateTask));
router.delete('/:id', authenticate, requireAdmin, asyncHandler(deleteTask));

// User routes
router.post('/:id/complete', authenticate, asyncHandler(completeTask));

export default router; 