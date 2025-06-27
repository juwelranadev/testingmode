import mongoose from 'mongoose';
import { config } from './env';
import logger from '../utils/logger';

export const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = config.nodeEnv === 'production' 
      ? config.mongoUriProd 
      : config.mongoUri;

    if (!mongoUri) {
      throw new Error('MongoDB URI is not defined');
    }

    await mongoose.connect(mongoUri);
    
    logger.info('MongoDB connected successfully');
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.info('MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    logger.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    logger.info('MongoDB disconnected successfully');
  } catch (error) {
    logger.error('Error disconnecting from MongoDB:', error);
  }
};

export default connectDB; 