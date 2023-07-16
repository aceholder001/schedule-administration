import React, {
    useState
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
    const [cita, setCita] = useState(null);
    const [open, setOpen] = useState(false);

    const {
        data,
        isLoading,
        error
    } = useFetch("http://localhost:4000/api/citas");

    const handleEventClick = props => { // mostrar un detalle de la cita
        setCita(props); // establecer un detalle de cita
        setOpen(true); // mostrar diálogo
    };

    const renderEvent = info => { // vista personalizada para el horario 
        return (
            <div onClick={() => handleEventClick(info.event.extendedProps)}>
                <p>{info.event.extendedProps.servicio}</p>
                <p>{info.event.extendedProps.nombreCliente}</p>
            </div>
        );
    };

    return (
        <div>
            <HeaderGeneral />
            <h1 className="titulo-cita">Cita</h1>
            <div className="cita">
                {error && <h2>{error}</h2>}
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
                        events={data.map(event => ({
                            extendedProps: {
                                nombreCliente: event.nombreCliente,
                                servicio: event.servicio.map(servicio => servicio.nombre).join(", "),
                                correoElectronico: event.correoElectronico,
                                telefono: event.telefono,
                                rut: event.rut
                            },
                            start: event.fecha,
                            end: event.fecha,
                            allDay: false,
                            className: "cita-evento",
                            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                            borderColor: "transparent"
                        }))}
                        nowIndicator
                    />
                )}
            </div>
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