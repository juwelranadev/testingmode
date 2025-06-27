import mongoose, { Document, Schema } from 'mongoose';

export interface ISettings extends Document {
  key: string;
  value: any;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  description?: string;
  isPublic: boolean;
  category: 'general' | 'payment' | 'task' | 'security' | 'notification';
  createdAt: Date;
  updatedAt: Date;
}

const settingsSchema = new Schema<ISettings>({
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  value: {
    type: Schema.Types.Mixed,
    required: true,
  },
  type: {
    type: String,
    enum: ['string', 'number', 'boolean', 'object', 'array'],
    required: true,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 200,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    enum: ['general', 'payment', 'task', 'security', 'notification'],
    default: 'general',
  },
}, {
  timestamps: true,
});

// Indexes
settingsSchema.index({ key: 1 });
settingsSchema.index({ category: 1 });
settingsSchema.index({ isPublic: 1 });

export default mongoose.model<ISettings>('Settings', settingsSchema); 