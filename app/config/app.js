/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import morgan from 'morgan';
import { json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import apiV1Routes from '../routes/v1';
import config from './env';
import { Helper, genericErrors, constants } from '../utils';

const { errorResponse } = Helper;
const { notFoundApi } = genericErrors;
const {
  WELCOME,
  v1,
  LANNISTER_RUNNING
} = constants;

const appConfig = (app) => {
  app.use(morgan('combined', { stream: logger.stream }));
  app.use(helmet());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(cors());
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers',
      'Authorization, Origin, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  app.get('/', (req, res) => res.json({ message: WELCOME }));
  app.use(v1, apiV1Routes);
  app.use((req, res, next) => {
    next(notFoundApi);
  });
  app.use((err, req, res, next) => errorResponse(req, res, err));
  const port = config.PORT || 3100;
  if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
      logger.info(`${LANNISTER_RUNNING} ${port}`);
    });
  }
};

export default appConfig;
