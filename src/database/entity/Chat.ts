import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Team from './Team';

@Entity('chats')
class Chat extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Team, { eager: true })
    team: Team;

    @Column()
    userId: string;

    @Column()
    createdAt: Date;

    @Column()
    content: string;
}

export default Chat;
