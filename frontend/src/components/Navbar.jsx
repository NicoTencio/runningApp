import React, { useState } from 'react';
import '../styles/Navbar.css';
import logo from '../img/logo.png'; // Asegúrate de que la ruta sea correcta

const Navbar = ({ setActiveComponent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(window.location.hash.replace('#', '') || 'home');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsOpen(false); // Cierra el menú después de hacer clic en un enlace
    setActiveComponent(link); // Actualiza el componente activo
    window.location.hash = link; // Cambia el hash de la URL
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="#home" onClick={() => handleLinkClick('home')}>
          <img src={logo} alt="IT Running App Logo" className="navbar-logo-image" />
          <h1>IT Running App</h1>
        </a>
      </div>
      <div className="navbar-toggle" onClick={toggleMenu}>
        <i className="fas fa-bars"></i>
      </div>
      <ul className={`navbar-menu ${isOpen ? 'navbar-menu-open' : ''}`}>
        <li className="navbar-item">
          <a 
            href="#home" 
            onClick={() => handleLinkClick('home')} 
            className={activeLink === 'home' ? 'active' : ''}
          >
            Inicio
          </a>
        </li>
        <li className="navbar-item">
          <a 
            href="#inscription" 
            onClick={() => handleLinkClick('inscription')} 
            className={activeLink === 'inscription' ? 'active' : ''}
          >
            Inscripción
          </a>
        </li>
        {/* Puedes agregar más enlaces aquí si es necesario */}
      </ul>
    </nav>
  );
};

export default Navbar;