import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { PasswordHelper } from 'src/helpers/password.helper';
import { UsersService } from 'src/services/users.service';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET = '3x@mpl3_S3cr3t_K3y_!@#_2025';

  constructor(private readonly usersService: UsersService) {}

  generateToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.JWT_SECRET, { expiresIn: '1h' });
  }

  verifyToken(token: string): any {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new Error('Invalid or expired token');
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
      return null;
    }

    const passwordMatch = await this.comparePassword(password, user.password);
    if (!passwordMatch) {
      return null;
    }

    return user;
  }
}
