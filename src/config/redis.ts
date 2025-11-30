import { createClient, RedisClientType } from 'redis';
import { logger } from './logger';

let redisClient: RedisClientType | null = null;

export const connectRedis = async (): Promise<RedisClientType> => {
  if (redisClient) {
    return redisClient;
  }
  const host = process.env.REDIS_HOST || 'localhost';
  const port = parseInt(process.env.REDIS_PORT || '6379', 10);
  const password = process.env.REDIS_PASSWORD || undefined;
  redisClient = createClient({
    socket: {
      host,
      port
    },
    password
  });
  redisClient.on('error', (err) => {
    logger.error('Redis Client Error:', err);
  });
  redisClient.on('connect', () => {
    logger.info('Redis Client Connected');
  });
  await redisClient.connect();
  return redisClient;
};

export const getRedisClient = (): RedisClientType | null => {
  return redisClient;
};

export const disconnectRedis = async (): Promise<void> => {
  if (redisClient) {
    await redisClient.quit();
    redisClient = null;
    logger.info('Redis Client Disconnected');
  }
};


