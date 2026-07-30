import { body, param } from 'express-validator';

export const updateProfileValidator = [
  body('name').optional().isLength({ max: 50 }).withMessage('Name cannot exceed 50 characters'),
  body('email').optional().isEmail().withMessage('Please provide a valid email'),
  body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

export const deleteUserValidator = [
  param('id').isMongoId().withMessage('Invalid user ID'),
];
