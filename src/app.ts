import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import express from 'express';
import { createConnection } from './database/index';
import config from './config';
import cors from 'cors';
import api from './api/index';
import cookieParser from 'cookie-parser';

void async function main() {

    const app: express.Application = express();
    const PORT = config.PORT;

    try {
        await createConnection();
        app.use(cors());
        app.use(express.json());
        app.use(cookieParser());
        app.use('/api/v1', api);
        app.listen(PORT, () => console.log('Server is up!'));   
    } catch (err) {
        console.error(err);
    }
}();
