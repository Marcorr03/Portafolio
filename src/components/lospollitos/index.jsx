import React, { useState } from 'react';
import '../../css/lospollitos/css/index.css';
import Ventas from './ventas.jsx';
import { Mensaje } from './mensaje.jsx';

const Index = ({ onReturn }) => {
  const [activeSection, setActiveSection] = useState('vender');
  const [sidebarActive, setSidebarActive] = useState(false);

  const sections = [
    { id: 'vender', title: 'Centro de Ventas', icon: "fas fa-shopping-cart" },
    { id: 'facturas', title: 'Facturas', icon: "fas fa-file-invoice" },
    { id: 'productos', title: 'Productos', icon: "fas fa-box" },
    { id: 'categorias', title: 'Categorias', icon: "fas fa-cogs" },
  ];

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
  };

  const handleLogout = () => {
    Mensaje("success", "Sesión Cerrada", "Has cerrado sesión exitosamente.");
    
  };

  return (
    <div className="todo ">
      <div className='icono'></div>
      <button
        className="toggle-sidebar"
        onClick={() => setSidebarActive(!sidebarActive)}
      >
        ☰
      </button><button 
                onClick={onReturn} 
                className="atras"
            >
                Portafolio
            </button>
      <nav className={`sidebar ${sidebarActive ? 'active' : ''}`}>
      
        <h2>Los Pollitos</h2>
        
        <ul>
          {sections.map((section) => (
            <li key={section.id}>
              <a onClick={() => handleSectionChange(section.id)}>
                <i className={section.icon}></i> {section.title}
              </a>
            </li>
          ))}
        </ul>
        <button className="logout-button" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
        </button>
      </nav>

      <div className="container">
        <div className="content">
          {activeSection === 'vender' && (
            <section>
              <Ventas />
            </section>
          )}

          {activeSection === 'facturas' && (
            <>
            {Mensaje("success","Informacion","Este es un apartado donde aparecen todas las facturas realizadas")}
            {setActiveSection('vender')}
            </>
          )}

          {activeSection === 'productos' && (
             <>
             {Mensaje("success","Informacion","Este es un apartado donde se podra dar mantenimiento a los productos")}
             {setActiveSection('vender')}
             </>
          )}

          {activeSection === 'categorias' && (
            <>
            {Mensaje("success","Informacion","Este es un apartado donde se podra dar mantenimiento a las categorias")}
            {setActiveSection('vender')}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
