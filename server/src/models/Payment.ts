import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
  userId: Schema.Types.ObjectId;
  type: 'deposit' | 'withdrawal' | 'reward' | 'bonus' | 'referral';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  method: 'ton_wallet' | 'bank_transfer' | 'crypto' | 'system';
  transactionId?: string;
  walletAddress?: string;
  description: string;
  metadata?: Record<string, any>;
  processedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['deposit', 'withdrawal', 'reward', 'bonus', 'referral'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
    default: 'TON',
    uppercase: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'cancelled'],
    default: 'pending',
  },
  method: {
    type: String,
    enum: ['ton_wallet', 'bank_transfer', 'crypto', 'system'],
    required: true,
  },
  transactionId: {
    type: String,
    unique: true,
    sparse: true,
  },
  walletAddress: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  metadata: {
    type: Schema.Types.Mixed,
  },
  processedAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Indexes
paymentSchema.index({ userId: 1, createdAt: -1 });
paymentSchema.index({ type: 1, status: 1 });
paymentSchema.index({ transactionId: 1 });
paymentSchema.index({ walletAddress: 1 });
paymentSchema.index({ createdAt: -1 });

// Virtual for formatted amount
paymentSchema.virtual('formattedAmount').get(function() {
  return `${this.amount.toFixed(3)} ${this.currency}`;
});

// Pre-save middleware to set processedAt
paymentSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'completed' && !this.processedAt) {
    this.processedAt = new Date();
  }
  next();
});

export default mongoose.model<IPayment>('Payment', paymentSchema); 