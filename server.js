import express from 'express';
import router from './router';
import * as app from './app';
import * as swaggerDocument from './swagger.json';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import connection from './db';

const server = express();

const port = process.env.APP_PORT;

//body parse for post and put
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

//cors
server.use(app.cors);


//swagger
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use("/", router);


server.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});