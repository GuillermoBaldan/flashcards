import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DecksModule } from './modules/decks/decks.module';
import { CardsModule } from './modules/cards/cards.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { AuthService } from './auth/services/auth.service';
import { UsersService } from './services/users.service';
import { UserModel } from './modules/users/entities/user.entity';
import { routes, RouteConfig } from './config/routes';
import { SanitizeMiddleware } from './middlewares/sanitize.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const env = configService.get<string>('NODE_ENV');
        let host, port;

        switch (env) {
          case 'docker':
            host = configService.get<string>('MONGO_DOCKER_HOST');
            port = configService.get<string>('MONGO_DOCKER_PORT');
            break;
          case 'dev':
            host = configService.get<string>('MONGO_DEV_HOST');
            port = configService.get<string>('MONGO_DEV_PORT');
            break;
          case 'prod':
            host = configService.get<string>('MONGO_PROD_HOST');
            port = configService.get<string>('MONGO_PROD_PORT');
            break;
          default:
            host = configService.get<string>('MONGO_LOCAL_HOST');
            port = configService.get<string>('MONGO_LOCAL_PORT');
        }
        return {
          uri: `mongodb://${configService.get<string>('MONGO_INITDB_ROOT_USERNAME')}:${configService.get<string>('MONGO_INITDB_ROOT_PASSWORD')}@${host}:${port}/${configService.get<string>('MONGO_INITDB_DATABASE')}?authSource=admin`,
        };
      },
      inject: [ConfigService],
    }),
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

    consumer.apply(SanitizeMiddleware).forRoutes('cards');
  }
}
