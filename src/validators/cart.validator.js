import { body } from 'express-validator';

export const cartValidator = {
  addItem: [
    body('productId')
      .notEmpty()
      .withMessage('Product ID is required')
      .isMongoId()
      .withMessage('Invalid Product ID'),
    body('quantity')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Quantity must be an integer greater than 0'),
  ],
  updateItem: [
    body('quantity')
      .notEmpty()
      .withMessage('Quantity is required')
      .isInt({ min: 1 })
      .withMessage('Quantity must be an integer greater than 0'),
  ],
};
