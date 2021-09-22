import express, { Router } from 'express';
import { errorMessage5XX } from './util';
import { orgMember, orgStructure, OrgService } from '../services/';

const orgService: OrgService = OrgService.getInstance();
const orgRouter: Router = express.Router();

/**
 * @api {get} /api/v1/org/all/:userId Get all orgs
 * @apiName Org
 * @apiGroup Org
 * @apiError (ServerError) {json} 500 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200
 *      [
 *          { 
 *            "orgId": "abc",
 *            "orgName": "name"
 *          }
 *      ]
 * @apiDescription Http-Only cookie is used over here to verify and decode JWT.
 */
orgRouter.get('/all/:userId', async (req: express.Request, res: express.Response) => {
    
    try {

        const orgs: orgStructure[] = await orgService.getOrgsList(req.params.userId);
        res.status(200).json(orgs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: errorMessage5XX });
    }
});

/**
 * @api {get} /api/v1/org/members/:orgId Get all members of an org
 * @apiName Org
 * @apiGroup Org
 * @apiError (ServerError) {json} 500 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200
 *      [
 *          { 
 *            "firstName": "abc",
 *            "lastName": "name",
 *            "role": "dev"  
 *          }
 *      ]
 * @apiDescription Http-Only cookie is used over here to verify and decode JWT.
 */
orgRouter.get('/members/:orgId', async (req: express.Request, res: express.Response) => {

    try {

        const members: orgMember[] = await orgService.getOrgMembers(req.params.orgId);
        res.status(200).json(members);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: errorMessage5XX });
    }
});

/**
 * @api {post} /api/v1/org/create Create an org
 * @apiName Org
 * @apiGroup Org
 * @apiParam {string} userId
 * @apiParam {string} orgName
 * @apiError (ServerError) {json} 500 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201
 *          { 
 *              "message": "Created!"
 *          }
 * @apiDescription Http-Only cookie is used over here to verify and decode JWT.
 */
orgRouter.post('/create', async (req: express.Request, res: express.Response) => {

    try {
        const { userId, orgName } = req.body;
        await orgService.createOrg(userId, orgName);
        res.status(201).json({
            message: 'Created!'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: errorMessage5XX });
    }
});

/**
 * @api {post} /api/v1/org/addMember Add a member to an org
 * @apiName Org
 * @apiGroup Org
 * @apiParam {string} orgId
 * @apiParam {string} userId
 * @apiParam {string} role
 * @apiError (ServerError) {json} 500 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201
  *       { 
 *          message: "Added!"
 *        }
 * @apiDescription Http-Only cookie is used over here to verify and decode JWT.
 */
orgRouter.post('/addMember', async (req: express.Request, res: express.Response) => {

    try {
        const { orgId, userId, role } = req.body;
        await orgService.addOrgMember(orgId, userId, role);
        res.status(201).json({
            message: 'Added!'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: errorMessage5XX });
    }
});

export default orgRouter;
