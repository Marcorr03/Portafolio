import React from 'react';
import '../css/header.css'

const Header = () => {
    return (
        <header>
            <nav>
                <div className='opciones'>
                <a href="#about">Sobre Mí</a>
                <a href="#projects">Proyectos</a>
                <a href="#skills">Conocimientos</a>
                <a href="#education">Formación</a>
                <a href="#contact">Contacto</a>
                </div>
            </nav>
        </header>
    );
};

export default Header;
