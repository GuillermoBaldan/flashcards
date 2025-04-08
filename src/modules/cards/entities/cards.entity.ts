import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Card {
  @Prop({ required: true })
  front: string;

  @Prop({ required: true })
  back: string;

  @Prop({ type: String, required: true })
  deckId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  cardType: string;

  @Prop({ required: true, default: 3 })
  difficulty: number;

  @Prop({ required: true, default: Date.now })
  lastReview: Date;

  @Prop({ type: Object, required: true })
  gameOptions: Record<string, any>;
}

export type CardDocument = Card & Document;

export const CardSchema = SchemaFactory.createForClass(Card);

export const CardModel = MongooseModule.forFeature([
  { name: Card.name, schema: CardSchema },
]);
