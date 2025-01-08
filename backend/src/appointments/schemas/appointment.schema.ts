import { Schema, Document } from 'mongoose';

export const AppointmentSchema = new Schema({
  clientName: String,
  service: String,
  appointmentDate: Date,
});

export interface Appointment extends Document {
  clientName: string;
  service: string;
  appointmentDate: Date;
}
