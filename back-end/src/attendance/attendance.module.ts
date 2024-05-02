import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { Attendance } from 'src/typeorm/entities/Attendance.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance, User])],
  providers: [AttendanceService],
  controllers: [AttendanceController]
})
export class AttendanceModule {}
