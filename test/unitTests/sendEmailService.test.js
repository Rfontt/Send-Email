const { describe, it, before } = require('mocha');
const { expect } = require('chai');
const SendEmail = require('../../src/services/sendEmailService');

const mockSendEmailParamenters = 
    {
        recipient: "dalilafontenele22@gmail.com",
        subject: "Test",
        message: "Hello, this is a test." 
    }

describe('# Send Email', () => {
    let sendEmailService;
    
    before(() => {
        sendEmailService = new SendEmail(
            mockSendEmailParamenters.recipient,
            mockSendEmailParamenters.subject, mockSendEmailParamenters.message
        );
    });

    it('Should send the paramenters required to send an email to sendEmail class. ', async () => {
        const result = await sendEmailService.sendEmail();

        expect(result).to.be.deep.equals('Email sent');
    });
});