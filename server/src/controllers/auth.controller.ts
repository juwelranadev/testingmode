import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { generateToken } from '../utils/jwt';

export const register = async (req: Request, res: Response) => {
  const { username, email, password, telegramUsername, walletAddress } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  // Create new user
  const user = await User.create({
    username,
    email,
    password,
    telegramUsername,
    walletAddress,
    role: 'user',
    balance: 0,
    totalEarned: 0,
    totalWithdrawn: 0,
    isActive: true,
    lastLogin: new Date(),
  });

  // Generate JWT token
  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        balance: user.balance,
      },
      token,
    },
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  // Update last login
  user.lastLogin = new Date();
  await user.save();

  // Generate JWT token
  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        balance: user.balance,
      },
      token,
    },
  });
};

export const getMe = async (req: Request, res: Response) => {
  // TODO: Implement get current user logic
  res.status(200).json({
    success: true,
    data: {
      user: {
        id: req.user?.userId,
        email: 'temp@example.com',
        username: 'temp-username',
      },
    },
  });
};

export const logout = async (req: Request, res: Response) => {
  // TODO: Implement logout logic (blacklist token)
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
}; 