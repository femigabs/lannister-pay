import request from 'supertest';
import app from '../../index';

describe('Transaction', () => {
  describe('Fee Configuration', () => {
    it('it should configure fee settings successfully', (done) => {
      request(app)
        .post('/api/v1/fees')
        .send({
          FeeConfigurationSpec: 'LNPY1221 NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55'
        })
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          expect(res.body.status).toEqual('ok');
          done();
        });
    });
  });

  describe('Fee Computation', () => {
    it('should throw error if curreency is not NGN', (done) => {
      request(app)
        .post('/api/v1/compute-transaction-fee')
        .send({
          ID: 91204,
          Amount: 3500,
          Currency: 'USD',
          CurrencyCountry: 'US',
          Customer: {
            ID: 4211232,
            EmailAddress: 'anonimized292200@anon.io',
            FullName: 'Wenthorth Scoffield',
            BearsFee: false
          },
          PaymentEntity: {
            ID: 2203454,
            Issuer: 'WINTERFELLWALLETS',
            Brand: '',
            Number: 'AX0923******0293',
            SixID: 'AX0923',
            Type: 'WALLET-ID',
            Country: 'NG'
          }
        })
        .set('Accept', 'application/json')
        .expect(400)
        .end((err, res) => {
          expect(res.body.Error).toEqual('No fee configuration for USD transactions.');
          done();
        });
    });

    it('it should compute fee successfully', (done) => {
      request(app)
        .post('/api/v1/compute-transaction-fee')
        .send({
          ID: 91203,
          Amount: 5000,
          Currency: 'NGN',
          CurrencyCountry: 'NG',
          Customer: {
            ID: 2211232,
            EmailAddress: 'anonimized29900@anon.io',
            FullName: 'Abel Eden',
            BearsFee: true
          },
          PaymentEntity: {
            ID: 2203454,
            Issuer: 'GTBANK',
            Brand: 'MASTERCARD',
            Number: '530191******2903',
            SixID: 530191,
            Type: 'CREDIT-CARD',
            Country: 'NG'
          }
        })
        .set('Accept', 'application/json')
        // .expect(200)
        .end((err, res) => {
          console.log('🚀 ~ file: fee.integrations.js ~ line 82 ~ .end ~ res', res.body);
          expect(res.body.AppliedFeeID).toEqual('LNPY1223');
          expect(res.body.AppliedFeeValue).toEqual(120);
          expect(res.body.ChargeAmount).toEqual(5120);
          expect(res.body.SettlementAmount).toEqual(5000);
          done();
        });
    });
  });
});
