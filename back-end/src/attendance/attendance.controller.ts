import { Body, Controller, Post, Get, Param} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/attendance.dto';
import { Attendance } from 'src/typeorm/entities/Attendance.entity';

@Controller('attendance')
export class AttendanceController {
    constructor(private readonly attendanceService: AttendanceService) {}

    @Post()
    async createUser(@Body() createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
        return await this.attendanceService.createUser(createAttendanceDto);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Attendance> {
        return await this.attendanceService.findOne(parseInt(id, 10));
    }

    @Get()
    async findAll(): Promise<Attendance[]> {
        return await this.attendanceService.findAll();
    }
}
