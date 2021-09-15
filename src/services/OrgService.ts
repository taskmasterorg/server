import { Organization, OrganizationMember, User } from '../database';
import { orgMember, orgStructure } from './interface';

/**
 * Implements features to needed to deal with an organization.
 */
class OrgService {

    private static instance: OrgService;
    private constructor() {}

    /**
     * Follows the singleton pattern.
     * @returns an instance of this service
     */
    public static getInstance(): OrgService {

        if (!OrgService.instance) {
            OrgService.instance = new OrgService(); 
        }

        return OrgService.instance;
    }

    /**
     * Get names of organizations the user belongs to.
     * @param userId 
     * @returns A list of strings
     */
    public async getOrgsList(userId: string): Promise<orgStructure[]> {

        const orgs: orgStructure[] = [];

        const fromDB = await OrganizationMember.find({
            where: {
                userId: userId
            }
        });

        if (fromDB !== undefined) {

            for (let i = 0; i < fromDB.length; ++i) {
                
                orgs.push({
                    orgId: fromDB[i].org.id,
                    orgName: fromDB[i].org.name
                });
            }
        }

        return orgs;
    }

    /**
     * Gives you a list of members in the given organization.
     * @param orgId 
     * @returns A list of members
     */
    public async getOrgMembers(orgId: string): Promise<orgMember[]> {
        
        const members: orgMember[] = [];

        const orgFromDB = await Organization.findOne({
            where: {
                id: orgId
            }
        });

        if (orgFromDB !== undefined) {
            
            const membersFromDB = await OrganizationMember.find({
                where: {
                    org: orgFromDB
                }
            });

            for (let i = 0; i < membersFromDB.length; ++i) {

                const user = await User.findOne({
                    where: {
                        id: membersFromDB[i].userId
                    }
                });

                if (user === undefined) {
                    continue;
                }

                members.push({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: membersFromDB[i].role
                });
            }
        }

        return members;
    }

    /**
     * Add a member to an organization.
     * @param org    Organization id as a string or an instance of the entity Organization
     * @param userId  
     * @param role   "admin" | "user"
     */
    public async addOrgMember(org: string | Organization, userId: string, role: string): Promise<void> {

        try {

            let orgToUse: Organization;

            if (typeof org === 'string') {

                const orgFromDB = await Organization.findOne({
                    where: {
                        id: org
                    }
                });

                if (orgFromDB === undefined) {

                    throw new Error('This organization does not exist. Could not add member.');
                }
                orgToUse = orgFromDB;
            } else {
                orgToUse = org;
            }

            const member = OrganizationMember.create({
                userId: userId,
                org: orgToUse,
                role: role
            });

            await member.save();

        } catch (err) {

            if (err instanceof Error) {
                throw err;
            }

            if (typeof err === 'string') {
                throw new Error(err);
            }

            throw new Error('Something went wrong.');
        }
    }

    /**
     * Creates an organization and makes the creator, the admin.
     * @param userId   The creator
     * @param orgName  User generated name for the organization
     */
    public async createOrg(userId: string, orgName: string): Promise<void> {

        try {
            
            const org = Organization.create({
                name: orgName
            });

            const createdOrg = await org.save();
            await this.addOrgMember(createdOrg, userId, 'admin');
        } catch (err) {

            if (err instanceof Error) {
                throw err;
            }

            if (typeof err === 'string') {
                throw new Error(err);
            }

            throw new Error('Something went wrong.');
        }
    }
}

export default OrgService;
