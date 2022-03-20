/* eslint-disable no-console */
import express from 'express';
import { appConfig } from './app/config';
import Logger from './app/config/logger';

const app = express();

const logger = Logger.createLogger({ label: 'LANNISTER' });
global.logger = logger;

appConfig(app);

export default app;
