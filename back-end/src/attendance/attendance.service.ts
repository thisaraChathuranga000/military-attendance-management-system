import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Attendance } from "src/typeorm/entities/Attendance.entity";
import { Repository } from "typeorm";
import { CreateAttendanceDto } from "./dto/attendance.dto";

@Injectable()
export class AttendanceService {
    constructor(
        @InjectRepository(Attendance)
        private readonly attendanceRepository: Repository<Attendance>,
    ) {}

    async createUser(createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
        const user = this.attendanceRepository.create(createAttendanceDto);
        return await this.attendanceRepository.save(user);
    }

    async findOne(id: number): Promise<Attendance> {
        const user = await this.attendanceRepository.findOne({ where: { id }});
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async findAll(): Promise<Attendance[]> {
        return await this.attendanceRepository.find();
    }
}
