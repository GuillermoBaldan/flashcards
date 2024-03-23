import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './entities/user.entity';
import { CardsController } from './cards/cards.controller';
import { CollectionsController } from './collections/collections.controller';
import { CardsService } from './cards/cards.service';
import { CollectionsService } from './collections/collection.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController, CardsController, CollectionsController],
  providers: [UsersService, CardsService, CollectionsService],
})
export class UsersModule {}
