import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './pagesStyle/header.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header__container">
      <Link className="header__link" to="/">
        <i className="bx bxs-home-smile"></i>
        <p>Inicio</p>
      </Link>
      <Link to="/calendario" className="header__link">
        <i className="bx bxs-calendar"></i> <p>Calendario</p>
      </Link>
      <Link to="/consultas" className="header__link">
        <i className="bx bxs-calendar"></i> <p>Consultas</p>
      </Link>
      <Link to="/pacientes" className="header__link">
        <i className="bx bxs-user-detail"></i> <p>Pacientes</p>
      </Link>
      <Link className="header__link" to="/users">
        <i className="bx bxs-user-circle"></i>
        <p>Usuarios</p>
      </Link>
      <Link className="header__link" to="/reportes">
        <i className="bx bxs-report"></i> <p>Reportes</p>
      </Link>
      <Link
        className="header__link"
        onClick={() => {
          localStorage.clear();
          navigate('/');
        }}
      >
        <i className="bx bxs-door-open"></i> <p>Cerrar Sesion</p>
      </Link>
    </header>
  );
};

export default Header;
