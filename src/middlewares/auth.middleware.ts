import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '@auth/services/auth.service';
import { UsersService } from '@services/users.service';
import { ERROR_MESSAGES } from '@errors/error-messages';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(ERROR_MESSAGES.NO_TOKEN_PROVIDED.code)
        .json({ message: ERROR_MESSAGES.NO_TOKEN_PROVIDED.message });
    }

    try {
      const decodedToken = this.authService.verifyToken(token);

      const user = await this.usersService.findOne(decodedToken.id);
      if (!user) {
        return res
          .status(ERROR_MESSAGES.USER_NOT_FOUND.code)
          .json({ message: ERROR_MESSAGES.USER_NOT_FOUND.message });
      }

      req.user = decodedToken;
      next();
    } catch (error) {
      return res
        .status(ERROR_MESSAGES.INVALID_OR_EXPIRED_TOKEN.code)
        .json({ message: ERROR_MESSAGES.INVALID_OR_EXPIRED_TOKEN.message });
    }
  }
}
