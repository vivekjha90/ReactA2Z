const Appointment = require('../models/appointment');

// Create a new appointment
exports.bookAppointment = async (req, res) => {
    try {
        const newAppointment = new Appointment(req.body);
        const saved = await newAppointment.save();
        res.status(201).json({ message: "Appointment booked successfully!", data: saved });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Fetch all appointments
exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ appointmentDate: 1 });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
