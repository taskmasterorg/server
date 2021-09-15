import express, { Router, NextFunction } from 'express';
import { errorMessage5XX, errorMessage400 } from './util';
import { AuthService } from '../services';

const authRouter: Router = express.Router();
const authService: AuthService = AuthService.getInstance();

/**
 * @api {post} /api/v1/auth/signup User signup
 * @apiName Auth
 * @apiGroup Auth
 * @apiParam {string} firstName 
 * @apiParam {string} lastName
 * @apiParam {string} email
 * @apiParam {string} password
 * @apiError (ServerError) {json} 500 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200
 *      {
 *          "message": "Created!"
 *      }
 */
authRouter.post('/signup', async (req: express.Request, res: express.Response) => {
    try {

        const bodyData = {...req.body};
        const serviceResponse = await authService.signup(bodyData);
        if (serviceResponse instanceof Error) {
            res.status(400).json({ 
                message: errorMessage400,
                detail: serviceResponse.message });
            return;
        }
        res.status(201).json({ message: 'Created!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: errorMessage5XX });
    }
});

/**
 * @api {post} /api/v1/auth/login User login
 * @apiName Auth
 * @apiGroup Auth
 * @apiParam {string} email
 * @apiParam {string} password
 * @apiError (ServerError) {json} 500 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200
 *      {
 *          "message": "Okay"
 *      }
 * @apiDescription Http-Only cookie is set.
 */
authRouter.post('/login', async (req: express.Request, res: express.Response) => {
    try {

        const bodyData = {...req.body};
        const serviceResponse = await authService.login(bodyData);
        if (serviceResponse instanceof Error) {
            res.status(400).json({ 
                message: errorMessage400,
                detail: serviceResponse.message });
            return;
        }
        res.cookie('token', serviceResponse, {
            maxAge: 3 * 24 * 60 * 60,
            httpOnly: true
        });
        res.status(200).json({
            message: 'Okay'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: errorMessage5XX });
    }
});

async function verifyTokenMiddleWare(req: express.Request, res: express.Response, next: NextFunction) {

    try {
        const { token } = req.cookies;
        const serviceResponse = await authService.verifyAndDecodeJWT(token);
        if (serviceResponse instanceof Error) {
            res.status(400).json({ 
                message: errorMessage400,
                detail: serviceResponse.message });
        }
        req.body.serviceResponse = serviceResponse;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: errorMessage5XX });
    }
}

/**
 * @api {post} /api/v1/auth/logout User logout
 * @apiName Auth
 * @apiGroup Auth
 * @apiError (ServerError) {json} 500 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200
 *      {
 *          "message": "Okay"
 *      }
 * @apiDescription The JWT of the user is invalidated.
 */
authRouter.post('/logout', async (req: express.Request, res: express.Response) => {
    try {
        const bodyData = {...req.body};
        await authService.logout(bodyData.token);
        res.status(201).json({
            message: 'Okay'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: errorMessage5XX });
    }
});

/**
 * @api {post} /api/v1/auth/verifyJWT Token verification
 * @apiName Auth
 * @apiGroup Auth
 * @apiError (ServerError) {json} 500 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200
 *      {
 *          "userId": "abc",
 *          "iat": "1393286893",
 *          "exp": "1393286893"
 *      }
 * @apiDescription Http-Only cookie is used over here to verify and decode JWT.
 */
 authRouter.use('/', verifyTokenMiddleWare);
 authRouter.post('/verifyJWT', async (req: express.Request, res: express.Response) => {
     
     try {
         const { serviceResponse } = req.body;
         if (serviceResponse instanceof Error) {
             res.status(400).json({ 
                 message: errorMessage400,
                 detail: serviceResponse.message });
         }
         res.status(201).json({
             serviceResponse: serviceResponse
         });
     } catch(err) {
         console.error(err);
         res.status(500).json({ message: errorMessage5XX });
     }
 });

export {
    authRouter,
    verifyTokenMiddleWare
}
