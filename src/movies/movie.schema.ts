import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MoviesDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  rating: number;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
