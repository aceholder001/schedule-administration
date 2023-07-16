// Scorpion/models/Cita.js
const mongoose = require('mongoose');

const CitaSchema = new mongoose.Schema({
    nombreCliente: String, // name
    correoElectronico: String, // email
    telefono: String, // telephone
    rut: String, //  rut
    servicioId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Servicios'
    }],
    fecha: Date, // date
    hora: String, // time
}, {
    timestamps: true
});

module.exports = mongoose.model('Cita', CitaSchema); //