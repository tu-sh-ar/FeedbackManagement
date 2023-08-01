import express from 'express';
import cors from 'cors';
import apiRouter from './routes'
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { SwaggerOptions } from './documentation';
import { configureDB } from './db';



const startServerAndInitConfiguration = async () => {
    const server = express();

    // using body parser
    server.use(express.json());

    // using cross origin resource sharing for all the routes
    // Access-Control-Allow-Origin: * i.e api accessed from any routes
    server.use(cors());

    server.use('/api/v1', apiRouter);

    const specs = swaggerJsdoc(SwaggerOptions);
    server.use(
        "/swagger",
        swaggerUi.serve,
        swaggerUi.setup(specs, { explorer: true })
    );
    await configureDB()
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
        console.log(`Server is now running on port ${PORT}`);
    });
}

// starts server 
startServerAndInitConfiguration();