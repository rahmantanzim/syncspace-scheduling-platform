import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

// Enums for Integration Providers, App Types, and Categories
export enum IntegrationProviderEnum {
    GOOGLE = "GOOGLE",
    ZOOM = "ZOOM",
    MICROSOFT = "MICROSOFT",
}

export enum IntegrationAppTypeEnum {
    GOOGLE_MEET_AND_CALENDAR = "GOOGLE_MEET_AND_CALENDAR",
    ZOOM_MEETING = "ZOOM_MEETING",
    OUTLOOK_CALENDAR = "OUTLOOK_CALENDAR",
}

export enum IntegrationCategoryEnum {
    CALENDAR_AND_VIDEO_CONFERENCING = "CALENDAR_AND_VIDEO_CONFERENCING",
    VIDEO_CONFERENCING = "VIDEO_CONFERENCING",
    CALENDAR = "CALENDAR",
}

// Metadata interfaces for different integration types
interface GoogleMeetAndCalenderMetadata{
    scope: string;
    token_type: string;
}

interface ZoomMetaData{}

type IntegrationMetadata = GoogleMeetAndCalenderMetadata | ZoomMetaData;

@Entity({ name: 'integrations' })
export class Integration {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    access_token: string;

    @Column({ nullable: true })
    refresh_token: string;

    @Column({ type: "bigint", nullable: true })
    expiry_date: number | null;

    @Column({ type: "json" })
    metadata: IntegrationMetadata;

    @Column({ default: true })
    isConnected: boolean;

    @Column({ nullable: false })
    userId: string;
    
    @ManyToOne(() => User, (user) => user.integrations)
    @JoinColumn({ name: "userId" })
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}