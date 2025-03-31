import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Res,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { Response } from 'express';

@Controller('login')
@ApiTags('login')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiBadRequestResponse({ description: 'Invalid email or password' })
  async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<void> {
    const { email, password } = loginDto;

    const user = await this.authService.validateUser(email, password);
    const payload: JwtPayload = { id: user._id, email: user.email };
    const token = this.authService.generateToken(payload);

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 3600000,
    });
    res.status(HttpStatus.OK).send();
  }
}
