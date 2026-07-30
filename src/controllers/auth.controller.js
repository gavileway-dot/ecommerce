import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';

// Logic for POST /register
export const registerUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ email, password, role });
    res.status(201).json({
      _id: user._id,
      email: user.email,
      role: user.role,
      token: generateToken(user._id), // Gives the new user an ID token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logic for POST /login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // Checks if user exists and if the password matches the scrambled one in DB
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};
