import { Transport, GrpcOptions } from '@nestjs/microservices';
import { join } from 'path';

export const grpcServerOptions: GrpcOptions & { name: string } = {
  name: 'FLASHCARDS_SERVICE',
  transport: Transport.GRPC,
  options: {
    package: 'proto',
    protoPath: join(process.cwd(), 'src/modules/grpc/flashcards.proto'),
    url: '0.0.0.0:50051',
  },
};
