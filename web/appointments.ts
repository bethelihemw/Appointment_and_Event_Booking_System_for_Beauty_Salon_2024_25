// Define the base URL for the API
const baseUrl: string = 'http://localhost:3000/appointments';
let editingAppointmentId: string | null = null; // Keeps track of the appointment being edited

// Define the Appointment interface
interface Appointment {
    _id: string;
    customerName: string;
    service: string;
    date: string;
    time: string;
    stylist: string;
    status: string;
}

// Fetch and display all appointments
async function fetchAppointments(): Promise<void> {
    try {
        const response: Response = await fetch(baseUrl);
        const appointments: Appointment[] = await response.json();
        const tableBody = document.querySelector('#appointmentsTable tbody') as HTMLTableSectionElement;
        tableBody.innerHTML = ''; // Clear existing rows

        appointments.forEach((appointment: Appointment) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${appointment.customerName}</td>
                <td>${appointment.service}</td>
                <td>${appointment.date}</td>
                <td>${appointment.time}</td>
                <td>${appointment.stylist}</td>
                <td>${appointment.status}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="populateEditForm('${appointment._id}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteAppointment('${appointment._id}')">Delete</button>
                </td>
            `;
            row.querySelectorAll('td').forEach((cell: HTMLElement) => {
                cell.style.color = 'white';
            });
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching appointments:', error);
    }
}

// Add or Update an appointment
document.getElementById('addAppointmentForm')?.addEventListener('submit', async (e: Event) => {
    e.preventDefault();

    const appointmentData: Omit<Appointment, '_id' | 'status'> = {
        customerName: (document.getElementById('customerName') as HTMLInputElement).value,
        service: (document.getElementById('service') as HTMLInputElement).value,
        date: (document.getElementById('date') as HTMLInputElement).value,
        time: (document.getElementById('time') as HTMLInputElement).value,
        stylist: (document.getElementById('stylist') as HTMLInputElement).value,
    };

    try {
        if (editingAppointmentId) {
            // Update existing appointment
            const response: Response = await fetch(`${baseUrl}/${editingAppointmentId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(appointmentData),
            });

            if (response.ok) {
                alert('Appointment updated successfully!');
            } else {
                console.error('Failed to update appointment');
            }
        } else {
            // Add new appointment
            const response: Response = await fetch(baseUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(appointmentData),
            });

            if (response.ok) {
                alert('Appointment added successfully!');
            } else {
                console.error('Failed to add appointment');
            }
        }

        // Reset the form and state
        editingAppointmentId = null;
        (document.getElementById('addAppointmentForm') as HTMLFormElement).reset();
        fetchAppointments(); // Refresh the appointments list
    } catch (error) {
        console.error('Error saving appointment:', error);
    }
});

// Populate the form for editing
async function populateEditForm(id: string): Promise<void> {
    try {
        const response: Response = await fetch(`${baseUrl}/${id}`);
        if (response.ok) {
            const appointment: Appointment = await response.json();

            // Pre-fill the form with the current appointment details
            (document.getElementById('customerName') as HTMLInputElement).value = appointment.customerName;
            (document.getElementById('service') as HTMLInputElement).value = appointment.service;
            (document.getElementById('date') as HTMLInputElement).value = appointment.date;
            (document.getElementById('time') as HTMLInputElement).value = appointment.time;
            (document.getElementById('stylist') as HTMLInputElement).value = appointment.stylist;

            // Set editing state
            editingAppointmentId = id;
        } else {
            console.error('Failed to fetch appointment for editing');
        }
    } catch (error) {
        console.error('Error fetching appointment:', error);
    }
}

// Delete an appointment
async function deleteAppointment(id: string): Promise<void> {
    try {
        const response: Response = await fetch(`${baseUrl}/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Appointment deleted successfully!');
            fetchAppointments(); // Refresh the appointments list
        } else {
            console.error('Failed to delete appointment');
        }
    } catch (error) {
        console.error('Error deleting appointment:', error);
    }
}

// Initial fetch of appointments
fetchAppointments();
