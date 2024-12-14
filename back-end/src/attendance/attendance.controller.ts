import { Body, Controller, Post, Get, Param, Query, Put, UseInterceptors, UploadedFile, Res, UsePipes, ValidationPipe} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto, newAttendance, NewAttendanceByUdc } from './dto/attendance.dto';
import { Attendance } from 'src/typeorm/entities/Attendance.entity';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/attendance',
      filename: (req, file, callback) => {
        const uniqueName = `${Date.now()}${extname(file.originalname)}`;
        callback(null, uniqueName);
      },
    }),
  }))
  async createAttendance(
    @Body() newAttendance: newAttendance,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Attendance> {
    const APPLICATION_DOMAIN = 'http://localhost:';
    const APPLICATION_PORT = '5000';
    console.log(newAttendance)

    if(newAttendance.onPerad === "true" && newAttendance.notOnPerad === "false" && newAttendance.absent === "false"){
      const createAttendanceDto : CreateAttendanceDto = {
        onPerad: true, 
        notOnPerad:  false,
        absent: false,
        reason:  newAttendance.reason,
        date: newAttendance.date,
        userId:  Number(newAttendance.userId),
        image: file ? `${APPLICATION_DOMAIN}${APPLICATION_PORT}/attendance/img/${file.filename}` : null
      }
      return await this.attendanceService.createAttendance(createAttendanceDto);
    }

    if(newAttendance.onPerad === "false" && newAttendance.notOnPerad === "true" && newAttendance.absent === "false"){
      const createAttendanceDto : CreateAttendanceDto = {
        onPerad: false, 
        notOnPerad:  true,
        absent: false,
        reason:  newAttendance.reason,
        date: newAttendance.date,
        userId:  Number(newAttendance.userId),
        image: file ? `${APPLICATION_DOMAIN}${APPLICATION_PORT}/attendance/img/${file.filename}` : null
      }
      return await this.attendanceService.createAttendance(createAttendanceDto);
    }

    if(newAttendance.onPerad === "true" && newAttendance.notOnPerad === "false" && newAttendance.absent === "true"){
      const createAttendanceDto : CreateAttendanceDto = {
        onPerad: true, 
        notOnPerad:  false,
        absent: true,
        reason:  newAttendance.reason,
        date: newAttendance.date,
        userId:  Number(newAttendance.userId),
        image: file ? `${APPLICATION_DOMAIN}${APPLICATION_PORT}/attendance/img/${file.filename}` : null
      }
      return await this.attendanceService.createAttendance(createAttendanceDto);
    }

    if(newAttendance.onPerad === "false" && newAttendance.notOnPerad === "true" && newAttendance.absent === "true"){
      const createAttendanceDto : CreateAttendanceDto = {
        onPerad: false, 
        notOnPerad:  true,
        absent: true,
        reason:  newAttendance.reason,
        date: newAttendance.date,
        userId:  Number(newAttendance.userId),
        image: file ? `${APPLICATION_DOMAIN}${APPLICATION_PORT}/attendance/img/${file.filename}` : null
      }
      return await this.attendanceService.createAttendance(createAttendanceDto);
    }
  }

  @Post('/byUdc')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/attendance',
      filename: (req, file, callback) => {
        const uniqueName = `${Date.now()}${extname(file.originalname)}`;
        callback(null, uniqueName);
      },
    }),
  }))
  async createAttendanceByUdc(
    @Body() newAttendanceByUdc: NewAttendanceByUdc,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Attendance> {
    const APPLICATION_DOMAIN = 'http://localhost:';
    const APPLICATION_PORT = '5000';
    console.log(newAttendance)

    const user = await this.attendanceService.findUserIdBySVCPlatoonIntake(newAttendanceByUdc.svcNo, newAttendanceByUdc.platoon, newAttendanceByUdc.intake)

    if(newAttendanceByUdc.onPerad === "true" && newAttendanceByUdc.notOnPerad === "false" && newAttendanceByUdc.absent === "false"){
      const createAttendanceDto : CreateAttendanceDto = {
        onPerad: true, 
        notOnPerad:  false,
        absent: false,
        reason:  newAttendanceByUdc.reason,
        date: newAttendanceByUdc.date,
        userId:  user.id,
        image: file ? `${APPLICATION_DOMAIN}${APPLICATION_PORT}/attendance/img/${file.filename}` : null
      }
      return await this.attendanceService.createAttendance(createAttendanceDto);
    }

    if(newAttendanceByUdc.onPerad === "false" && newAttendanceByUdc.notOnPerad === "true" && newAttendanceByUdc.absent === "false"){
      const createAttendanceDto : CreateAttendanceDto = {
        onPerad: false, 
        notOnPerad:  true,
        absent: false,
        reason:  newAttendanceByUdc.reason,
        date: newAttendanceByUdc.date,
        userId: user.id,
        image: file ? `${APPLICATION_DOMAIN}${APPLICATION_PORT}/attendance/img/${file.filename}` : null
      }
      return await this.attendanceService.createAttendance(createAttendanceDto);
    }

    if(newAttendanceByUdc.onPerad === "true" && newAttendanceByUdc.notOnPerad === "false" && newAttendanceByUdc.absent === "true"){
      const createAttendanceDto : CreateAttendanceDto = {
        onPerad: true, 
        notOnPerad:  false,
        absent: true,
        reason:  newAttendanceByUdc.reason,
        date: newAttendanceByUdc.date,
        userId:  user.id,
        image: file ? `${APPLICATION_DOMAIN}${APPLICATION_PORT}/attendance/img/${file.filename}` : null
      }
      return await this.attendanceService.createAttendance(createAttendanceDto);
    }

    if(newAttendanceByUdc.onPerad === "false" && newAttendanceByUdc.notOnPerad === "true" && newAttendanceByUdc.absent === "true"){
      const createAttendanceDto : CreateAttendanceDto = {
        onPerad: false, 
        notOnPerad:  true,
        absent: true,
        reason:  newAttendanceByUdc.reason,
        date: newAttendanceByUdc.date,
        userId:  user.id,
        image: file ? `${APPLICATION_DOMAIN}${APPLICATION_PORT}/attendance/img/${file.filename}` : null
      }
      return await this.attendanceService.createAttendance(createAttendanceDto);
    }
  }

  @Get('img/:imgPath')
  seeUploadedFile(@Param('imgPath') imgPath: string, @Res() res: Response): void {
    const uploadPath = 'uploads/attendance';
    return res.sendFile(imgPath, { root: uploadPath });
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
  async getAttendanceStats(
    @Param('date') date: string,
  ): Promise<{ onPerad: number; notOnPerad: number; absent: number }> {
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
  async getNotAttendedUsersReason(
    @Param('date') date: string,
  ): Promise<{ userId: number; reason: String }[]> {
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
  async getAbsentNotAttendedUsersReason(
    @Param('date') date: string,
  ): Promise<{ userId: number; reason: String }[]> {
    return this.attendanceService.getAbsentNotAttendedUsersReason(date);
  }


  @Put('update/:userId/:date')
@UsePipes(new ValidationPipe())
@UseInterceptors(FileInterceptor('file', {
  storage: diskStorage({
    destination: './uploads/attendance',
    filename: (req, file, callback) => {
      const uniqueName = `${Date.now()}${extname(file.originalname)}`;
      callback(null, uniqueName);
    },
  }),
}))
async updateAttendance(
  @Param('userId') userId: number,
  @Param('date') date: string,
  @Body() newAttendance: any,
  @UploadedFile() file: Express.Multer.File,
): Promise<Attendance> {
  const APPLICATION_DOMAIN = 'http://localhost:';
  const APPLICATION_PORT = '5000';
  console.log(newAttendance);

  let updateAttendanceDto: CreateAttendanceDto;

  if (newAttendance.onPerad === 'true' && newAttendance.notOnPerad === 'false' && newAttendance.absent === 'false') {
    updateAttendanceDto = {
      onPerad: true,
      notOnPerad: false,
      absent: false,
      reason: newAttendance.reason,
      date: newAttendance.date,
      userId: Number(newAttendance.userId),
      image: file ? `${APPLICATION_DOMAIN}${APPLICATION_PORT}/attendance/img/${file.filename}` : null,
    };
  } else if (newAttendance.onPerad === 'false' && newAttendance.notOnPerad === 'true' && newAttendance.absent === 'false') {
    updateAttendanceDto = {
      onPerad: false,
      notOnPerad: true,
      absent: false,
      reason: newAttendance.reason,
      date: newAttendance.date,
      userId: Number(newAttendance.userId),
      image: file ? `${APPLICATION_DOMAIN}${APPLICATION_PORT}/attendance/img/${file.filename}` : null,
    };
  } else if (newAttendance.onPerad === 'true' && newAttendance.notOnPerad === 'false' && newAttendance.absent === 'true') {
    updateAttendanceDto = {
      onPerad: true,
      notOnPerad: false,
      absent: true,
      reason: newAttendance.reason,
      date: newAttendance.date,
      userId: Number(newAttendance.userId),
      image: file ? `${APPLICATION_DOMAIN}${APPLICATION_PORT}/attendance/img/${file.filename}` : null,
    };
  } else if (newAttendance.onPerad === 'false' && newAttendance.notOnPerad === 'true' && newAttendance.absent === 'true') {
    updateAttendanceDto = {
      onPerad: false,
      notOnPerad: true,
      absent: true,
      reason: newAttendance.reason,
      date: newAttendance.date,
      userId: Number(newAttendance.userId),
      image: file ? `${APPLICATION_DOMAIN}${APPLICATION_PORT}/attendance/img/${file.filename}` : null,
    };
  } else {
    throw new Error('Invalid attendance status provided');
  }

  // Call the service to update the attendance record
  return await this.attendanceService.updateAttendance(userId, date, updateAttendanceDto);
}
}
