import request from 'supertest';
import app from '../../index';

describe('Integration test', () => {
    it('Welcome', (done) => {
        request(app)
            .get('/')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body.message).toEqual('Thanks for dropping by, you are at Lannister pay');
                done();
            });
    });
});