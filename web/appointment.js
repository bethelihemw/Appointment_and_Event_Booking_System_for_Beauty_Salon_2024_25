// script.js

document.addEventListener('DOMContentLoaded', () => {
    const calendarHeader = document.querySelector('.calendar-header h2');
    const calendarBody = document.querySelector('.calendar tbody');
    const monthSelector = document.getElementById('month-name');
    const timeSlots = document.querySelectorAll('.time-picker li');

    let currentDate = new Date();

    // Function to render the calendar
    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        monthSelector.textContent = `< ${date.toLocaleString('default', { month: 'long', year: 'numeric' })} >`;
        calendarBody.innerHTML = '';

        let dayCellCount = 0;

        // Create rows for the calendar
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');

            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');

                // Previous month's days
                if (i === 0 && j < (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1)) {
                    cell.textContent = daysInPrevMonth - (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1) + j + 1;
                    cell.classList.add('inactive');
                }
                // Current month's days
                else if (dayCellCount < daysInMonth) {
                    cell.textContent = ++dayCellCount;
                    cell.classList.add('active');
                    cell.addEventListener('click', () => {
                        document.querySelectorAll('.calendar td').forEach((td) => td.classList.remove('selected'));
                        cell.classList.add('selected');
                    });
                }
                // Next month's days
                else {
                    cell.textContent = ++dayCellCount - daysInMonth;
                    cell.classList.add('inactive');
                }

                row.appendChild(cell);
            }

            calendarBody.appendChild(row);
        }
    }

    // Handle month navigation
    monthSelector.addEventListener('click', (event) => {
        const text = event.target.textContent;
        if (text.includes('<')) {
            currentDate.setMonth(currentDate.getMonth() - 1);
        } else if (text.includes('>')) {
            currentDate.setMonth(currentDate.getMonth() + 1);
        }
        renderCalendar(currentDate);
    });

    // Time picker selection
    timeSlots.forEach((slot) => {
        slot.addEventListener('click', () => {
            document.querySelectorAll('.time-picker li').forEach((li) => li.classList.remove('active'));
            slot.classList.add('active');
        });
    });

    // Initial render
    renderCalendar(currentDate);
});



const appointments = [];  // Array to store appointments

// Show Add Appointment Section
function showAddAppointment() {
    document.getElementById("addAppointmentSection").style.display = "block";
    document.getElementById("editAppointmentSection").style.display = "none";
}

// Show Edit Appointment Section
function showEditAppointments() {
    document.getElementById("addAppointmentSection").style.display = "none";
    document.getElementById("editAppointmentSection").style.display = "block";

    populateAppointmentsTable();
}

// Add Appointment
document.getElementById("addAppointmentForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const serviceType = document.getElementById("service-type").value;
    const customerName = document.getElementById("customer-name").value;
    const appointmentDate = document.getElementById("appointmentDate").value;
    const appointmentTime = document.getElementById("appointmentTime").value;

    // Push new appointment to the array
    appointments.push({ serviceType, customerName, appointmentDate, appointmentTime });

    // Reset form and display a success message
    this.reset();
    alert("Appointment added successfully!");
});

// Populate Appointments Table
function populateAppointmentsTable() {
    const tableBody = document.getElementById("appointmentsTable").querySelector("tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    appointments.forEach((appointment, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${appointment.customerName}</td>
      <td>${appointment.serviceType}</td>
      <td>${appointment.appointmentDate}</td>
      <td>${appointment.appointmentTime}</td>
      <td>
        <button onclick="deleteAppointment(${index})">Delete</button>
      </td>
    `;
        tableBody.appendChild(row);
    });
}

// Delete Appointment
function deleteAppointment(index) {
    appointments.splice(index, 1);
    populateAppointmentsTable();
    alert("Appointment deleted successfully!");
}
