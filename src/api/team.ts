import express, { Router } from 'express';
import TeamService from '../services/TeamService';
import { Organization, Team } from '../database';
import { errorMessage404, errorMessage5XX } from './util';

const teamService: TeamService = TeamService.getInstance();
const teamRouter: Router = express.Router();

/**
 * @api {get} /api/v1/team/one/:teamId Get team with id
 * @apiName Team
 * @apiGroup Team
 * @apiError (ServerError) {json} 500 
 * @apiDescription Http-Only cookie is used over here to verify and decode JWT.
 */
teamRouter.get('/one/:id', async (req: express.Request, res: express.Response) => {
    
    try {
        const team: Team | undefined = await teamService.getTeam(req.params.id);
        if (!team) {
            res.status(200).json(team);
            return;
        }
        res.status(404).json({ message: errorMessage404 });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: errorMessage5XX });
    }
});

/**
 * @api {get} /api/v1/team/all/:userId Get all teams of the user
 * @apiName Team
 * @apiGroup Team
 * @apiError (ServerError) {json} 500 
 * @apiDescription Http-Only cookie is used over here to verify and decode JWT.
 */
teamRouter.get('/all/:userId', async (req: express.Request, res: express.Response) => {
    
    try {

        const teams: Team[] | undefined =  await teamService.getAllTeams(req.params.userId);

        if (!teams) {
            res.status(200).json(teams);
            return;
        }
        res.status(404).json({ message: errorMessage404 });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: errorMessage5XX });
    }
});

/**
 * @api {post} /api/v1/team/ Create a team
 * @apiName Team
 * @apiGroup Team
 * @apiParam {string} orgId
 * @apiParam {string} orgName
 * @apiParam {string} teamName
 * @apiError (ServerError) {json} 500 
 * @apiDescription Http-Only cookie is used over here to verify and decode JWT.
 */
teamRouter.post('/', async (req: express.Request, res: express.Response) => {
    
    try {
        const { orgId, orgName, teamName } = req.body;
        const org: Organization = Organization.create({
            id: orgId,
            name: orgName
        });
        await teamService.createTeam(org, teamName);
        res.status(201).json({
            message: 'Created!'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: errorMessage5XX });
    }
});

export default teamRouter;
