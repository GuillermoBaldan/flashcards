import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      try {
        const connection = await mongoose.connect(
          `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_INITDB_DATABASE}`,
        );
        console.log('Connected to MongoDB');
        return connection;
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
      }
    },
  },
];
