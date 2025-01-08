import { Schema as MongooseSchema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@MongooseSchema() 
export class User extends Document {
  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop([String])
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
