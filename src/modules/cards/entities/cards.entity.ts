import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Card {
  @Prop({ required: true })
  front: string;

  @Prop({ required: true })
  back: string;

  @Prop({ required: true })
  deckId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  cardType: string;

  @Prop({ required: true, default: 0 })
  AT: number;

  @Prop({ required: true, default: Date.now })
  lastTime: Date;

  @Prop({ required: true, default: Date.now })
  nextTime: Date;

  @Prop({ type: Object, required: true })
  gameOptions: Record<string, any>;
}

export type CardDocument = Card & Document;

export const CardSchema = SchemaFactory.createForClass(Card);

export const CardModel = MongooseModule.forFeature([
  { name: Card.name, schema: CardSchema },
]);
