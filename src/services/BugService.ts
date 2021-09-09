import { Bug, Team } from '../database';
import { bugStructure } from './interface';

class BugService {

    private static instance: BugService;
    private constructor() {}

    public static getInstance(): BugService {

        if (!BugService.instance) {
            BugService.instance = new BugService();
        }
        return BugService.instance;
    }

    /**
     * Get a bug by id
     * @param bugId 
     * @returns A bug if found, undefined otherwise
     */
    public async getBug(bugId: string): Promise<Bug | undefined> {

        try {

            const bug = await Bug.findOne({
                where: {
                    id: bugId
                }
            });

            return bug;
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Get bugs for a team
     * @param teamId 
     * @returns A list if found, undefined otherwise
     */
    public async getBugs(teamId: string): Promise<Bug[] | undefined> {

        try {

            const bugs = await Bug.find({
                where: {
                    team: {
                        id: teamId
                    }
                }
            });

            return bugs;
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Create a bug
     * @param bug 
     * @returns An instance of Bug
     */
    public async createBug(bug: bugStructure): Promise<Bug | undefined> {

        try {

            if (!bug.team) {

                const team = await Team.findOne({
                    where: {
                        id: bug.teamId
                    }
                });
                
                bug.team = team;
            }

            const createdBug = Bug.create(bug);
            const bugFromDB = await createdBug.save();
            return bugFromDB;
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Assign a developer to a bug
     * @param bugId 
     * @param teamMemberId 
     * @returns The updated bug in database
     */
    public async assignDeveloper(bugId: string, teamMemberId: string): Promise<Bug | undefined> {

        try {

            const bugFromDB = await Bug.findOne({
                where: {
                    id: bugId
                }
            });

            if (bugFromDB === undefined) {
                return undefined;
            }

            bugFromDB.assignee = teamMemberId;
            bugFromDB.save();
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Update status of a bug
     * @param bugId 
     * @param status 
     * @returns The updated bug in database
     */
    public async updateStatus(bugId: string, status: number): Promise<Bug | undefined> {

        try {

            const bugFromDB = await Bug.findOne({
                where: {
                    id: bugId
                }
            });

            if (bugFromDB === undefined) {
                return undefined;
            }

            bugFromDB.status = status;
            bugFromDB.save();
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Update priority of a bug
     * @param bugId 
     * @param priority 
     * @returns The updated priority in database
     */
    public async updatePriority(bugId: string, priority: number): Promise<Bug | undefined> {

        try {

            const bugFromDB = await Bug.findOne({
                where: {
                    id: bugId
                }
            });

            if (bugFromDB === undefined) {
                return undefined;
            }

            bugFromDB.priority = priority;
            bugFromDB.save();
        } catch (err) {
            console.error(err);
        }
    }
}

export default BugService;
