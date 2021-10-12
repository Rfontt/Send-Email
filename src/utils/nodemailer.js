const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendEmailUtil(recipient, subject, message) {
    const transport = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        secureConnection: false,
        port: 587,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
        tls: {
          ciphers: 'SSLv3',
        },
    });

    await transport.sendMail({
        from: `Nova mensagem <${process.env.EMAIL}>`,
        to: recipient,
        subject: subject,
        html: message
    }).then((message) => console.log(message)).catch((error) => console.log(error));
}

module.exports = sendEmailUtil;