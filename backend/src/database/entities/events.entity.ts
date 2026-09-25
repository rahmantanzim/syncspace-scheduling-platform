
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IntegrationProviderEnum, IntegrationAppTypeEnum, IntegrationCategoryEnum } from './integrations.entity';
import { User } from './user.entity';
import { Meeting } from './meetings.entity';
export enum EventLocationTypeEnum{
    GOOGLE_MEET_AND_CALENDAR = IntegrationAppTypeEnum.GOOGLE_MEET_AND_CALENDAR,
    ZOOM_MEETING = IntegrationAppTypeEnum.ZOOM_MEETING,
}

@Entity({ name: 'events' })
export class Event {
    @PrimaryGeneratedColumn('uuid') // This will generate a unique identifier for each event
    id: string;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({ default: 30 })
    duration: number;

    @Column({ nullable: false })
    slug: string;

    @Column({ default: false })
    isPrivate: boolean;

    @Column({type: 'enum', enum: EventLocationTypeEnum, nullable: true})
    locationType: EventLocationTypeEnum;

    //relationships with the user entity
    @ManyToOne(()=>User, (user)=>user.events)
    user:User;

    // relationsships with the meeeting entity
    @OneToMany(()=>Meeting, (meeting)=> meeting.event, {
        cascade: true, // meeting will be automatically persisted when the event is saved
    })
    meetings: Meeting[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;    
}