import { body, param } from 'express-validator';

export const createCategoryValidator = [
  body('name').notEmpty().withMessage('Category name is required'),
];

export const updateCategoryValidator = [
  param('id').isMongoId().withMessage('Invalid category ID'),
  body('name').optional().notEmpty().withMessage('Category name cannot be empty'),
];

export const categoryIdValidator = [
  param('id').isMongoId().withMessage('Invalid category ID'),
];
