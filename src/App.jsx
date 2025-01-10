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
    }, []);

    // Función para activar un proyecto
    const handleShowProject = (projectName) => {
        setActiveProject(projectName);
    };

    // Función para regresar al portafolio principal
    const handleReturn = () => {
        setActiveProject(null);
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
