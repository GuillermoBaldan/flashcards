import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KafkaService implements OnModuleInit {
  private client: ClientKafka;

  constructor(private readonly configService: ConfigService) {
    this.client = new ClientKafka({
      client: {
        brokers: [this.configService.get<string>('KAFKA_BROKERS')],
      },
      producer: {
        allowAutoTopicCreation: true,
      },
    });
  }

  async onModuleInit() {
    await this.client.connect();
  }

  async publishNotification(notification: any) {
    await this.client.emit('notifications', {
      key: notification.userId,
      value: JSON.stringify(notification),
    });
  }
}
