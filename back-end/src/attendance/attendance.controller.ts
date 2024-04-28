import { Body, Controller, Post, Get, Param, Query} from '@nestjs/common';
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

    @Get('stats/:date') // Use path parameter for date
  async getAttendanceStats(@Param('date') date: string): Promise<{ onPerad: number; notOnPerad: number; absent: number }> {
    return await this.attendanceService.getAttendanceStats(date);
  }
}
