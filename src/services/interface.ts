import { Team } from '../database';

interface authCredentials {

    firstName?: string
    lastName?: string
    email: string
    password: string
}

interface orgMember {

    firstName: string
    lastName: string
    role: string
}

interface teamMember {

    firstName: string
    lastName: string
    role: string
}

interface bugStructure {

    teamId: string
    team?: Team
    reporter: string
    assignee?: string
    createdAt: Date
    description: string
    content: string
    status: number
    priority: number;
}

interface orgStructure {
    orgId: string,
    orgName: string
}

interface userDataForClient {
    userId: string,
    firstName: string,
    lastName: string,
    email: string,
    jwt: string
}

export {
    authCredentials,
    orgMember,
    teamMember,
    bugStructure,
    orgStructure,
    userDataForClient
}
