import React from 'react';

const Education = () => {
    const education = [
        { degree: 'Ingeniería en Software', institution: 'Universidad XYZ', year: '2022' },
        { degree: 'Certificación Full-Stack', institution: 'Platzi', year: '2023' },
    ];

    return (
        <section id="education">
            <h2>Formación</h2>
            <ul>
                {education.map((item, index) => (
                    <li key={index}>
                        <h3>{item.degree}</h3>
                        <p>{item.institution} - {item.year}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Education;
