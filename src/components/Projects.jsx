import React from 'react';
import '../css/projects.css'
const Projects = () => {
    const projects = [
        { title: 'Los Pollitos', description: 'Este proyecto es la replica de un proyecto ya en producción.' },
        { title: 'Mecanografia', description: 'Ejemplo del uso de la logica.' },
    ];

    return (
        <section id="projects">
            <h2>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M8 8l-4 4 4 4" />
                    <path d="M16 8l4 4-4 4" />
                    <line x1="14" y1="6" x2="10" y2="18" />
                </svg>
                Proyectos
            </h2>
            <div className="project-list">
                {projects.map((project, index) => (
                    <div key={index} className="project-item">
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <div className={`project-image proyecto${index + 1}`}></div>
                    </div>
                ))}
            </div>
        </section>

    );
};

export default Projects;
