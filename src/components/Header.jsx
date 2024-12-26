import React from 'react';
import '../css/header.css'

const Header = () => {
    return (
        <header>
            <nav>
                <a href="#about">Sobre Mí</a>
                <a href="#projects">Proyectos</a>
                <a href="#education">Formación</a>
                <a href="#contact">Contacto</a>
            </nav>
        </header>
    );
};

export default Header;
