const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const request = require('supertest');
const app = require('./../../api');

describe('#Api', () => {
    it('Should login sucessfully on the login route and return HTTP Status 200', async() => {
        const response = await request(app)
                        .post('/login')
                        .send({ username: 'Teste', password: 'HelloWorld' });
                        
        expect(response.statusCode).to.be.deep.equals(200);
    });

    it('Should send email and return 200 HTTP Status Code ', async() => {
        const response = await request(app)
                        .post('/send-email')
                        .send({ 
                            recipient: 'dalilafontenele22@gmail.com',
                            subject: 'Test api',
                            message: 'Hello. How are you?'
                        });
        
        expect(response.statusCode).to.be.deep.equals(200);
    })
});