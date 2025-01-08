import React from 'react';
import '../css/education.css'

const Education = () => {
    const education = [  
        { degree: 'Diplomado Tecnologías de Información', institution: 'Colegio Universitario de Cartago', year: '2024',sello:<a className='sello image2' href='https://www.sinaes.ac.cr/'></a>,logo:<div className='CUC'></div>,link:'https://www.cuc.ac.cr/' },
        { degree: 'Ingenieria Informática (Bachillerato)', institution: 'UNED', year: 'Actualmente',sello:<a className='sello image2' href='https://www.sinaes.ac.cr/'></a>,logo:<div className='UNED'></div>,link:'https://www.uned.ac.cr/' },
        {degree:'Meta Front-End Developer Professional Certificate', institution: 'Coursera-META', year: 'Actualmente',sello:null,logo:<div className='COURSERA'></div>,link:'https://www.coursera.org/' },
        {degree:' IBM Full Stack Software Developer Professional Certificate', institution: 'Coursera-IBM', year: 'Actualmente',sello:null,logo:<div className='COURSERA'></div>,link:'https://www.coursera.org/' },
        {degree:'AWS Fundamentals Specialization', institution: 'Coursera-Amazon Web Services', year: 'Actualmente',sello:null,logo:<div className='COURSERA'></div>,link:'https://www.coursera.org/' },
       
      
    ];

    return (
        <section id="education">
            <div className='title1'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" height={40} fill='green'><path d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9l0 28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5l0-24.6c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z"/></svg>
                <h2>Formación</h2>
            </div>
           <div className='education-list'>
                {education.map((item, index) => (
                    <div key={index}>
                        <div className='info-formacion'>
                        <a href={item.link} className="image2">{item.logo}</a><h3>{item.degree}</h3>{item.sello} 
                        </div>
                       
                        <p>{item.institution} - {item.year}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Education;
