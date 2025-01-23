import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() user: UsersDto) {
    return this.userService.update(id, user);
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
  @Post()
  create(@Body() user: UsersDto) {
    return this.userService.create(user);
  }
}
