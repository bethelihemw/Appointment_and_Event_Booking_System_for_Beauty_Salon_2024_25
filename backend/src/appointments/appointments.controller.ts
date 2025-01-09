import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './appointment.schema';

@Controller('appointments')
export class AppointmentsController {
    constructor(private readonly appointmentsService: AppointmentsService) { }

    @Get()
    async findAll(): Promise<Appointment[]> {
        return this.appointmentsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Appointment> {
        return this.appointmentsService.findOne(id);
    }

    @Post()
    async create(@Body() createAppointmentDto: Partial<Appointment>): Promise<Appointment> {
        return this.appointmentsService.create(createAppointmentDto);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateAppointmentDto: Partial<Appointment>,
    ): Promise<Appointment> {
        return this.appointmentsService.update(id, updateAppointmentDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.appointmentsService.delete(id);
    }
}
