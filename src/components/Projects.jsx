import React from 'react';
import '../css/projects.css';

const Projects =  ({ onShowProject }) => {
    const projects = [
        { 
            title: 'Los Pollitos', 
            description: 'Este es un proyecto ya en producción, implementado con React en Firebase.', 
            action: () => onShowProject('losPollitos')
        },
        { 
            title: 'Mecanografía', 
            description:"Proyecto para mejorar velocidad y precisión en mecanografía.", 
            action: () => onShowProject('mecanografia')
        },
    ];

    return (
        <section id="projects">
            <div className='title'>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="45"
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
                <h2>Proyectos</h2>
            </div>
            <div className="project-list">
                {projects.map((project, index) => (
                    <div key={index} className="project-item">
                        <div className={`image proyecto${index + 1}`} onClick={project.action}></div>
                        <div>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
