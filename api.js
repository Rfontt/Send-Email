const http = require('http');
const bcrypt = require('bcrypt');
require('dotenv').config();

const SendEmail = require('./src/services/sendEmailService');

const DEFAULT_USER = { username: 'Teste', password: 'HelloWorld' };

const routes = {
    '/login:post': async (request, response) => {
        const token = await bcrypt.hash(process.env.KEY, 10);
        
        for await (const data of request) {
            const user = JSON.parse(data);

            if (
                user.username !== DEFAULT_USER.username ||
                user.password !== DEFAULT_USER.password
            ) {
                response.writeHeader(401);
                response.write('Login failed');

                return response.end();
            };

            response.write(token);
            response.end();
        }
    },

    '/send-email:post': async (request, response) => {
        for await (const data of request) {
            const datas = JSON.parse(data);

            if (datas.recipient.length > 0  && datas.subject.length > 0 && datas.message.length > 0) {
                const sendEmail = new SendEmail(datas.recipient, datas.subject, datas.message);
                
                try {
                   await sendEmail.sendEmail();

                   response.writeHeader(200);
                   response.end();
                } catch (error) {
                   response.writeHeader(500);
                   response.end();
                }
            } 

            response.writeHeader(404);
            response.end();
        }
    },

    default: (request, response) => {
        response.write('Hello world');

        return response.end();
    }
}

const handler = function(request, response) {
    const { url, method } = request;
    const routeKey = `${url}:${method.toLowerCase()}`;
    const chosen = routes[routeKey] || routes.default;

    response.writeHead(200, {
        'Content-type': 'text/html'
    });

    return chosen(request, response);
}

const app = http.createServer(handler)
            .listen(3000, () => console.log('App running at localhost:3000'));

module.exports = app;