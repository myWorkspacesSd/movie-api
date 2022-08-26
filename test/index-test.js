const chai = require('chai');
const chaiHttp = require('chai-http');
const shoul = chai.should();
const server = require('../app');

chai.use(chaiHttp);

describe('returns the homepage', () => {
    it('(GET /', (done) => {
        chai.request(server)
        .get('/')
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });
});
