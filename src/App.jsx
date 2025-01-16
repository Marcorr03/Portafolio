import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Mecanografia from './components/Mecanografia/Mecanografia';
import LosPollitos from './components/lospollitos/index';
import './App.css';

const App = () => {
    const [activeProject, setActiveProject] = useState(null); // Estado de proyecto activo
    const [visibleSections, setVisibleSections] = useState({}); // Control de visibilidad de secciones

    const sectionRefs = {
        about: useRef(null),
        projects: useRef(null),
        skills: useRef(null),
        education: useRef(null),
        contact: useRef(null),
    };

    // Observador para detectar visibilidad de las secciones
    useEffect(() => {
        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                setVisibleSections((prev) => ({
                    ...prev,
                    [entry.target.id]: entry.isIntersecting,
                }));
    
                // Agrega o elimina clases basadas en la visibilidad
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    entry.target.classList.remove("hidden");
                } else {
                    entry.target.classList.remove("visible");
                    entry.target.classList.add("hidden");
                }
            });
        };
    
        const observer = new IntersectionObserver(observerCallback, { threshold: 0.3 });
    
        Object.keys(sectionRefs).forEach((key) => {
            if (sectionRefs[key].current) observer.observe(sectionRefs[key].current);
        });
    
        return () => {
            Object.keys(sectionRefs).forEach((key) => {
                if (sectionRefs[key].current) observer.unobserve(sectionRefs[key].current);
            });
        };
    }, [activeProject]);
    

    // Función para activar un proyecto
    const handleShowProject = (projectName) => {
        setActiveProject(projectName);
    };

    // Función para regresar al portafolio principal
    const handleReturn = () => {
        setActiveProject(null);
        setVisibleSections((prev) =>
            Object.keys(sectionRefs).reduce((acc, key) => {
                acc[key] = false; // Todas las secciones no visibles inicialmente
                return acc;
            }, {})
        );
    
        // Forzar el observador para actualizar
        Object.keys(sectionRefs).forEach((key) => {
            if (sectionRefs[key].current) {
                const section = sectionRefs[key].current;
                section.classList.remove('visible'); // Elimina la clase visible
                section.classList.add('hidden'); // Asegura que empiece como oculta
            }
        });
    };

    // Mapa de componentes de proyectos
    const projectComponents = {
        mecanografia: Mecanografia,
        losPollitos: LosPollitos,
    };

    // Determinar si hay un proyecto activo
    const ActiveComponent = activeProject ? projectComponents[activeProject] : null;

    return (
        <div className="App"> 
            {activeProject ? (
                // Renderiza el componente del proyecto seleccionado
                <ActiveComponent onReturn={handleReturn} />
            ) : (
                // Renderiza el portafolio principal si no hay proyecto activo
                <>
                    <Header />
                    <main>
                        {Object.keys(sectionRefs).map((key) => (
                            <section
                                key={key}
                                id={key}
                                ref={sectionRefs[key]}
                                className={`fade-section ${
                                    visibleSections[key] ? 'visible' : 'hidden'
                                }`}
                            >
                                {key === 'about' && <About />}
                                {key === 'projects' && <Projects onShowProject={handleShowProject} />}
                                {key === 'skills' && <Skills />}
                                {key === 'education' && <Education />}
                                {key === 'contact' && <Contact />}
                            </section>
                        ))}
                    </main>
                    <Footer />
                </>
            )}
        </div>
    );
};

export default App;
