import React, {
    useState
} from "react";
import {
    Link
} from "react-router-dom";
import {
    FaUser,
    FaWhatsapp,
    FaFacebook
} from "react-icons/fa";

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from "@mui/material";

import logo from "../../assets/logo.png";

import "../styles/header.css";

function Header() {
    const [usuario, setUsuario] = useState(""); // nombre de usuario
    const [contrasena, setContrasena] = useState(""); // contraseña
    const [open, setOpen] = useState(false); // diálogo abierto?

    const handleSignInClick = () => { // Agrega la lógica para redirigir a la parte de login
        localStorage.setItem("usuario", "administrador"); // establezca el privilegio de administrador, ¡solo para fines de prueba!
        setOpen(false);
    };

    return (
        <div className="custom-header">
            <div>
                <FaUser className="admin-header" onClick={() => setOpen(true)} />
            </div>
            <img className="app-logo" src={logo} alt="Logo de la peluquería" />
            <div>
                <a
                    href="https://wa.me/56920673526"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaWhatsapp className="wsp-logo" />
                </a>
                <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaFacebook className="face-logo" />
                </a>
            </div>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>Iniciar sesión</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nombre de usuario"
                        type="text"
                        margin="dense"
                        value={usuario}
                        onChange={e => setUsuario(e.target.value)}
                        autoFocus
                        fullWidth
                    />
                    <TextField
                        label="Contraseña"
                        type="password"
                        margin="dense"
                        value={contrasena}
                        onChange={e => setContrasena(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Link to="/Cita">
                        <Button
                            color="error"
                            variant="contained"
                            onClick={handleSignInClick}
                            fullWidth
                        >Iniciar sesión</Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
      
    );
}

export default Header;
