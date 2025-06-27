import { Request, Response } from 'express';
import Payment from '../models/Payment';
import User from '../models/User';

export const getPayments = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const [payments, total] = await Promise.all([
    Payment.find({ userId: req.user?.userId }).skip(skip).limit(limit),
    Payment.countDocuments({ userId: req.user?.userId }),
  ]);

  return res.status(200).json({
    success: true,
    data: {
      payments,
      pagination: {
        page,
        limit,
        total,
      },
    },
  });
};

export const withdraw = async (req: Request, res: Response) => {
  const { amount, walletAddress } = req.body;
  if (!amount || !walletAddress) {
    return res.status(400).json({ success: false, message: 'Amount and wallet address are required' });
  }
  if (amount <= 0) {
    return res.status(400).json({ success: false, message: 'Amount must be greater than 0' });
  }
  const user = await User.findById(req.user?.userId);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  if (user.balance < amount) {
    return res.status(400).json({ success: false, message: 'Insufficient balance' });
  }
  const payment = await Payment.create({
    userId: req.user?.userId,
    type: 'withdrawal',
    amount,
    currency: 'TON',
    method: 'ton_wallet',
    walletAddress,
    description: `Withdrawal to ${walletAddress}`,
    status: 'pending',
  });
  user.balance -= amount;
  user.totalWithdrawn += amount;
  await user.save();
  return res.status(200).json({
    success: true,
    message: 'Withdrawal request submitted successfully',
    data: { payment },
  });
};

export const deposit = async (req: Request, res: Response) => {
  const { amount } = req.body;
  if (!amount) {
    return res.status(400).json({ success: false, message: 'Amount is required' });
  }
  if (amount <= 0) {
    return res.status(400).json({ success: false, message: 'Amount must be greater than 0' });
  }
  const user = await User.findById(req.user?.userId);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  const payment = await Payment.create({
    userId: req.user?.userId,
    type: 'deposit',
    amount,
    currency: 'TON',
    method: 'ton_wallet',
    description: 'Deposit to account',
    status: 'completed',
  });
  user.balance += amount;
  user.totalEarned += amount;
  await user.save();
  return res.status(200).json({
    success: true,
    message: 'Deposit processed successfully',
    data: { payment },
  });
}; 