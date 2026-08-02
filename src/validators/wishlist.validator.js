import { body, param } from 'express-validator';

export const addToWishlistValidator = [
  body('productId').isMongoId().withMessage('Invalid product ID'),
];

export const removeFromWishlistValidator = [
  param('id').isMongoId().withMessage('Invalid wishlist item ID'),
];
