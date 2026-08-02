import Payment from '../models/payment.js';
import Order from '../models/order.js';
import { mockPaymentService } from '../services/payment.service.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Process payment for an order
// @route   POST /api/payments
// @access  Private
export const processPayment = asyncHandler(async (req, res) => {
  const { orderId } = req.body;
  const userId = req.user ? req.user._id : '64f0b2f9e4b0e5a1b4c9e8d1';

  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  if (order.user.toString() !== userId.toString()) {
    return res.status(403).json({ message: 'Not authorized to pay for this order' });
  }

  if (order.paymentStatus === 'paid') {
    return res.status(400).json({ message: 'Order is already paid' });
  }

  // Call mock payment gateway
  const paymentResult = await mockPaymentService.processPayment(order.totalAmount);

  // Save payment record
  const payment = new Payment({
    user: userId,
    order: orderId,
    transactionId: paymentResult.transactionId || `failed_${Date.now()}`,
    amount: order.totalAmount,
    status: paymentResult.status,
  });

  await payment.save();

  if (paymentResult.success) {
    order.paymentStatus = 'paid';
    await order.save();
    return res.status(200).json({ message: 'Payment successful', payment });
  } else {
    order.paymentStatus = 'failed';
    await order.save();
    return res.status(400).json({ message: 'Payment failed', error: paymentResult.error, payment });
  }
});
