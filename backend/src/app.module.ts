import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/beauty_salon'),
    AuthModule,
    AppointmentsModule,
  ],
})
export class AppModule {}

