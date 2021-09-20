import express, { Router } from 'express';
import { errorMessage5XX } from './util';
import BugService from '../services/BugService';

const bugService: BugService = BugService.getInstance();
const bugRouter: Router = express.Router();

bugRouter.get('/one/:id', async (req: express.Request, res: express.Response) => {
    try {
        const bug = await bugService.getBug(req.params.id);
        res.status(200).json(bug);
    }  catch (err) {
        console.error(err);
        res.status(500).json({ message: errorMessage5XX });
    } 
});

bugRouter.get('/all/:teamId', async (req: express.Request, res: express.Response) => {
    try {
        const bugs = await bugService.getBugs(req.params.teamId);
        res.status(200).json(bugs);
    }  catch (err) {
        console.error(err);
        res.status(500).json({ message: errorMessage5XX });
    } 
});

bugRouter.post('/', async (req: express.Request, res: express.Response) => {
    try {
        const bug = await bugService.createBug({...req.body});
        res.status(201).json(bug);
    }  catch (err) {
        console.error(err);
        res.status(500).json({ message: errorMessage5XX });
    } 
});

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

export default bugRouter;
