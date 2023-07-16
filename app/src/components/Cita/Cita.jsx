import React, {
    useState,
    useEffect
} from "react";
import useFetch from "react-fetch-hook";

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

import HeaderGeneral from "../HeaderGeneral";
import Footer from "../Footer";

import {
    colors
} from "./colors";

import "./cita.css";

function Cita() {
    const [citas, setCitas] = useState([]);
    const [cita, setCita] = useState(null); // detalle de la cita
    const [open, setOpen] = useState(false); // diálogo abierto?

    let {
        data,
        isLoading,
        error
    } = useFetch("http://localhost:4000/api/citas"); // obtener horarios después de cargar la página

    useEffect(() => {
        setCitas(Array.isArray(data) ? data.map(cita => {
            let fechaDeseada = new Date(cita.fecha);

            // Ajusta la fecha a la zona horaria del servidor
            fechaDeseada.setMinutes(fechaDeseada.getMinutes() + fechaDeseada.getTimezoneOffset());

            return {
                extendedProps: {
                    nombreCliente: cita.nombreCliente, // nombre del cliente
                    servicio: cita.servicio.map(servicio => servicio.nombre).join(", "), // nombre del servicio
                    correoElectronico: cita.correoElectronico, // correo electrónico
                    telefono: cita.telefono, // telefono
                    rut: cita.rut, // rut del cliente
                    fecha: fechaDeseada.toLocaleString(), // fecha de la cita,
                    hora: cita.hora // hora de la cita
                },
                start: fechaDeseada, // designado en
                end: fechaDeseada, // lo mismo con inicio
                allDay: false,
                className: "cita-evento",
                borderColor: "transparent",
                backgroundColor: colors[Math.floor(Math.random() * colors.length)]
            };
        }) : []);
    }, [data]);

    const handleEventClick = props => { // mostrar un detalle de la cita
        setCita(props); // establecer un detalle de cita
        setOpen(true); // mostrar diálogo
    };

    const renderEvent = info => { // vista personalizada para el horario 
        return (
            <div onClick={() => handleEventClick(info.event.extendedProps)}>
                <p>{info.event.extendedProps.servicio}</p>
                <p>{info.event.extendedProps.nombreCliente}</p>
                <p>{info.timeText}</p>
            </div>
        );
    };

    const usuario = localStorage.getItem("usuario"); // obtener privilegio

    return (
        <div>
            <HeaderGeneral />
            <h1 className="titulo-cita">Cita</h1>
            {usuario === "administrador" ? ( // solo el administrador puede ver el cronograma, ¡solo para fines de prueba!
                <div className="cita">
                    {error && <h2 className="container">{error}</h2>}
                    {isLoading ? <h2 className="cita-cargando">Cargando...</h2> : (
                        <FullCalendar
                            plugins={[timeGridPlugin]}
                            eventContent={renderEvent}
                            initialView="timeGridWeek"
                            headerToolbar={{
                                left: "prev,next today",
                                center: "title",
                                right: "timeGridWeek,timeGridDay"
                            }}
                            events={citas}
                            nowIndicator
                        />
                    )}
                </div>
            ) : <h2 className="container">Se requiere privilegio de administrador!</h2>}
            <Footer />
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                    <DialogTitle>Detalle de la cita</DialogTitle>
                    {cita && (
                        <DialogContent>
                            <DialogContentText>Servicio:&nbsp;{cita.servicio}</DialogContentText>
                            <DialogContentText>NombreCliente:&nbsp;{cita.nombreCliente}</DialogContentText>
                            <DialogContentText>CorreoElectronico:&nbsp;{cita.correoElectronico}</DialogContentText>
                            <DialogContentText>Telefono:&nbsp;{cita.telefono}</DialogContentText>
                            <DialogContentText>Rut:&nbsp;{cita.rut}</DialogContentText>
                            <DialogContentText>Fecha:&nbsp;{cita.fecha}</DialogContentText>
                        </DialogContent>
                    )}
                    <DialogActions>
                        <Button
                            color="primary"
                            onClick={() => setOpen(false)}
                        >Cancelar</Button>
                    </DialogActions>
            </Dialog>
        </div>
    );
}

export default Cita;