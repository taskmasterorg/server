import express, { Router } from 'express';
import { errorMessage5XX } from './util';
import { orgMember, orgStructure } from '../services/interface';
import OrgService from '../services/OrgService';

const orgService: OrgService = OrgService.getInstance();
const orgRouter: Router = express.Router();

orgRouter.get('/all/:userId', async (req: express.Request, res: express.Response) => {
    
    try {

        const orgs: orgStructure[] = await orgService.getOrgsList(req.params.userId);
        res.status(200).json(orgs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: errorMessage5XX });
    }
});

orgRouter.get('/members/:orgId', async (req: express.Request, res: express.Response) => {

    try {

        const members: orgMember[] = await orgService.getOrgMembers(req.params.orgId);
        res.status(200).json(members);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: errorMessage5XX });
    }
});

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
