import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(createUserDto);
        return await this.userRepository.save(user);
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id }});
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUserIdBySvcNoPlatoonAndIntake(svcNo: string, platoon: string, intake: string): Promise<number | null> {
        const user = await this.userRepository.findOne({
          where: { svcNo, platoon, intake },
          select: ['id']
        });
        return user ? user.id : null;
    }
}
