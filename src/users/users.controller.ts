import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dto/users.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserEntity } from './user.entity';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  findAll(
    @Query() query,
  ): Promise<{ data: UserEntity[]; total: number; hasNext: boolean }> {
    const { page } = query;
    return this.userService.findAll(page);
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
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    return 'Uploaded file successfully.';
  }
}
