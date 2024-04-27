import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User.entity';

@Entity({ name: 'attendance'})
export class Attendance {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id:number;

    @Column({default: false})
    onPerad: boolean;

    @Column({default: false})
    notOnPerad: boolean;

    @Column({default: false})
    absent : boolean;

    @Column()
    date: String;

    @Column()
    userId: number;
}
