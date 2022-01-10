import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Organization from './Organization';

@Entity('orgMembers')
class OrganizationMember extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Organization, { eager: true })
    org: Organization;

    @Column("uuid")
    userId: string;

    @Column()
    role: string;
}

export default OrganizationMember;
