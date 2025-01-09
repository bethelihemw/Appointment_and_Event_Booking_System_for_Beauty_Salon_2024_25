export interface Appointment {
    customerName: string;
    date: string;
    time: string;
    service: string;
    stylist: string;
    status?: string; // Optional because it may default to "Scheduled"
}
