import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import { asyncHandler } from '../middlewares/errorHandler';
import { getPayments, withdraw, deposit } from '../controllers/payment.controller';

const router = Router();

// All payment routes require authentication
router.use(authenticate);

// Get user payments
router.get('/', asyncHandler(getPayments));

// Request withdrawal
router.post('/withdraw', asyncHandler(withdraw));

// Process deposit
router.post('/deposit', asyncHandler(deposit));

export default router; 