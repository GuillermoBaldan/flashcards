import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      try {
        const connection = await mongoose.connect(
          'mongodb://admin:admin@localhost:27030/admin',
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
