/* eslint-disable import/no-cycle */
import Service from '../services';

/**
 *  Contains several methods to manage controllers
 *  @class Controller
 */
class Controller {
  /**
    * Fee configuration controller.
    * @memberof Controller
    * @param { req, res, next } req - The fee configuration settings.
    * @returns { Promise< Object | Error | Null > } A promise that resolves or rejects
    * with an ok response  or a DB Error.
    */
  static async feeConfiguration(req, res, next) {
    try {
      await Service.feeConfiguration(req.body);
      return res.status(200).json({
        status: 'ok'
      });
    } catch (error) {
      logger.error('ERROR', error);
      next(error);
    }
  }

  /**
    * Fee computation controller.
    * @memberof UserControllers
    * @param { req, res, next } req - The transactio data.
    * @returns { Promise< Object | Error | Null > } A promise that resolves or rejects
    * with an ok response  or a DB Error.
    */
  static async feeComputation(req, res, next) {
    try {
      const data = await Service.feeComputation(req.body);
      return res.status(200).json(data);
    } catch (error) {
      logger.error('ERROR', error);
      next(error);
    }
  }
}

export default Controller;
