import express from 'express';
import cors from 'cors';
import api from './api/index';
import cookieParser from 'cookie-parser';

const app: express.Application = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1', api);

export default app;
