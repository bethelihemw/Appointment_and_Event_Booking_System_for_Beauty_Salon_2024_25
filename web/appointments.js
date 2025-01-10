const baseUrl = 'http://localhost:3000/appointments';
let editingAppointmentId = null;                                  // Keeps track of the appointment being edited

// Fetch and display all appointments
async function fetchAppointments() {
    try {
        const response = await fetch(baseUrl);
        const appointments = await response.json();
        const tableBody = document.querySelector('#appointmentsTable tbody');
        tableBody.innerHTML = ''; // Clear existing rows

        appointments.forEach((appointment) => {
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
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching appointments:', error);
    }
}

// Add or Update an appointment
document.getElementById('addAppointmentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const appointmentData = {
        customerName: document.getElementById('customerName').value,
        service: document.getElementById('service').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        stylist: document.getElementById('stylist').value,
    };

    try {
        if (editingAppointmentId) {
            // Update existing appointment
            const response = await fetch(`${baseUrl}/${editingAppointmentId}`, {
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
            const response = await fetch(baseUrl, {
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
        document.getElementById('addAppointmentForm').reset();
        fetchAppointments(); // Refresh the appointments list
    } catch (error) {
        console.error('Error saving appointment:', error);
    }
});

// Populate the form for editing
async function populateEditForm(id) {
    try {
        const response = await fetch(`${baseUrl}/${id}`);
        if (response.ok) {
            const appointment = await response.json();

            // Pre-fill the form with the current appointment details
            document.getElementById('customerName').value = appointment.customerName;
            document.getElementById('service').value = appointment.service;
            document.getElementById('date').value = appointment.date;
            document.getElementById('time').value = appointment.time;
            document.getElementById('stylist').value = appointment.stylist;

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
async function deleteAppointment(id) {
    try {
        const response = await fetch(`${baseUrl}/${id}`, {
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
