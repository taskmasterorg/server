import { Organization, Team, TeamMember, User } from '../database';
import { teamMember } from './interface';

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

     /**
     * Get all members of a team
     * @param id id of the team
     * @returns A list of team members
     */
      public async getTeamMembers(id: string): Promise<teamMember[]> {

        const members: teamMember[] = [];
        try {
            const membersFromDB = await TeamMember.find({
                where: {
                    team: {
                        id: id
                    }
                }
            });

            for (let i = 0; i < membersFromDB.length; ++i) {

                const userData = await User.findOne({
                    where: {
                        id: membersFromDB[i].userId
                    }
                });

                if (userData) {
                    members.push({
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        role: membersFromDB[i].role
                    })
                }
            }
        } catch (err) {
            console.error(err);
        }
        return members;
    }

    /**
     * Get a list of all teams of given org
     * @param id id of the org
     * @returns A list if found, undefined otherwise
     */
    public async getAllTeamsOfOrg(id: string): Promise<Team[] | undefined> {

        try {
            const teamsList: Team[] = [];

            const listFromDB = await TeamMember.find({
                where: {
                    org: {
                        id: id
                    }
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
     * Delete a team and its members from database
     * @param id id of the team to be deleted
     */
    public async deleteTeamAndMembers(id: string): Promise<void> {

        try {

            await TeamMember.delete({
                team: {
                    id: id
                }
            });
            await Team.delete({ 
                id: id 
            });
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Delete a team member
     * @param id id of the team member to delete
     */
    public async deleteTeamMember(id: string, isUserId = false): Promise<void> {

        try {

            if (isUserId) {
                
                await TeamMember.delete({
                    userId: id
                });
                return;
            }
            await TeamMember.delete({
                id: id
            });
        } catch (err) {
            console.error(err);
        }
    }
}

export default TeamService;
