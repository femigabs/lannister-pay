/* eslint-disable complexity */
/* eslint-disable import/no-cycle */
import { client } from '../config';

/**
 *Contains Service methods
 * @class Service
 */
class Service {
  /**
   * Configure Fee Settings.
   * @static
   * @param {Request} req - Request object.
   * @memberof Service
   * { Promise< Object | Error | Null > } A promise that resolves or rejects
   */
  static async feeConfiguration(body) {
    const { FeeConfigurationSpec } = body;
    const newArr = [];
    const array = FeeConfigurationSpec.split('\n');
    array.forEach(el => {
      const index = el.indexOf(':');
      const arr = [el.slice(0, index), el.slice(index + 1)];
      const arr1 = arr[0].trim().split(' ');
      const arr2 = arr[1].trim().split(' ');

      const [fee_id, fee_currency, fee_locale, entity] = arr1;
      const [_, fee_type, fee_value] = arr2;

      const [fee_entity, entity_property] = entity.split('(');

      const obj = {
        fee_id,
        fee_currency,
        fee_locale,
        fee_entity,
        entity_property: entity_property.replace(')', ''),
        fee_type,
        fee_value,

      };
      newArr.push(obj);
    });
    await client.set('setup', JSON.stringify(newArr));
  }

  /**
   * Get Filter value.
   * @static
   * @param {Request} req - Request object.
   * @memberof Service
   * @returns {Object} - An Object response.
   */
  static filterEntityProperty(item, body) {
    switch (item.entity_property) {
      case (body.ID):
        return true;
      case (body.Issuer):
        return true;
      case (body.Brand):
        return true;
      case (body.Number):
        return true;
      case (body.SixID):
        return true;
      default:
        return (item.entity_property === '*');
    }
  }

  /**
   * Get Fee value.
   * @static
   * @param {Request} req - Request object.
   * @memberof Service
   * @returns {Integer} - An Integer response.
   */
  static getFeeValue(data, amount) {
    let fee;
    let flat_value;
    let perc_value;
    switch (data.fee_type) {
      case ('FLAT'):
        fee = Number(data.fee_value);
        break;
      case ('PERC'):
        fee = (Number(data.fee_value) / 100) * amount;
        break;
      case ('FLAT_PERC'):
        [flat_value, perc_value] = data.fee_value.split(':');
        fee = Number(flat_value) + (Number(perc_value) / 100) * amount;
        break;
      default:
        break;
    }
    return fee;
  }

  /**
   * Compute transaction fee.
   * @static
   * @param {Request} req - Request object.
   * @memberof Service
   * { Promise< Object | Error | Null > } A promise that resolves or rejects
   */
  static async feeComputation(body) {
    const { CurrencyCountry, PaymentEntity, Customer, Amount } = body;
    const { Type, Country } = PaymentEntity;
    const locale = (CurrencyCountry === Country) ? 'LOCL' : 'INTL';
    let setup = await client.get('setup');

    setup = JSON.parse(setup);

    let result = setup.filter((el) => ((el.fee_locale === locale) ? true : (el.fee_locale === '*'))).sort((a, b) => (a.fee_locale > b.fee_locale ? -1 : 1));
    result = result.filter((el) => ((el.fee_entity === Type) ? true : (el.fee_entity === '*'))).sort((a, b) => (a.fee_entity > b.fee_entity ? -1 : 1));
    [result] = result.filter((el) => this.filterEntityProperty(el, PaymentEntity)).sort((a, b) => (a.entity_property > b.entity_property ? -1 : 1));

    let computedFee = this.getFeeValue(result, Amount);
    computedFee = Math.round(computedFee);
    const fee = (Customer.BearsFee === true) ? (computedFee + Amount) : Amount;
    return {
      AppliedFeeID: result.fee_id,
      AppliedFeeValue: computedFee,
      ChargeAmount: fee,
      SettlementAmount: (fee - computedFee)
    };
  }
}

export default Service;
