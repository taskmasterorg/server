import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Team from './Team';

@Entity('teamMembers')
class TeamMember extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Team, { eager: true })
    team: Team;

    @Column("uuid")
    userId: string;

    @Column()
    role: string;
}

export default TeamMember;
