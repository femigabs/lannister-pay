/* eslint-disable import/no-cycle */
import { Router } from 'express';
import Controller from '../../controllers';
import Middleware from '../../middlewares';

const router = Router();

router.post(
  '/fees',
  Controller.feeConfiguration
);

router.post(
  '/compute-transaction-fee',
  Middleware.checkFeeConfiguration,
  Controller.feeComputation
);

export default router;
