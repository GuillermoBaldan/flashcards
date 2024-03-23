import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop({ type: Map, of: Object, default: {} })
  collections: Record<
    string,
    Array<{
      _id: string;
      question: string;
      answers: Record<string, string>;
      correctAnswer: string;
    }>
  >;
}

export const UserSchema = SchemaFactory.createForClass(User);
