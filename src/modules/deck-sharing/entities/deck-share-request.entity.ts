import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { StatusType } from '@constants/constants';

export type DeckShareRequestDocument = DeckShareRequest & Document;

@Schema({ timestamps: true })
export class DeckShareRequest {
  @Prop({ required: true })
  requestId: string;

  @Prop({ required: true })
  senderId: string;

  @Prop({ required: true })
  receiverId: string;

  @Prop({ required: true })
  deckId: string;

  @Prop({
    required: true,
    enum: ['pending', 'accepted', 'rejected', 'expired'],
    default: 'pending',
  })
  status: StatusType;

  @Prop()
  expiresAt: Date;
}

export const DeckShareRequestSchema =
  SchemaFactory.createForClass(DeckShareRequest);
