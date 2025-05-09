import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcServerOptions } from '@grpc/grpc.server';
import { NotificationsGrpcService } from '@services/notifications.service';

@Module({
  imports: [ClientsModule.register([grpcServerOptions])],
  providers: [NotificationsGrpcService],
  exports: [NotificationsGrpcService],
})
export class GrpcModule {}
