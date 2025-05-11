import { Injectable, OnModuleInit, Inject, Logger } from '@nestjs/common';
import { Kafka, Producer, ProducerRecord, Partitioners } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit {
  private readonly logger = new Logger(KafkaService.name);
  private producer: Producer;
  private isConnected = false;
  private kafka: Kafka;
  private readonly maxRetries = 10;
  private readonly initialDelay = 1000;
  private readonly maxDelay = 30000;

  constructor(
    @Inject('KAFKA_CONFIG')
    private readonly kafkaConfig: {
      clientId: string;
      brokers: string[];
    },
  ) {
    this.kafka = new Kafka({
      ...this.kafkaConfig,
      logLevel: 4,
    });
  }

  async onModuleInit() {
    await this.connectWithRetry();
  }

  private async connectWithRetry(retryCount = 0): Promise<void> {
    try {
      this.producer = this.kafka.producer({
        createPartitioner: Partitioners.LegacyPartitioner,
        retry: {
          initialRetryTime: 1000,
          retries: 5,
        },
      });

      await this.producer.connect();
      this.isConnected = true;
      this.logger.log('Successfully connected to Kafka');
    } catch (error) {
      if (retryCount < this.maxRetries) {
        const delay = Math.min(
          this.initialDelay * Math.pow(2, retryCount),
          this.maxDelay,
        );

        this.logger.warn(
          `Connection failed (attempt ${retryCount + 1}/${this.maxRetries}). Retrying in ${delay}ms...`,
        );

        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.connectWithRetry(retryCount + 1);
      }

      this.logger.error('Max connection retries reached. Kafka unavailable');
      this.isConnected = false;
    }
  }

  async publishNotification(message: any): Promise<boolean> {
    if (!this.isConnected) {
      this.logger.warn('Attempting to reconnect to Kafka...');
      await this.connectWithRetry();

      if (!this.isConnected) {
        this.logger.error('Message not sent - Kafka unavailable');
        return false;
      }
    }

    try {
      const record: ProducerRecord = {
        topic: 'notifications',
        messages: [{ value: JSON.stringify(message) }],
      };
      await this.producer.send(record);
      return true;
    } catch (error) {
      this.logger.error('Failed to publish notification', error);
      this.isConnected = false;
      return false;
    }
  }
}
