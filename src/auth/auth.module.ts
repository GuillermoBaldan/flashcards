import { Module } from '@nestjs/common';
import { AuthService } from '@auth/services/auth.service';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { LoginController } from '@auth/controllers/login.controller';
import { LogoutController } from '@auth/controllers/logout.controller';
import { UsersService } from '@services/users.service';
import { UsersController } from '@modules/users/users.controller';
import { UserModel } from '@modules/users/entities/user.entity';
import { UsersModule } from '@modules/users/users.module';

@Module({
  imports: [UsersModule, UserModel],
  providers: [AuthService, AuthMiddleware, UsersService],
  controllers: [UsersController, LoginController, LogoutController],
  exports: [AuthService],
})
export class AuthModule {}
