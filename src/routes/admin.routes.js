import express from 'express';
import { getDashboardStats } from '../controllers/admin.controller.js';
// import { protect, admin } from '../middlewares/auth.middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Administrator API
 */

/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Dashboard stats including total orders and revenue
 */

// router.use(protect, admin);

router.get('/dashboard', getDashboardStats);

export default router;
