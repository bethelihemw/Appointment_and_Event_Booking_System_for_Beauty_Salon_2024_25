
import { Schema as MongooseSchema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@MongooseSchema()
export class Appointment extends Document {
  @Prop({ required: true })
  clientName: string;

  @Prop({ required: true })
  service: string;

  @Prop({ required: true })
  appointmentDate: Date;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
