import { ApiError } from '../utils';

/**
 *  Contains several methods to manage middlewares
 *  @class UserMiddlewares
 */
class Middleware {
  /**
    * validate sign up schema.
    * @memberof UserMiddlewares
    * @returns { Promise< Object | Error | Null > } A promise that resolves or rejects
    * with a user resource  or a DB Error.
    */
  static async checkFeeConfiguration(req, res, next) {
    try {
      const { Currency } = req.body;

      if (Currency !== 'NGN') {
        const error = new Error(`No fee configuration for ${Currency} transactions.`);
        logger.error('ERROR: No Fee configuration in checkFeeConfiguration at middlewares.index.js', error);
        throw error;
      }
      next();
    } catch (error) {
      res.status(400).json({ Error: error.message });
    }
  }
}

export default Middleware;
