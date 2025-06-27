import { Request, Response } from 'express';
import Task from '../models/Task';
import User from '../models/User';

export const getAllTasks = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const [tasks, total] = await Promise.all([
    Task.find().skip(skip).limit(limit),
    Task.countDocuments(),
  ]);

  return res.status(200).json({
    success: true,
    data: {
      tasks,
      pagination: {
        page,
        limit,
        total,
      },
    },
  });
};

export const getTaskById = async (req: Request, res: Response) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
  return res.status(200).json({ success: true, data: { task } });
};

export const createTask = async (req: Request, res: Response) => {
  const task = await Task.create(req.body);
  return res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: { task },
  });
};

export const updateTask = async (req: Request, res: Response) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
  return res.status(200).json({
    success: true,
    message: 'Task updated successfully',
    data: { task },
  });
};

export const deleteTask = async (req: Request, res: Response) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
  return res.status(200).json({
    success: true,
    message: 'Task deleted successfully',
  });
};

export const completeTask = async (req: Request, res: Response) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
  if (!task.isActive) return res.status(400).json({ success: false, message: 'Task is not active' });
  if (task.maxCompletions && task.currentCompletions >= task.maxCompletions) {
    return res.status(400).json({ success: false, message: 'Task has reached maximum completions' });
  }
  
  const user = await User.findById(req.user?.userId);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  
  task.currentCompletions += 1;
  await task.save();
  
  user.balance += task.reward;
  user.totalEarned += task.reward;
  await user.save();
  
  return res.status(200).json({
    success: true,
    message: 'Task completed successfully',
    data: {
      reward: task.reward,
      newBalance: user.balance,
    },
  });
}; 