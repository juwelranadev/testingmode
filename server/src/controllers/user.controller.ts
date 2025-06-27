import { Request, Response } from 'express';
import User from '../models/User';

export const getAllUsers = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find().skip(skip).limit(limit).select('-password'),
    User.countDocuments(),
  ]);

  return res.status(200).json({
    success: true,
    data: {
      users,
      pagination: {
        page,
        limit,
        total,
      },
    },
  });
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  return res.status(200).json({ success: true, data: { user } });
};

export const updateUser = async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).select('-password');
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  return res.status(200).json({ success: true, message: 'User updated successfully', data: { user } });
};

export const deleteUser = async (req: Request, res: Response) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  return res.status(200).json({ success: true, message: 'User deleted successfully' });
};

export const getProfile = async (req: Request, res: Response) => {
  const user = await User.findById(req.user?.userId).select('-password');
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  return res.status(200).json({ success: true, data: { user } });
};

export const updateProfile = async (req: Request, res: Response) => {
  const { username, email, telegramUsername, walletAddress } = req.body;
  const user = await User.findById(req.user?.userId);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  if (username) user.username = username;
  if (email) user.email = email;
  if (telegramUsername) user.telegramUsername = telegramUsername;
  if (walletAddress) user.walletAddress = walletAddress;
  await user.save();
  return res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: { user },
  });
};

export const getLeaderboard = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find().select('username totalEarned totalWithdrawn balance createdAt').sort({ totalEarned: -1 }).skip(skip).limit(limit),
    User.countDocuments(),
  ]);

  res.status(200).json({
    success: true,
    data: {
      users,
      pagination: {
        page,
        limit,
        total,
      },
    },
  });
}; 