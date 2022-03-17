/* eslint-disable no-console */
import express from 'express';
import mongoose from 'mongoose';
import { appConfig, config } from './app/config';
import Logger from './app/config/logger';

const app = express();

const logger = Logger.createLogger({ label: 'LANNISTER' });
global.logger = logger;

mongoose.connect(config.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  logger.info('Database connected successfully');
});

appConfig(app);
