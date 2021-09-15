import express, { Router } from 'express';
import { authRouter, verifyTokenMiddleWare } from './auth';

const router: Router = express.Router();

router.use('/auth', authRouter);
router.use('/', verifyTokenMiddleWare);
export default router;
