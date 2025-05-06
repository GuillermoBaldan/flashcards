import { Module } from '@nestjs/common';
import { UsersController } from '@modules/users/users.controller';
import { UsersService } from '@services/users.service';
import { UserModel } from '@modules/users/entities/user.entity';
import { AuthService } from '@auth/services/auth.service';

@Module({
  imports: [UserModel],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  exports: [UsersService],
})
export class UsersModule {}
