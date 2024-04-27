import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User.entity';
import { Attendance } from './typeorm/entities/Attendance.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'user2',
    password: '',
    database: 'attendance_System',
    entities: [User, Attendance],
    synchronize: false,
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
