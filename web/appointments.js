var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
var _this = this;
// Define the base URL for the API
var baseUrl = 'http://localhost:3000/appointments';
var editingAppointmentId = null; // Keeps track of the appointment being edited
// Fetch and display all appointments
function fetchAppointments() {
    return __awaiter(this, void 0, void 0, function () {
        var response, appointments, tableBody_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(baseUrl)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    appointments = _a.sent();
                    tableBody_1 = document.querySelector('#appointmentsTable tbody');
                    tableBody_1.innerHTML = ''; // Clear existing rows
                    appointments.forEach(function (appointment) {
                        var row = document.createElement('tr');
                        row.innerHTML = "\n                <td>".concat(appointment.customerName, "</td>\n                <td>").concat(appointment.service, "</td>\n                <td>").concat(appointment.date, "</td>\n                <td>").concat(appointment.time, "</td>\n                <td>").concat(appointment.stylist, "</td>\n                <td>").concat(appointment.status, "</td>\n                <td>\n                    <button class=\"btn btn-warning btn-sm\" onclick=\"populateEditForm('").concat(appointment._id, "')\">Edit</button>\n                    <button class=\"btn btn-danger btn-sm\" onclick=\"deleteAppointment('").concat(appointment._id, "')\">Delete</button>\n                </td>\n            ");
                        row.querySelectorAll('td').forEach(function (cell) {
                            cell.style.color = 'white';
                        });
                        tableBody_1.appendChild(row);
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching appointments:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Add or Update an appointment
(_a = document.getElementById('addAppointmentForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (e) { return __awaiter(_this, void 0, void 0, function () {
    var appointmentData, response, response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                e.preventDefault();
                appointmentData = {
                    customerName: document.getElementById('customerName').value,
                    service: document.getElementById('service').value,
                    date: document.getElementById('date').value,
                    time: document.getElementById('time').value,
                    stylist: document.getElementById('stylist').value,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                if (!editingAppointmentId) return [3 /*break*/, 3];
                return [4 /*yield*/, fetch("".concat(baseUrl, "/").concat(editingAppointmentId), {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(appointmentData),
                    })];
            case 2:
                response = _a.sent();
                if (response.ok) {
                    alert('Appointment updated successfully!');
                }
                else {
                    console.error('Failed to update appointment');
                }
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, fetch(baseUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(appointmentData),
                })];
            case 4:
                response = _a.sent();
                if (response.ok) {
                    alert('Appointment added successfully!');
                }
                else {
                    console.error('Failed to add appointment');
                }
                _a.label = 5;
            case 5:
                // Reset the form and state
                editingAppointmentId = null;
                document.getElementById('addAppointmentForm').reset();
                fetchAppointments(); // Refresh the appointments list
                return [3 /*break*/, 7];
            case 6:
                error_2 = _a.sent();
                console.error('Error saving appointment:', error_2);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
// Populate the form for editing
function populateEditForm(id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, appointment, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, fetch("".concat(baseUrl, "/").concat(id))];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    appointment = _a.sent();
                    // Pre-fill the form with the current appointment details
                    document.getElementById('customerName').value = appointment.customerName;
                    document.getElementById('service').value = appointment.service;
                    document.getElementById('date').value = appointment.date;
                    document.getElementById('time').value = appointment.time;
                    document.getElementById('stylist').value = appointment.stylist;
                    // Set editing state
                    editingAppointmentId = id;
                    return [3 /*break*/, 4];
                case 3:
                    console.error('Failed to fetch appointment for editing');
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_3 = _a.sent();
                    console.error('Error fetching appointment:', error_3);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
// Delete an appointment
function deleteAppointment(id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch("".concat(baseUrl, "/").concat(id), {
                            method: 'DELETE',
                        })];
                case 1:
                    response = _a.sent();
                    if (response.ok) {
                        alert('Appointment deleted successfully!');
                        fetchAppointments(); // Refresh the appointments list
                    }
                    else {
                        console.error('Failed to delete appointment');
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.error('Error deleting appointment:', error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Initial fetch of appointments
fetchAppointments();
