import { createConnection, createConnections } from 'typeorm';
import Bug from './entity/Bug';
import Chat from './entity/Chat';
import Organization from './entity/Organization';
import OrganizationMember from './entity/OrganizationMember';
import Team from './entity/Team';
import TeamMember from './entity/TeamMember';
import User from './entity/User';
import CacheLayer from './CacheLayer';

export {
    createConnection as connectToDatabase,
    User,
    Organization,
    OrganizationMember,
    Team,
    TeamMember,
    Bug,
    Chat,
    CacheLayer
}