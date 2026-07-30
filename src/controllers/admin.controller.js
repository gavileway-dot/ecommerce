import Order from '../models/order.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all orders (Admin dashboard)
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getDashboardStats = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, order) => {
    return order.paymentStatus === 'paid' ? acc + order.totalAmount : acc;
  }, 0);

  // In a real scenario, you'd aggregate more stats (e.g. users, products) 
  // but this endpoint currently focuses only on transactions.
  
  res.status(200).json({
    totalOrders,
    totalRevenue,
    orders, // Returning all orders for MVP dashboard view
  });
});
