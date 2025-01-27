import { Body, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UsersDto } from './dto/users.dto';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>,
  ) {}
  async findAll(
    page: number,
  ): Promise<{ data: UserEntity[]; total: number; hasNext: boolean }> {
    const result = await this.usersRepository.findAndCount({
      take: 10,
      skip: page * 10,
    });

    const data = result[0];
    const total = result[1];
    return {
      data: data,
      total: total,
      hasNext: data.length === 10 && 10 * page < total,
    };
  }
  findOne(@Param('id') id: number): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ id });
  }
  findByEmail(email: string): Promise<UserEntity> {
    return this.usersRepository.findOneByOrFail({ email });
  }
  async remove(@Param('id') id: number): Promise<void> {
    await this.usersRepository.delete({ id });
  }
  async update(@Param('id') id: number, @Body() user: UsersDto): Promise<void> {
    user.password = hashSync(user.password, 10);
    await this.usersRepository.update(id, user);
  }
  async create(user: UsersDto): Promise<void> {
    user.password = hashSync(user.password, 10);
    await this.usersRepository.save(user);
  }
}
