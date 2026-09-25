import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Event } from './events.entity';
@Entity({name: 'meetings'})
export class Meeting{

    @ManyToOne(()=>Event, (event)=> event.meetings)
    event: Event;
}