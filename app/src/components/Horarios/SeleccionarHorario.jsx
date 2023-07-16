import React from "react";
import HeaderGeneral from "../HeaderGeneral";
import Footer from "../Footer";
import BodyHorarios from "./BodyHorarios";

function SeleccionarHorario() {
    return (
        <div className="container">
            <HeaderGeneral />
            <BodyHorarios />
            <Footer />
        </div>
    );
}

export default SeleccionarHorario;