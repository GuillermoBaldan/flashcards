import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from 'src/services/users.service';
import { UserModel } from './entities/user.entity';
import { AuthService } from 'src/auth/services/auth.service';

@Module({
  imports: [UserModel],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  exports: [UsersService]
})
export class UsersModule {}
