import Order from '../models/order.js';
import Cart from '../models/cart.js';
import { calculateOrderTotal } from '../services/order.service.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Create new order from cart
// @route   POST /api/orders
// @access  Private
export const createOrder = asyncHandler(async (req, res) => {
  const { shippingAddress, paymentMethod } = req.body;
  const userId = req.user ? req.user._id : '64f0b2f9e4b0e5a1b4c9e8d1';

  // Get user's cart
  const cart = await Cart.findOne({ user: userId });

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: 'No items in cart' });
  }

  // To build an order, we need prices. In MVP without full product integration, 
  // we might assign mock prices if they aren't available, but we'll simulate it:
  const orderItems = cart.items.map((item) => ({
    product: item.product,
    quantity: item.quantity,
    price: 100, // MOCK PRICE. Real prices will be fetched from the database when fully integrated.
  }));

  const totalAmount = await calculateOrderTotal(orderItems);

  const order = new Order({
    user: userId,
    items: orderItems,
    shippingAddress,
    paymentMethod: paymentMethod || 'mock-gateway',
    totalAmount,
  });

  const createdOrder = await order.save();

  // Clear cart after order creation
  cart.items = [];
  await cart.save();

  res.status(201).json(createdOrder);
});

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const userId = req.user ? req.user._id : '64f0b2f9e4b0e5a1b4c9e8d1';
  const orders = await Order.find({ user: userId });
  res.status(200).json(orders);
});

// @desc    Update order status
// @route   PATCH /api/orders/:id
// @access  Private (Admin or Owner)
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderStatus } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  // Add authorization checks here later (e.g., only Admin or User who created it can update)

  order.orderStatus = orderStatus;
  const updatedOrder = await order.save();

  res.status(200).json(updatedOrder);
});
