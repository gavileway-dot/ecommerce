import asyncHandler from '../utils/asyncHandler.js';
import * as authService from '../services/auth.service.js';

export const registerUser = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);
  res.status(201).json(result);
});

export const loginUser = asyncHandler(async (req, res) => {
  const result = await authService.loginUser(req.body);
  res.json(result);
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  await authService.forgotPassword(req.body, req.protocol, req.get('host'));
  res.status(200).json({ message: 'Email sent' });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const result = await authService.resetPassword(req.params.resettoken, req.body.password);
  res.status(200).json(result);
});
