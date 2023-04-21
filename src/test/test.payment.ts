import mocha from 'mocha';
import chai from 'chai';
import chaihttp from 'chai-http'
import server from '../index'

//should assertion
chai.should();
chai.use(chaihttp)

describe('the payment api', () => {
    describe('describe paynent gatway', () => {
        it('should make a payment', (done) => {
            const data = {
                name: 'jole',
                email: 'jole@gmail.com',
                amount: 23000
            }
            chai.request(server)
            .get('/payment')
            .query(data)
            .end((err, res) => {
                if(err) console.log(err);
                res.should.be.json;
                res.body.should.have.property('status').eql(true);
                res.body.should.have.property('mesage').eql('Authorization URL created');

            })
            done();
        });

        it('should not make payment if one of the fields is empty', (done) => {
            const data = { name: '', email: 'hito@gmail.com', amount: '256000'}
            chai.request(server)
            .get('/payment')
            .query(data)
            .end((err, res) => {
                res.should.have.status(400);
                res.text.should.equal('please add all fields');
            })
            done();
        })
    })
})