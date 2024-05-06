import { Body, Controller, Post, Get, Param, Query, Put} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/attendance.dto';
import { Attendance } from 'src/typeorm/entities/Attendance.entity';

@Controller('attendance')
export class AttendanceController {
    constructor(private readonly attendanceService: AttendanceService) {}

    @Post()
    async createAttendance(@Body() createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
        return await this.attendanceService.createAttendance(createAttendanceDto);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Attendance> {
        return await this.attendanceService.findOne(parseInt(id, 10));
    }

    @Get()
    async findAll(): Promise<Attendance[]> {
        return await this.attendanceService.findAll();
    }

    @Get('stats/:date')
    async getAttendanceStats(@Param('date') date: string): Promise<{ onPerad: number; notOnPerad: number; absent: number }> {
      return await this.attendanceService.getAttendanceStats(date);
    }

    @Get('attended-users/:date')
      async getAttendedUsers(@Param('date') date: string) {
      return await this.attendanceService.getAttendedUsers(date);
    }

    @Get('not-attended-users/:date')
      async getNotAttendedUsers(@Param('date') date: string) {
      return await this.attendanceService.getNotAttendedUsers(date);
    }

    @Get('not-attended-users/reason/:date')
    async getNotAttendedUsersReason(@Param('date') date: string): Promise<{ userId: number; reason: String }[]> {
      return this.attendanceService.getNotAttendedUsersReason(date);
    }

    @Get('absent/attended-users/:date')
      async getAbsentAttendedUsers(@Param('date') date: string) {
      return await this.attendanceService.getAbsentAttendedUsers(date);
    }

    @Get('absent/not-attended-users/:date')
      async getAbsentNotAttendedUsers(@Param('date') date: string) {
      return await this.attendanceService.getAbsentNotAttendedUsers(date);
    }

    @Get('absent/not-attended-users/reason/:date')
    async getAbsentNotAttendedUsersReason(@Param('date') date: string): Promise<{ userId: number; reason: String }[]> {
      return this.attendanceService.getAbsentNotAttendedUsersReason(date);
    }

    @Put('update/:userId/:date')
    async updateAttendance(
      @Param('userId') userId: number,
      @Param('date') date: string,
      @Body() updateAttendanceDto: CreateAttendanceDto,
    ): Promise<Attendance> {
      return this.attendanceService.updateAttendance(userId, date, updateAttendanceDto);
    }

}
