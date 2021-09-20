import express, { Router } from 'express';
import { authRouter, verifyTokenMiddleWare } from './auth';
import orgRouter from './org';
import teamRouter from './team';
import bugRouter from './bug';

const router: Router = express.Router();

router.use('/auth', authRouter);
router.use('/', verifyTokenMiddleWare);
router.use('/org', orgRouter);
router.use('/team', teamRouter);
router.use('/bug', bugRouter);
export default router;
