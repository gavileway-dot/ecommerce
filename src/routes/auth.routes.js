import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller.js';

const router = express.Router();

// When someone sends data to /register, use the registerUser logic
router.post('/register', registerUser);
// When someone sends data to /login, use the loginUser logic
router.post('/login', loginUser);

export default router;