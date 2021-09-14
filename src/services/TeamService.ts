import { Organization, Team, TeamMember } from '../database';

/**
 * Implements functionality for managing Teams and Team Members
 */
class TeamService {

    private static instance: TeamService;
    private constructor() {}

    /**
     * Follows the singleton pattern
     * @returns the common instance of this class
     */
    public static getInstance(): TeamService {

        if (!TeamService.instance) {
            TeamService.instance = new TeamService();
        }

        return TeamService.instance;
    }

    /**
     * Get a team.
     * @param teamId 
     * @returns An instance of Team if found, undefined otherwise.
     */
    public async getTeam(teamId: string): Promise<Team | undefined> {

        try {

            const teamFromDB = await Team.findOne({
                where: {
                    id: teamId
                }
            });
    
            return teamFromDB;
        } catch (err) {

            console.error(err);
        }
    }

    /**
     * Get a list of teams the user belongs to.
     * @param userId 
     * @returns List of teams if found, undefined otherwise.
     */
    public async getAllTeams(userId: string): Promise<Team[] | undefined> {

        try {

            const teamsList: Team[] = [];

            const listFromDB = await TeamMember.find({
                where: {
                    userId
                }
            });

            for (let i = 0; i < listFromDB.length; ++i) {

                teamsList.push(listFromDB[i].team);
            }

            return teamsList;
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Create a team in the organization
     * @param org   The org under which you need the team
     * @param teamName User provided name
     * @returns An instance of the created team
     */
    public async createTeam(org: Organization, teamName: string): Promise<Team | undefined> {

        try {

            const teamToCreate = Team.create({ org, name: teamName });
            const teamCreated = await teamToCreate.save();
            return teamCreated;
        } catch (err) {
            console.error(err);
        }
    }
}

export default TeamService;
