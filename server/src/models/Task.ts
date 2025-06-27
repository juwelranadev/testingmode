import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'one_time' | 'referral' | 'social_media';
  reward: number;
  requirements: {
    type: string;
    value: any;
  }[];
  isActive: boolean;
  maxCompletions?: number;
  currentCompletions: number;
  startDate?: Date;
  endDate?: Date;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number; // in minutes
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500,
  },
  type: {
    type: String,
    enum: ['daily', 'weekly', 'one_time', 'referral', 'social_media'],
    required: true,
  },
  reward: {
    type: Number,
    required: true,
    min: 0,
  },
  requirements: [{
    type: {
      type: String,
      required: true,
    },
    value: Schema.Types.Mixed,
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
  maxCompletions: {
    type: Number,
    min: 1,
  },
  currentCompletions: {
    type: Number,
    default: 0,
    min: 0,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'easy',
  },
  estimatedTime: {
    type: Number,
    default: 5,
    min: 1,
  },
}, {
  timestamps: true,
});

// Indexes
taskSchema.index({ type: 1, isActive: 1 });
taskSchema.index({ category: 1 });
taskSchema.index({ difficulty: 1 });
taskSchema.index({ startDate: 1, endDate: 1 });

// Virtual for completion percentage
taskSchema.virtual('completionPercentage').get(function() {
  if (!this.maxCompletions) return 0;
  return Math.round((this.currentCompletions / this.maxCompletions) * 100);
});

// Virtual for availability
taskSchema.virtual('isAvailable').get(function() {
  const now = new Date();
  
  if (!this.isActive) return false;
  if (this.startDate && now < this.startDate) return false;
  if (this.endDate && now > this.endDate) return false;
  if (this.maxCompletions && this.currentCompletions >= this.maxCompletions) return false;
  
  return true;
});

export default mongoose.model<ITask>('Task', taskSchema); 