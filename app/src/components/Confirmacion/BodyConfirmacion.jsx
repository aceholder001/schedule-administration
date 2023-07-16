import React, { useContext } from "react";
import "./confirmacion.css";
import { SelectionContext } from "../../context/SelectionContext";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function BodyConfirmacion() {
  const {
    datos,
    serviciosSeleccionados,
    fechaSeleccionada,
    horariosSeleccionados,
  } = useContext(SelectionContext);
  const navigate = useNavigate();
  // agendar cita en la base de datos
  const agendarCita = async(e) => {
    e.preventDefault();

    //logica para agendar cita (post a la base de datos)
    const nuevaCita = {
      nombreCliente: datos.nombre,
      correoElectronico: datos.email,
      telefono: datos.telefono,
      rut: datos.rut,
      servicioId: serviciosSeleccionados.map(servicio => servicio._id),
      fecha: `${fechaSeleccionada.año}-${fechaSeleccionada.mes}-${fechaSeleccionada.dia}`,
      hora: horariosSeleccionados[0].hora,
    };
    await axios.post('http://localhost:4000/api/citas', nuevaCita);    
    navigate('/Final');
  }
  return (
    <div className="container-body-confirmacion">
      <h1 className="titulo-confirmacion">Confirmacion de Datos</h1>
      <div className="datos-confirmacion">
        <h3 className="casilla-confirmacion">Nombre: {datos.nombre}</h3>
        <h3 className="casilla-confirmacion">
          Servicio: {serviciosSeleccionados.map(servicio => servicio.nombre).join(", ")}
        </h3>
        <h3 className="casilla-confirmacion">
        Fecha: {`${fechaSeleccionada.dia}/${fechaSeleccionada.mes}/${fechaSeleccionada.año}`} 
        </h3>
        <h3 className="casilla-confirmacion">
          Hora: {horariosSeleccionados.map(horario => horario.hora).join(", ")}
        </h3>
        <h3 className="casilla-confirmacion">
          Direccion: Ecuador #1210, La cisterna
        </h3>
      </div>
      <Link to="/Final">
        <button className="boton-fecha" onClick={agendarCita}>Agendar Cita</button>
      </Link>
    </div>
  );
}

export default BodyConfirmacion;
