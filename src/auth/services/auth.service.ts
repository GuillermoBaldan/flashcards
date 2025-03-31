import * as jwt from 'jsonwebtoken';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { PasswordHelper } from 'src/helpers/password.helper';
import { UsersService } from 'src/services/users.service';
import { User } from 'src/modules/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { ERROR_MESSAGES } from 'src/errors/error-messages';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET: string;
  private readonly JWT_EXPIRATION: string;

  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    this.JWT_SECRET = this.configService.get<string>('JWT_SECRET');
    this.JWT_EXPIRATION = this.configService.get<string>('JWT_EXPIRATION');
  }

  generateToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: this.JWT_EXPIRATION,
    });
  }

  verifyToken(token: string): any {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new Error(ERROR_MESSAGES.INVALID_OR_EXPIRED_TOKEN.message);
    }
  }

  async hashPassword(password: string): Promise<string> {
    return PasswordHelper.hashPassword(password);
  }

  async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return PasswordHelper.comparePassword(plainPassword, hashedPassword);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND.message);
    }

    const passwordMatch = await this.comparePassword(password, user.password);
    if (!passwordMatch) {
      throw new BadRequestException(ERROR_MESSAGES.INVALID_EMAIL_OR_PASSWORD.message);
    }

    return user;
  }
}
