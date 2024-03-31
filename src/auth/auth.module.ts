import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { LoginController } from './controllers/login.controller';
import { UsersService } from '../services/users.service';
import { UsersController } from 'src/modules/users/users.controller';
import { UserModel } from 'src/modules/users/entities/user.entity';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [UsersModule, UserModel],
  providers: [AuthService, AuthMiddleware, UsersService],
  controllers: [UsersController, LoginController],
})
export class AuthModule {}
