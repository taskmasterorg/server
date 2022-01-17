import express, { Router, NextFunction } from 'express';
import { errorMessage5XX, errorMessage400 } from './util';
import { AuthService, OrgService, TeamService } from '../services';

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
 * @apiError (ClientError) {json} 400
 * @apiError (ServerError) {json} 500 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201
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
 * @apiError (ClientError) {json} 400
 * @apiError (ServerError) {json} 500 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200
 *      {
 *          "userId": "someId",
 *          "jwt": "someToken",
 *          "firstName": "firstName",
 *          "lastName": "lastName",
 *          "email": "email"
 *      }
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
        res.status(200).json(serviceResponse);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: errorMessage5XX });
    }
});

async function verifyTokenMiddleWare(req: express.Request, res: express.Response, next: NextFunction): Promise<any> {

    try {
        let header = req.headers.authorization;
        if (!header) {
            res.status(400).json({ 
                message: errorMessage400,
                detail: 'no header' });
            return;
        }
        let token = header.split(' ')[1];
        const serviceResponse = await authService.verifyAndDecodeJWT(token);
        if (serviceResponse instanceof Error) {
            res.status(400).json({ 
                message: errorMessage400,
                detail: serviceResponse.message });
            return;
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
 *     HTTP/1.1 201
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
 * @apiError (ClientError) {json} 400
 * @apiError (ServerError) {json} 500 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201
 *      {
 *          "userId": "abc",
 *          "iat": "1393286893",
 *          "exp": "1393286893"
 *      }
 */
 authRouter.use('/', verifyTokenMiddleWare);
 authRouter.post('/verifyJWT', async (req: express.Request, res: express.Response) => {
     
     try {
         const { serviceResponse } = req.body;
         if (serviceResponse instanceof Error) {
             res.status(400).json({ 
                 message: errorMessage400,
                 detail: serviceResponse.message });
            return;
         }
         res.status(201).json({
             serviceResponse: serviceResponse
         });
     } catch(err) {
         console.error(err);
         res.status(500).json({ message: errorMessage5XX });
     }
 });

 /**
 * @api {delete} /api/v1/auth/ Delete user
 * @apiName Auth
 * @apiGroup Auth
 * @apiParam {string} userId
 * @apiError (ServerError) {json} 500
 */
 authRouter.delete('/', async (req: express.Request, res: express.Response) => {

    try {

        const { userId } = req.body
        const orgService: OrgService = OrgService.getInstance();
        const teamService: TeamService = TeamService.getInstance();
        await authService.deleteUser(userId, orgService, teamService);
        res.status(201).json({ message: 'OK'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: errorMessage5XX });
    }
 });

export {
    authRouter,
    verifyTokenMiddleWare
}
