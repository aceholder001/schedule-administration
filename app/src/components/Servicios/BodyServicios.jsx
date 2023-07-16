import React, { useState, useContext, useEffect } from "react";
import "../styles/servicios.css";
import { SelectionContext } from "../../context/SelectionContext";
import { Link } from "react-router-dom";
import axios from "axios";



function Servicios() {

  function Casilla({
    imagen,
    textoArriba,
    textoAbajo,
    servicio,
    onClick,
  }) {
    const seleccionada = serviciosSeleccionados.some(
      (servicioSeleccionado) => servicioSeleccionado._id === servicio._id
    );
    const casillaClassName = seleccionada ? "casilla-seleccionada" : "casilla";
    return (
      <div
        className={casillaClassName}
        style={{ backgroundImage: `url(${imagen})` }}
        onClick={onClick}
      >
        <span className="texto">{textoArriba}</span>
        <span className="texto">{textoAbajo}</span>
      </div>
    );
  }
  const {
    serviciosSeleccionados,
    agregarServicio,
    eliminarServicio,
    limpiarServicios,
  } = useContext(SelectionContext);

  const [mostrarError, setMostrarError] = useState(false);

  // Obtener los servicios desde el servidor y guardarlos en el estado
  const [listaServicios, setListaServicios] = useState([]);

  // Guardar la selección de servicios en el almacenamiento local cada vez que cambie
  useEffect(() => {
    const nombresServicios = serviciosSeleccionados.map(
      (servicio) => servicio.nombre
    );
    console.log("Servicios Seleccionados:", nombresServicios);
  }, [serviciosSeleccionados]);

  // Obtener los servicios desde el servidor
  useEffect(() => {
    const getServicios = async () => {
      const response = await axios.get("http://localhost:4000/api/servicios");
      setListaServicios(response.data);
    };
    getServicios();
  }, []);

  const handleClick = (servicio) => {
    // Si el servicio ya está seleccionado, lo eliminamos
    const servicioYaSeleccionado = serviciosSeleccionados.some(
      (servicioSeleccionado) => servicioSeleccionado._id === servicio._id
    );

    if (servicioYaSeleccionado) {
      eliminarServicio(servicio);
    } else {
      agregarServicio(servicio);
    }
  };


  const confirmarHabilitado = serviciosSeleccionados.length > 0;
  const handleAgendarClick = () => {
    if (!confirmarHabilitado) {
      setMostrarError(true);
    } else {
      // Lógica para manejar el evento de Agendar Hora
    }
  };

  return (
    <div className="body-servicios">
      <h1 className="titulo-servicios">Selecciona uno o mas servicios</h1>
      <div className="servicios">
        {listaServicios.map((servicio) => (
          <Casilla
            key={servicio._id}
            imagen={servicio.name_file}
            textoArriba={servicio.nombre}
            textoAbajo={`Precio: ${servicio.precio}`}
            servicio={servicio}
            onClick={() => handleClick(servicio)}
          />
        ))}
      </div>
      <p className="servicios-deselect">
        Servicios seleccionados:{" "}
        <span className="servicios-select">
          {serviciosSeleccionados.map((servicio, index) => (
            <li key={index}>{servicio.nombre}</li>
          ))}
        </span>
      </p>
      <Link to="/Fecha">
        <button
          className="boton"
          disabled={!confirmarHabilitado}
          onClick={handleAgendarClick}
        >
          Agendar Hora
        </button>
      </Link>
    </div>
  );
}

export default Servicios;
