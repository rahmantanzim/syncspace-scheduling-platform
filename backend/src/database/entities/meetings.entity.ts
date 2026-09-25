import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Event } from "./events.entity";

export enum MeetingStatus {
  SCHEDULED = "SCHEDULED",
  CANCELLED = "CANCELLED",
}

@Entity({ name: "meetings" })
export class Meeting {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  guestName: string;

  @Column()
  guestEmail: string;

  @Column({ nullable: true })
  additionalInfo: string;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  meetLink: string;

  @Column()
  calendarEventId: string;

  @Column()
  calendarAppType: string;

  @Column({
    type: "enum",
    enum: MeetingStatus,
    default: MeetingStatus.SCHEDULED,
  })
  status: MeetingStatus;

  @ManyToOne(() => User, (user) => user.meetings)
  user: User;

  @ManyToOne(() => Event, (event) => event.meetings)
  event: Event;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}