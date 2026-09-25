import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, OneToMany, JoinColumn, OneToOne } from "typeorm";
import { compareValue, hashValue } from "../../utils/bcrypt";
import { Integration } from "./integrations.entity";
import { Event } from "./events.entity";
import { Meeting } from "./meetings.entity";
import { Availability } from "./availability.entity";
@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn("uuid") // This will generate a unique identifier for each user
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, unique: true })
    username: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: true })
    imageUrl: string;

    //relationships with other entities can be defined here

    // User - Integration relationship: One user can have many integrations
    @OneToMany(() => Integration, (integration) => integration.user, {
        cascade: true, // integration will be automatically persisted when the user is saved
    })
    integrations: Integration[];

    @OneToMany(() => Event, (event) => event.user)
    events: Event[];

    @OneToMany(()=>Meeting, (meetings)=> meetings.user)
    meetings: Meeting[];

    @OneToOne(()=>Availability, (availability)=> availability.user, {
        cascade: true, // availability will be automatically persisted when the user is saved
    })
    @JoinColumn() // This decorator is used to specify that this side of the relationship owns the foreign key
    availability: Availability;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    // Security measure to hash the password before saving it to the database
    async hashPassword() {
        if (this.password) {
            this.password = await hashValue(this.password);
        }
    }

    //helper fucntion, will be used to compare the password entered by the user with the hashed password stored in the database
    async comparePassword(candidatePassword: string): Promise<boolean> {
        return compareValue(candidatePassword, this.password);
    }
}
