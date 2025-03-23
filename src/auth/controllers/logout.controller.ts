import {
  Controller,
  Post,
  HttpStatus,
  Res,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Response } from 'express';

@Controller('logout')
@ApiTags('logout')
export class LogoutController {
  @Post()
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'Logout successful' })
  async logout(@Res() res: Response): Promise<void> {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });
    res.status(HttpStatus.OK).send();
  }
} 