import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment } from './appointment.schema';

@Injectable()
export class AppointmentsService {
    constructor(
        @InjectModel(Appointment.name) private appointmentModel: Model<Appointment>,
    ) { }

    async findAll(): Promise<Appointment[]> {
        return this.appointmentModel.find().exec();
    }

    async findOne(id: string): Promise<Appointment> {
        return this.appointmentModel.findById(id).exec();
    }

    async create(createAppointmentDto: Partial<Appointment>): Promise<Appointment> {
        const createdAppointment = new this.appointmentModel(createAppointmentDto);
        return createdAppointment.save();
    }

    async update(id: string, updateAppointmentDto: Partial<Appointment>): Promise<Appointment> {
        return this.appointmentModel.findByIdAndUpdate(id, updateAppointmentDto, { new: true }).exec();
    }

    async delete(id: string): Promise<void> {
        await this.appointmentModel.findByIdAndDelete(id).exec();
    }
}
