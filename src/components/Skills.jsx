import React from 'react';
import '../css/skills.css'

const Skills = () => {

    return (
        <section id="skills">
            <div className='title3'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height={40} fill='rgb(206, 99, 60)'><path d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32l288 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-288 0c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
                <h2>Conocimientos</h2>
            </div>
            <div className="skills-grid">
        <div className="skill-category">
            <h3>Lenguajes de Programación</h3>
            <ul className="skills-list">
                <li>Python</li>
                <li>JavaScript</li>
                <li>C#</li>
                <li>Java</li>
                <li>SQL</li>
                <li>HTML/CSS</li>
                <li>Visual Basic</li>
                <li>PHP</li>
            </ul>
        </div>
        <div className="skill-category">
            <h3>Frameworks y Librerías</h3>
            <ul className="skills-list">
                <li>React</li>
                <li>Node.js</li>
                <li>ASP.NET MVC</li>
            </ul>
        </div>
        <div className="skill-category">
            <h3>Bases de Datos</h3>
            <ul className="skills-list">
                <li>MySQL</li>
                <li>SQL Server</li>
                <li>MongoDB</li>
            </ul>
        </div>
        <div className="skill-category">
            <h3>Herramientas y Tecnologías</h3>
            <ul className="skills-list">
                <li>Git/GitHub</li>
                <li>Visual Studio</li>
                <li>Plesk</li>
            </ul>
        </div>
    </div>
        </section>
    );
};

export default Skills;
