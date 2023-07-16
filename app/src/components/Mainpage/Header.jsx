import React from "react";
import { FaUser, FaWhatsapp, FaFacebook } from "react-icons/fa";
import logo from "../../assets/logo.png";
import "../styles/header.css";


function Header() {
  const handleAdminClick = () => {
    // Agrega la lógica para redirigir a la parte administrativa
  };

  return (
    
      <div className="custom-header">
        <div>
          <FaUser className="admin-header" onClick={handleAdminClick} />
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
      </div>
    
  );
}

export default Header;
