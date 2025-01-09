import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AppointmentDocument = HydratedDocument<Appointment>;

@Schema()
export class Appointment {
    @Prop({ required: true })
    customerName: string;

    @Prop({ required: true })
    date: string;

    @Prop({ required: true })
    time: string;

    @Prop({ required: true })
    service: string;

    @Prop({ required: true })
    stylist: string;

    @Prop({ default: 'Scheduled' })
    status: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
