import { body } from 'express-validator';

export const orderValidator = {
  createOrder: [
    body('shippingAddress').notEmpty().withMessage('Shipping address is required'),
    body('shippingAddress.street').notEmpty().withMessage('Street is required'),
    body('shippingAddress.city').notEmpty().withMessage('City is required'),
    body('shippingAddress.state').notEmpty().withMessage('State is required'),
    body('shippingAddress.country').notEmpty().withMessage('Country is required'),
    body('shippingAddress.zipCode').notEmpty().withMessage('ZipCode is required'),
    body('paymentMethod').optional().isString(),
  ],
  updateStatus: [
    body('orderStatus')
      .notEmpty()
      .withMessage('Order status is required')
      .isIn(['processing', 'shipped', 'delivered', 'cancelled'])
      .withMessage('Invalid order status'),
  ],
};
