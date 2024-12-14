import { Injectable, NotFoundException, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Attendance } from "src/typeorm/entities/Attendance.entity";
import { In, Repository } from "typeorm";
import { CreateAttendanceDto } from "./dto/attendance.dto";
import { User } from "src/typeorm/entities/User.entity";

@Injectable()
export class AttendanceService {
    constructor(
        @InjectRepository(Attendance)
        private readonly attendanceRepository: Repository<Attendance>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createAttendance(createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
      const existingAttendance = await this.attendanceRepository.findOne({ where: { userId: createAttendanceDto.userId, date: createAttendanceDto.date } });
  
      if (existingAttendance) {
          throw new Error(`Attendance record already exists for user ${createAttendanceDto.userId} on date ${createAttendanceDto.date}`);
      }
  
      const attendance = this.attendanceRepository.create(createAttendanceDto);
      return await this.attendanceRepository.save(attendance);
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

    async getAttendedUsers(date: string): Promise<{ userName: string; svcNo: string }[]> {
        const attendedUserIds = (
          await this.attendanceRepository.find({
            where: { onPerad: true, date },
            select: ['userId'],
          })
        ).map(att => att.userId);
    
        const attendedUsers = await this.userRepository.find({
          where: { id: In(attendedUserIds) },
          select: ['name', 'svcNo'],
        });
    
        return attendedUsers;
    }

    async getNotAttendedUsers(date: string): Promise<{ userName: string; svcNo: string;  }[]> {
        const notAttendedUserIds = (
          await this.attendanceRepository.find({
            where: { notOnPerad: true, date },
            select: ['userId'],
          })
        ).map(att => att.userId);
    
        const notAttendedUsers = await this.userRepository.find({
          where: { id: In(notAttendedUserIds) },
          select: ['name', 'svcNo'],
        });

        return notAttendedUsers;

    }

    async getNotAttendedUsersReason(date: string): Promise<{ userId: number; reason: String }[]> {
      const notAttendedUsers = await this.attendanceRepository.find({
        where: { notOnPerad: true, date },
        select: ['userId', 'reason', 'image'],
      });
  
      return notAttendedUsers.map(({ userId, reason, image }) => ({ userId, reason, image }));
    }

    async getAbsentAttendedUsers(date: string): Promise<{ userName: string; svcNo: string }[]> {
      const absentAttendedUserIds = (
        await this.attendanceRepository.find({
          where: { onPerad: true, absent: true, date },
          select: ['userId'],
        })
      ).map(att => att.userId);
  
      const absentAttendedUsers = await this.userRepository.find({
        where: { id: In(absentAttendedUserIds) },
        select: ['name', 'svcNo'],
      });
  
      return absentAttendedUsers;
  }

  async getAbsentNotAttendedUsers(date: string): Promise<{ userName: string; svcNo: string }[]> {
    const absentNotAttendedUserIds = (
      await this.attendanceRepository.find({
        where: { notOnPerad: true, absent: true, date },
        select: ['userId'],
      })
    ).map(att => att.userId);

    const absentNotAttendedUsers = await this.userRepository.find({
      where: { id: In(absentNotAttendedUserIds) },
      select: ['name', 'svcNo',],
    });

    return absentNotAttendedUsers;
  }

  async getAbsentNotAttendedUsersReason(date: string): Promise<{ userId: number; reason: String }[]> {
    const absentNotAttendedUsersReason = await this.attendanceRepository.find({
      where: { notOnPerad: true, absent: true, date },
      select: ['userId', 'reason', 'image'],
    });

    return absentNotAttendedUsersReason.map(({ userId, reason, image }) => ({ userId, reason, image }));
  }

  async updateAttendance(userId: number, date: string, updateAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
    const existingAttendance = await this.attendanceRepository.findOne({ where: { userId, date } });

    if (!existingAttendance) {
      throw new Error(`Attendance record not found for user ${userId} on date ${date}`);
    }

    Object.assign(existingAttendance, updateAttendanceDto);
    return this.attendanceRepository.save(existingAttendance);
}

async findUserIdBySVCPlatoonIntake(svcNo: string, platoon: string, intake: string): Promise<User> {
  const user = await this.userRepository.findOne({
    where: { svcNo, platoon, intake },
    select: ['id'],  
  });

  if (!user) {
    throw new NotFoundException(`User with SVC No: ${svcNo}, Platoon: ${platoon}, and Intake: ${intake} not found.`);
  }

  return user;  
}
}
