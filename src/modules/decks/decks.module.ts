import { Module } from '@nestjs/common';
import { DeckModel } from './entities/deck.entity';
import { DecksService } from 'src/services/decks.service';
import { DecksController } from './decks.controller';
import { UsersService } from 'src/services/users.service';
import { UserModel } from '../users/entities/user.entity';
import { AuthService } from 'src/auth/services/auth.service';

@Module({
  imports: [DeckModel, UserModel],
  controllers: [DecksController],
  providers: [DecksService, UsersService, AuthService],
})
export class DecksModule {}
