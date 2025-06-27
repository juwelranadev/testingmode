import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { validate, commonValidations } from '../middlewares/validate';
import { authenticate } from '../middlewares/authMiddleware';
import { asyncHandler } from '../middlewares/errorHandler';
import { register, login, getMe, logout } from '../controllers/auth.controller';

const router = Router();

// Register validation
const registerValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('username').isLength({ min: 3, max: 30 }).matches(/^[a-zA-Z0-9_]+$/),
];

// Login validation
const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
];

// Register route
router.post('/register', validate(registerValidation), asyncHandler(register));

// Login route
router.post('/login', validate(loginValidation), asyncHandler(login));

// Get current user
router.get('/me', authenticate, asyncHandler(getMe));

// Logout route
router.post('/logout', authenticate, asyncHandler(logout));

export default router; 