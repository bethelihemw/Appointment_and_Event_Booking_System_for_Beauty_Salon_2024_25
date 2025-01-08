import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<User> {
    return this.usersService.create(username, password, ['user']); 
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':username')
  async findOne(@Param('username') username: string): Promise<User> {
    return this.usersService.findByUsername(username);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<User> {
    return this.usersService.update(id, username, password);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
