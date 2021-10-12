const utils = require('../utils/nodemailer');

class SendEmail {
    constructor(recipient, subject, message) {
        this.recipient = recipient;
        this.subject = subject;
        this.message = message;
    }

    async sendEmail() {
        try {
            const result = await utils( 
                this.recipient, 
                this.subject,
                this.message,
            );

            return 'Email sent';
        } catch (error) {
            return error;
        }
    }
}

module.exports = SendEmail;