import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    AppointmentsModule,
  ],
})
export class AppModule {}

