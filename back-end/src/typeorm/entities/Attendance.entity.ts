import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

    @Column({default: ""})
    reason: String;

    @Column()
    date: String;

    @Column()
    userId: number;

    @Column({default: null})
    image: String;
}
