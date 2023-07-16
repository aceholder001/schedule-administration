// Scorpion/models/Servicio.js
const mongoose = require('mongoose');

const ServiciosSchema = new mongoose.Schema({
    nombre: String, // name
    descripcion: String,    // description
    duracion: Number,    // duration
    precio: Number, // price
    disponibilidad: Boolean,    // availability
    imagen: String  // image
}, {
    timestamps: true
});

module.exports = mongoose.model('Servicios', ServiciosSchema);
