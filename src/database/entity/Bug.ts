import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Team from './Team';

@Entity('bugs')
class Bug extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Team)
    team: Team;

    @Column("uuid")
    reporter: string;

    @Column("uuid", {
        nullable: true
    })
    assignee: string;

    @Column()
    createdAt: Date;

    @Column()
    description: string;

    @Column()
    content: string;

    @Column()
    status: number;

    @Column()
    priority: number;
}

export default Bug;
