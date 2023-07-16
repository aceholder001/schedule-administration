import React from "react";
import logo from "../assets/logo.png";
import "./styles/header-general.css";
import { FaWhatsapp, FaFacebook } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

function HeaderGeneral() {
  const goBack = () => {
    localStorage.removeItem("usuario");
    window.history.back();
  };
  return (
    <div className="header-general">
      <a onClick={goBack}>
        <IoIosArrowBack className="back-icon" />
      </a>
      <Link to="/">
        <img className="app-logo" src={logo} alt="Logo de la peluquería" />
      </Link>
      <div>
        <a
          href="https://wa.me/56920673526"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp className="wsp-logo" />{" "}
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

export default HeaderGeneral;
