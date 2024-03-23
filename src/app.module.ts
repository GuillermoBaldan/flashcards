import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './schemas/users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admintres:admintres@mongo_db:27017/'),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
