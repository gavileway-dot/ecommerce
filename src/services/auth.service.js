import User from '../models/user.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import sendEmail from './email.service.js';

export const registerUser = async ({ name, email, password, role }) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    const error = new Error('User already exists');
    error.statusCode = 400;
    throw error;
  }

  const user = await User.create({ name, email, password, role });
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    };
  } else {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }
};

export const forgotPassword = async ({ email }, protocol, host) => {
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error('There is no user with that email');
    error.statusCode = 404;
    throw error;
  }

  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${protocol}://${host}/api/auth/reset-password/${resetToken}`;
  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a POST request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message,
    });
  // eslint-disable-next-line no-unused-vars
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    const emailError = new Error('Email could not be sent');
    emailError.statusCode = 500;
    throw emailError;
  }
};

export const resetPassword = async (resettoken, password) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    const error = new Error('Invalid token');
    error.statusCode = 400;
    throw error;
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  };
};
