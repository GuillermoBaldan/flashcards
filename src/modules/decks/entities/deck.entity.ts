import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Deck {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  color: string;

  @Prop({ type: [{ type: String, ref: 'idCard' }] })
  cards_id: string[];

  @Prop({ required: true })
  userId: string;
}
export type DeckDocument = Deck & Document;

export const DeckSchema = SchemaFactory.createForClass(Deck);

export const DeckModel = MongooseModule.forFeature([
  { name: Deck.name, schema: DeckSchema },
]);
