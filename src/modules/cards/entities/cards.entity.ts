import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Card {
  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  answer: string;

  @Prop({ required: true })
  AT: number;

  @Prop({ required: true })
  lastTime: Date;

  @Prop({ required: true })
  nextTime: Date;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  deckId: string;
}

export type CardDocument = Card & Document;

export const CardSchema = SchemaFactory.createForClass(Card);

export const CardModel = MongooseModule.forFeature([
  { name: Card.name, schema: CardSchema },
]);
