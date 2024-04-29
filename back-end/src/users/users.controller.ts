import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users.dto';
import { User } from 'src/typeorm/entities/User.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.usersService.createUser(createUserDto);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
        return await this.usersService.findOne(parseInt(id, 10));
    }

    @Get()
    async findAll(): Promise<User[]> {
        return await this.usersService.findAll();
    }

    @Get(':svcNo/:platoon/:intake')
    async getUserIdBySvcNoPlatoonAndIntake(
      @Param('svcNo') svcNo: string,
      @Param('platoon') platoon: string,
      @Param('intake') intake: string,
    ): Promise<number | null> {
      return this.usersService.getUserIdBySvcNoPlatoonAndIntake(svcNo, platoon, intake);
    }
}
