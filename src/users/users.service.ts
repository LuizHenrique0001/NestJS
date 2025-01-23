import { Body, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/User';
import { Repository } from 'typeorm';
import { UsersDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  findOne(@Param('id') id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }
  async remove(@Param('id') id: number): Promise<void> {
    await this.usersRepository.delete({ id });
  }
  async update(@Param('id') id: number, @Body() user: UsersDto): Promise<void> {
    await this.usersRepository.update(id, user);
  }
  async create(user: UsersDto): Promise<void> {
    await this.usersRepository.save(user);
  }
}
