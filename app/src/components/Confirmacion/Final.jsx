import React from "react";
import HeaderGeneral from "../HeaderGeneral";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Footer from "../Footer";
import "./confirmacion.css";
import { Link } from "react-router-dom";

function Final() {
  return (
    <div className="container">
      <HeaderGeneral />
      <h1 className="titulo-confirmacion">Cita Guardada Correctamente</h1>
      <IoIosCheckmarkCircle size={400} color ="#C9BDF2" />
      <Link to="/">
        <button className="boton-final">Volver al Inicio</button>
      </Link>
      <Footer />
    </div>
  );
}
export default Final;
