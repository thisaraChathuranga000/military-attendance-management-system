import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Attendance } from './Attendance.entity';

@Entity({ name: 'users'})
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id:number;

    @Column()
    userName: string;

    @Column()
    password: string;

    @Column({unique: true})
    svcNo: string;

    @Column()
    name: string;

    @Column()
    intake: string;

    @Column()
    platoon: string;
}