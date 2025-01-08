import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment } from './schemas/appointment.schema';  

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name) private appointmentModel: Model<Appointment>,  
  ) {}

  async create(appointmentDto: any): Promise<Appointment> {
    const createdAppointment = new this.appointmentModel(appointmentDto);
    return createdAppointment.save();
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentModel.find().exec();
  }

  async findOne(id: string): Promise<Appointment> {
    return this.appointmentModel.findById(id).exec();
  }

  async update(id: string, appointmentDto: any): Promise<Appointment> {
    return this.appointmentModel.findByIdAndUpdate(id, appointmentDto, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.appointmentModel.findByIdAndDelete(id).exec();
  }
}

