import { Injectable, NotFoundException, Param } from "@nestjs/common";
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

    async getAttendanceStats(@Param('date') date: string): Promise<{ 
        onPerad: number; 
        notOnPerad: number; 
        absent: number, 
        total: number 
    }> {
        const attendanceData = await this.attendanceRepository.find({
          where: { date },
        });

        const onPeradCount = attendanceData.filter((attendance) => attendance.onPerad).length;
        const notOnPeradCount = attendanceData.filter((attendance) => attendance.notOnPerad).length;
        const absentCount = attendanceData.filter((attendance) => attendance.absent).length;
        const total = onPeradCount + notOnPeradCount;
    
        const stats = {
          onPerad: onPeradCount,
          notOnPerad: notOnPeradCount,
          absent: absentCount,
          total: total 
        };
        return stats;
      }
}
