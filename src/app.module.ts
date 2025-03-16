import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DecksModule } from './modules/decks/decks.module';
import { CardsModule } from './modules/cards/cards.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { AuthService } from './auth/services/auth.service';
import { UsersService } from './services/users.service';
import { UserModel } from './modules/users/entities/user.entity';
import { routes, RouteConfig } from './config/routes';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_INITDB_DATABASE}`,
    ),
    DecksModule,
    CardsModule,
    AuthModule,
    UserModel,
  ],
  providers: [AuthService, UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    routes.forEach((route: RouteConfig) => {
      if (route.requiresAuth) {
        const excludedMethods = route.excludeFromAuth || [];
        consumer
          .apply(AuthMiddleware)
          .exclude(
            ...excludedMethods.map((method) => ({ method, path: route.path })),
          )
          .forRoutes(route.path);
      }
    });
  }
}
