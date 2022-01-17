import express, { Router } from 'express';
import { errorMessage5XX } from './util';
import BugService from '../services/BugService';

const bugService: BugService = BugService.getInstance();
const bugRouter: Router = express.Router();

/**
 * @api {get} /api/v1/bug/one/:id Get bug with id
 * @apiName Bug
 * @apiGroup Bug
 * @apiError (ServerError) {json} 500 
 */
bugRouter.get('/one/:id', async (req: express.Request, res: express.Response) => {
    try {
        const bug = await bugService.getBug(req.params.id);
        res.status(200).json(bug);
    }  catch (err) {
        console.error(err);
        res.status(500).json({ message: errorMessage5XX });
    } 
});

/**
 * @api {get} /api/v1/bug/all/:teamId Get all bugs of a team
 * @apiName Bug
 * @apiGroup Bug
 * @apiError (ServerError) {json} 500 
 */
bugRouter.get('/all/:teamId', async (req: express.Request, res: express.Response) => {
    try {
        const bugs = await bugService.getBugs(req.params.teamId);
        res.status(200).json(bugs);
    }  catch (err) {
        console.error(err);
        res.status(500).json({ message: errorMessage5XX });
    } 
});

/**
 * @api {post} /api/v1/bug/ Create a bug
 * @apiName Bug
 * @apiGroup Bug
 * @apiError (ServerError) {json} 500 
 * @apiDescription For parameters, refer bugStructure at: https://github.com/taskmasterorg/server/blob/main/src/services/interface.ts
 */
bugRouter.post('/', async (req: express.Request, res: express.Response) => {
    try {
        const bug = await bugService.createBug({...req.body});
        res.status(201).json(bug);
    }  catch (err) {
        console.error(err);
        res.status(500).json({ message: errorMessage5XX });
    } 
});

/**
 * @api {put} /api/v1/bug/assign Assign a bug to a member
 * @apiName Bug
 * @apiGroup Bug
 * @apiParam {string} bugId
 * @apiParam {string} teamMemberId
 * @apiError (ServerError) {json} 500 
 */
bugRouter.put('/assign', async (req: express.Request, res: express.Response) => {
    try {
        const { bugId, teamMemberId } = req.body;
        const bug = bugService.assignDeveloper(bugId, teamMemberId);
        res.status(200).json(bug);
    }  catch (err) {
        console.error(err);
        res.status(500).json({ message: errorMessage5XX });
    } 
});

/**
 * @api {put} /api/v1/bug/assign Update bug status
 * @apiName Bug
 * @apiGroup Bug
 * @apiParam {string} bugId
 * @apiParam {number} status
 * @apiError (ServerError) {json} 500 
 */
bugRouter.put('/status', async (req: express.Request, res: express.Response) => {
    try {
        const { bugId, status } = req.body;
        const bug = bugService.updateStatus(bugId, status);
        res.status(200).json(bug);
    }  catch (err) {
        console.error(err);
        res.status(500).json({ message: errorMessage5XX });
    } 
});

/**
 * @api {put} /api/v1/bug/priority Update bug priority
 * @apiName Bug
 * @apiGroup Bug
 * @apiParam {string} bugId
 * @apiParam {number} priorityNumber
 * @apiError (ServerError) {json} 500 
 */
bugRouter.put('/priority', async (req: express.Request, res: express.Response) => {
    try {
        const { bugId, priorityNumber } = req.body;
        const bug = bugService.updatePriority(bugId, priorityNumber);
        res.status(200).json(bug);
    }  catch (err) {
        console.error(err);
        res.status(500).json({ message: errorMessage5XX });
    } 
});

/**
 * @api {delete} /api/v1/bug/ Delete a bug
 * @apiName Bug
 * @apiGroup Bug
 * @apiParam {string} bugId
 * @apiError (ServerError) {json} 500 
 */
bugRouter.delete('/', async (req: express.Request, res: express.Response) => {

    try {
        const { bugId } = req.body;
        await bugService.deleteBug(bugId);
        res.status(201).json({ message: 'OK'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: errorMessage5XX });
    }
});

export default bugRouter;
