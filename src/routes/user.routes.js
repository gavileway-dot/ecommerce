import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
} from '../controllers/user.controller.js';
import { protect, admin } from '../middlewares/auth.middleware.js';
import validate from '../middlewares/validate.middleware.js';
import { updateProfileValidator, deleteUserValidator } from '../validators/user.validator.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

router.use(protect);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User profile updated successfully
 */
router
  .route('/profile')
  .get(getUserProfile)
  .put(updateProfileValidator, validate, updateUserProfile);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 */
router
  .route('/')
  .get(admin, getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User removed
 */
router
  .route('/:id')
  .delete(admin, deleteUserValidator, validate, deleteUser);

export default router;
