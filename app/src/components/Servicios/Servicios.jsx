import React from "react";
import HeaderGeneral from "../HeaderGeneral";
import Servicios from "./BodyServicios";
import Footer from "../Footer";

function ServiciosPage() {
  return (
    <div className="container">
      <HeaderGeneral />
      <Servicios />
      <Footer />
    </div>
  );
}

export default ServiciosPage;
