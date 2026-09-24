import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'users'})
export class User{
    @PrimaryGeneratedColumn("uuid") // This will generate a unique identifier for each user
    id:string;

    @Column({nullable: false}) 
    name: string;

    @Column({nullable: false, unique:true})
    username: string;
    
    @Column({nullable: false, unique:true})
    email: string;

    @Column({nullable: false})
    password: string;
    
    @Column({nullable: true})
    imageUrl: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
