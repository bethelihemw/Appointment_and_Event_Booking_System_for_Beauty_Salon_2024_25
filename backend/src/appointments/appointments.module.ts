import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { AppointmentSchema } from './schemas/appointment.schema'; 

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Appointment', schema: AppointmentSchema }, 
    ]),
  ],
  controllers: [AppointmentsController], 
  providers: [AppointmentsService], 
})
export class AppointmentsModule {}
