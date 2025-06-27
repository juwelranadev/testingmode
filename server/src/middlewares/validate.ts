import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain, ValidationError } from 'express-validator';
import { createError } from './errorHandler';

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Run all validations
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const errorMessages = errors.array().map((error: ValidationError) => ({
      field: (error as any).path || error.type,
      message: error.msg,
      value: (error as any).value || undefined,
    }));

    const error = createError('Validation failed', 400);
    res.status(400).json({
      success: false,
      error: {
        message: 'Validation failed',
        details: errorMessages,
      },
    });
  };
};

// Common validation rules
export const commonValidations = {
  email: {
    in: ['body'],
    isEmail: {
      errorMessage: 'Please provide a valid email address',
    },
    normalizeEmail: true,
  },
  password: {
    in: ['body'],
    isLength: {
      options: { min: 6 },
      errorMessage: 'Password must be at least 6 characters long',
    },
  },
  username: {
    in: ['body'],
    isLength: {
      options: { min: 3, max: 30 },
      errorMessage: 'Username must be between 3 and 30 characters',
    },
    matches: {
      options: /^[a-zA-Z0-9_]+$/,
      errorMessage: 'Username can only contain letters, numbers, and underscores',
    },
  },
  objectId: {
    in: ['params', 'body'],
    isMongoId: {
      errorMessage: 'Invalid ID format',
    },
  },
  amount: {
    in: ['body'],
    isFloat: {
      options: { min: 0 },
      errorMessage: 'Amount must be a positive number',
    },
  },
}; 