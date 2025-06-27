import { Request, Response } from 'express';
import User from '../models/User';
import Task from '../models/Task';
import Payment from '../models/Payment';
import Settings from '../models/Settings';

export const getDashboardStats = async (req: Request, res: Response) => {
  const [
    totalUsers,
    activeUsers,
    totalTasks,
    activeTasks,
    totalPayments,
    totalEarned,
    totalWithdrawn,
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ lastLogin: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }),
    Task.countDocuments(),
    Task.countDocuments({ isActive: true }),
    Payment.countDocuments(),
    User.aggregate([{ $group: { _id: null, total: { $sum: '$totalEarned' } } }]),
    User.aggregate([{ $group: { _id: null, total: { $sum: '$totalWithdrawn' } } }]),
  ]);

  res.status(200).json({
    success: true,
    data: {
      stats: {
        totalUsers,
        activeUsers,
        totalTasks,
        activeTasks,
        totalPayments,
        totalEarned: totalEarned[0]?.total || 0,
        totalWithdrawn: totalWithdrawn[0]?.total || 0,
      },
    },
  });
};

export const getSystemSettings = async (req: Request, res: Response) => {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({
      maintenanceMode: false,
      registrationEnabled: true,
      maxTasksPerUser: 10,
      minWithdrawalAmount: 0.001,
      maxWithdrawalAmount: 1000,
      taskRewardMultiplier: 1,
    });
  }
  res.status(200).json({ success: true, data: { settings } });
};

export const updateSystemSettings = async (req: Request, res: Response) => {
  const settings = await Settings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
  res.status(200).json({
    success: true,
    message: 'System settings updated successfully',
    data: { settings },
  });
}; 