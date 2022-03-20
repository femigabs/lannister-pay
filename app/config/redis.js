/* eslint-disable import/no-cycle */
import Logger from './logger';
import { config } from '.';

const redis = require('redis');

const logger = Logger.createLogger({ label: 'LANNISTER' });

const client = redis.createClient({
  url: config.DATABASE_URL,
  socket: {
    tls: true,
    rejectUnauthorized: false
  },
});

(async () => {
  await client.connect();
})();

client.on('error', (error) => {
  logger.error('Redis Error', error);
});
client.on('connect', () => {
  logger.info('Redis connected successfully');
});

export default client;
