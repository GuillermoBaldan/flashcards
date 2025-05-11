import { Module } from '@nestjs/common';
import { KafkaService } from '@services/kafka.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'KAFKA_CONFIG',
      useFactory: (
        configService: ConfigService,
      ): { clientId: string; brokers: string[] } => ({
        clientId: configService.get<string>('KAFKA_CLIENT_ID'),
        brokers: [configService.get<string>('KAFKA_BROKER')],
      }),
      inject: [ConfigService],
    },
    KafkaService,
  ],
  exports: [KafkaService],
})
export class KafkaModule {}
