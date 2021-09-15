import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import 'reflect-metadata';
import config from './config';
import { connectToDatabase } from './database/index';

connectToDatabase().then(() => {

    console.log('Connected to database!');
    app.listen(config.PORT, () => console.log('Server is up!'));   
}).catch(() => {
    console.error('Database connection error!');
});
