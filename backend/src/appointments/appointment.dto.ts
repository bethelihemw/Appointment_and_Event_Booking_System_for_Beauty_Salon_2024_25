export class CreateAppointmentDto {
    readonly customerName: string;
    readonly date: string;
    readonly time: string;
    readonly service: string;
    readonly stylist: string;
    readonly status?: string;
}

export class UpdateAppointmentDto {
    readonly customerName?: string;
    readonly date?: string;
    readonly time?: string;
    readonly service?: string;
    readonly stylist?: string;
    readonly status?: string;
}
