import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseInterceptors,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from '../../services/users.service';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { isEmail } from 'class-validator';
import { Request } from 'express';
import { ERROR_MESSAGES } from 'src/errors/error-messages';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request (invalid email format, weak password, etc.)',
  })
  @UseInterceptors(AuthMiddleware)
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ message: string }> {
    const { email } = createUserDto;

    if (!isEmail(email)) {
      throw new BadRequestException(
        ERROR_MESSAGES.INVALID_EMAIL_FORMAT.message,
      );
    }

    const existingUser = await this.usersService.findByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new BadRequestException(
        ERROR_MESSAGES.EMAIL_ALREADY_EXISTS.message,
      );
    }

    await this.usersService.create(createUserDto);

    return { message: 'Usuario creado exitosamente' };
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users',
    type: User,
    isArray: true,
  })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get()
  @ApiOperation({ summary: 'Get the current user' })
  @ApiResponse({
    status: 200,
    description: 'Details of the current user',
    type: User,
  })
  async findOneByCookie(@Req() req: Request): Promise<User> {
    const userId = req.user.id;
    return this.usersService.findOne(userId);
  }

  @Patch()
  @ApiOperation({ summary: 'Update the current user' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated',
    type: User,
  })
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ): Promise<User> {
    const userId = req.user.id;
    if (updateUserDto.username) {
      await this.usersService.updateUsername(userId, updateUserDto.username);
    }

    if (updateUserDto.password) {
      await this.usersService.updatePassword(userId, updateUserDto.password);
    }

    if (updateUserDto.email) {
      await this.usersService.updateEmail(userId, updateUserDto.email);
    }

    return this.usersService.findOne(userId);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete the current user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted',
    type: User,
  })
  async remove(@Req() req: Request): Promise<User> {
    const userId = req.user.id;
    return this.usersService.remove(userId);
  }
}
