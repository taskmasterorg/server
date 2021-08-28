import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Organization from './Organization';

@Entity('teams')
class Team extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Organization)
    org: Organization;

    @Column()
    name: string;
}

export default Team;
