import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { Attendance } from 'src/typeorm/entities/Attendance.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance])],
  providers: [AttendanceService],
  controllers: [AttendanceController]
})
export class AttendanceModule {}
