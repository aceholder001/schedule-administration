import React from "react";
import mancha from "../../assets/mancha.png";
import cartoon from "../../assets/cartoon.png";
import { Link } from "react-router-dom";
import "../styles/body.css";
import { SelectionContext } from "../../context/SelectionContext";
import { useContext } from "react";

function Body() {
  const { eliminarFecha,limpiarServicios,eliminarHorario } = useContext(SelectionContext);


  return (
    <div className="custom-body">
      <div className="image-contenedor">
        <img className="mancha" src={mancha} alt="Imagen principal" />
        <img className="cartoon" src={cartoon} alt="Imagen principal" />
      </div>
      <h1 className="subtitulo">Un Nuevo concepto de Peluqueria</h1>
      <Link to="/Servicios">
        <button href="/Servicios" className="boton" >Agendar Hora</button>
      </Link>
    </div>
  );
}

export default Body;
