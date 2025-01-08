import React, { useState,useEffect, useRef } from 'react';
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
    const [activeProject, setActiveProject] = useState(null);

    // Función para cambiar a una vista específica de un proyecto
    const handleShowProject = (projectName) => {
        setActiveProject(projectName);
    };

    // Función para volver a la vista principal
    const handleReturn = () => {
        setActiveProject(null);
    };

    const [visibleSections, setVisibleSections] = useState({
        about: false,
        projects: false,
        skills: false,
        education: false,
        contact: false,
    });

    const aboutRef = useRef(null);
    const projectsRef = useRef(null);
    const skillsRef = useRef(null);
    const educationRef = useRef(null);
    const contactRef = useRef(null);

    useEffect(() => {
        const options = {
            threshold: 0.3, // Detecta cuando el 20% del elemento está visible
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setVisibleSections((prev) => ({
                        ...prev,
                        [entry.target.id]: true,
                    }));
                } else {
                    setVisibleSections((prev) => ({
                        ...prev,
                        [entry.target.id]: false,
                    }));
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, options);

        if (aboutRef.current) observer.observe(aboutRef.current);
        if (projectsRef.current) observer.observe(projectsRef.current);
        if (skillsRef.current) observer.observe(skillsRef.current);
        if (educationRef.current) observer.observe(educationRef.current);
        if (contactRef.current) observer.observe(contactRef.current);

        return () => {
            if (aboutRef.current) observer.unobserve(aboutRef.current);
            if (projectsRef.current) observer.unobserve(projectsRef.current);
            if (skillsRef.current) observer.unobserve(skillsRef.current);
            if (educationRef.current) observer.unobserve(educationRef.current);
            if (contactRef.current) observer.unobserve(contactRef.current);
        };
    }, []);


    return (
        <div className="App">
            {activeProject === 'mecanografia' ? (
                <Mecanografia onReturn={handleReturn} />
            ) : activeProject === 'losPollitos' ? (
                <LosPollitos onReturn={handleReturn} />
            ) : (
                <>
                    <Header />
            <main>
                <section
                    id="about"
                    ref={aboutRef}
                    className={`fade-section ${
                        visibleSections.about ? 'visible' : 'hidden'
                    }`}
                >
                    <About />
                </section>

                <section
                    id="projects"
                    ref={projectsRef}
                    className={`fade-section ${
                        visibleSections.projects ? 'visible' : 'hidden'
                    }`}
                >
                    <Projects onShowProject={handleShowProject} />
                </section>

                <section
                    id="skills"
                    ref={skillsRef}
                    className={`fade-section ${
                        visibleSections.skills ? 'visible' : 'hidden'
                    }`}
                >
                    <Skills />
                </section>

                <section
                    id="education"
                    ref={educationRef}
                    className={`fade-section ${
                        visibleSections.education ? 'visible' : 'hidden'
                    }`}
                >
                    <Education />
                </section>

                <section
                    id="contact"
                    ref={contactRef}
                    className={`fade-section ${
                        visibleSections.contact ? 'visible' : 'hidden'
                    }`}
                >
                    <Contact />
                </section>
            </main>
            <Footer />
                </>
            )}
        </div>
    );
};

export default App;