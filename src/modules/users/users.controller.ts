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
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { UpdateUserDto } from '@modules/users/dto/update-user.dto';
import { User } from '@modules/users/entities/user.entity';
import { UsersService } from '@services/users.service';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { isEmail } from 'class-validator';
import { Request } from 'express';
import { ERROR_MESSAGES } from '@errors/error-messages';

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

  @Get('email')
  @ApiOperation({ summary: 'Get the current user email' })
  @ApiResponse({
    status: 200,
    description: 'Email of the current user',
    type: String,
  })
  async getEmail(@Req() req: Request): Promise<string> {
    const userId = req.user.id;
    const user = await this.usersService.findOne(userId);
    return user.email;
  }

  @Get('username')
  @ApiOperation({ summary: 'Get the current user username' })
  @ApiResponse({
    status: 200,
    description: 'Username of the current user',
    type: String,
  })
  async getUsername(@Req() req: Request): Promise<string> {
    const userId = req.user.id;
    const user = await this.usersService.findOne(userId);
    return user.username;
  }

  @Get('created-at')
  @ApiOperation({ summary: 'Get the account creation date' })
  @ApiResponse({
    status: 200,
    description: 'Account creation date',
    type: Date,
  })
  async getCreatedAt(@Req() req: Request): Promise<Date> {
    const userId = req.user.id;
    const user = await this.usersService.findOne(userId);
    return user.createdAt;
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

  @Get('search')
  @ApiOperation({ summary: 'Buscar usuarios por username' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios encontrados',
    type: [User],
  })
  @UseGuards(AuthMiddleware)
  async searchUsers(@Query('term') term: string, @Req() req: Request) {
    if (!term || term.length < 3) {
      throw new BadRequestException(
        'El término de búsqueda debe tener al menos 3 caracteres',
      );
    }
    return this.usersService.searchUsers(term, req.user.id);
  }
}
