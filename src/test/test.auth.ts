// import mongoose from "mongoose";
// import mocha from 'mocha';
// import chai from 'chai';
// import chaiHttp from "chai-http";
// import index from '../index'

// // assetrion style
// chai.should();
// chai.use(chaiHttp);

// describe('Server Auth', ()=>{
// // test the register route
//     describe('test register route /create ', ()=>{
//         it('should register a user', (done) =>{
//             const data = { 
//                 name: 'test1 test',
//                 email:'test1@gmail.com',
//                 password: '112233',
//              }
//             chai.request(index)
//             .post('/create')
//             .send(data)
//             .end((err, response)=> {
//                 response.should.have.status(201);
//                 response.body.should.be.a('object');
//                 response.body.should.have.property('name');
//                 response.body.should.have.property('email');
//                 response.body.should.have.property('password');
//                 response.body.should.have.property('_id');
//                 response.body.should.have.property('name').eq('test1 test');
//                 response.body.should.have.property('email').eq('test1@gmail.com');
//                 response.body.should.have.property('password').eq('112233');
//             })
//             done();
//         });
//         it('should not register a user with duplicate email', (done)=>{
//             const data = {
//                 name: 'test me',
//                 email: 'test@gmail.com',
//                 password: '123456',
//             }
//             chai.request(index)
//             .post('/create')
//             .send(data)
//             .end((err, res) => {
//                 res.should.have.status(400);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('message');
//                 res.body.should.have.property('message').eq('User Already exist')
//             })
//             done();
//         });
//         it('should not register a user with an empty field', (done)=>{
//             const data = {
//                 name: '',
//                 email: '',
//                 password: '',
//             }
//             chai.request(index)
//             .post('/create')
//             .send(data)
//             .end((err, res)=> {
//                 res.should.have.status(400);
//                 res.text.should.be.equal('please add all fields');
//             })
//             done();
//         });
//         it('should not register a user with password less than 6 charcter', (done) =>{
//             const data = { name: 'kiki lolo', email: 'kiki@gmail.com', password: '12345' }
//             chai.request(index)
//             .post('/create')
//             .send(data)
//             .end((err, res) => {
//                 res.should.have.status(400);
//                 res.text.should.be.equal('password must be at least 6 characters');
//             })
//             done();
//         });
//         it('should not register a user with password more than 12 charcter', (done) =>{
//             const data = { name: 'kiki lolo', email: 'kiki@gmail.com', password: '1234567890123' }
//             chai.request(index)
//             .post('/create')
//             .send(data)
//             .end((err, res) => {
//                 res.should.have.status(400);
//                 res.text.should.be.equal('password must not exceed 12 characters')
//             })
//             done();
//         });
//     });

//     describe('test for login route /login ', () => {
//         it('should login a user that exist in db', (done) => {
//             const data = { email: 'test@gmail.com', password: '123456'};
//             chai.request(index)
//             .post('/login')
//             .send(data)
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('email').eql('test@gmail.com');
//                 res.body.should.have.property('name').eql('test');
//                 res.body.should.have.property('token');
//                 res.body.should.have.property('_id');
//             })
//             done();
//         });
//         it('should not login a user that is not yet registered', (done) => {
//             const data = { email: 'unknown@gmail.com', password: '123456'};
//             chai.request(index)
//             .post('/login')
//             .send(data)
//             .end((err, res) => {
//                 res.should.have.status(400);
//                 res.text.should.be.equal('User does not exist')
//             })
//             done();
//         });
//         it('should not login a registered user with the wrong password', (done) => {
//             const data = { email: 'test@gmail.com', password: '12345f6'};
//             chai.request(index)
//             .post('/login')
//             .send(data)
//             .end((err, res) => {
//                 res.should.have.status(400);
//                 res.text.should.be.equal('Incorrect Password!');
//             })
//             done();
//         });
//         it('should not login a user with an empty string', (done) => {
//             const data = { email: '', password: '' }
//             chai.request(index)
//             .post('/login')
//             .send(data)
//             .end((err, res) => {
//                 res.should.have.status(400);
//                 res.text.should.be.equal('please include all fields')
//             })
//             done()
//         })
//     })
// })