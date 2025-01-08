import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../css/contact.css';

const Contact = () => {
    const socialLinks = [
        { name: 'WhatsApp', url: 'https://wa.me/87236101', icon: 'fab fa-whatsapp', color: '#25D366' },
        { name: 'GitHub', url: 'https://github.com/Marcorr03', icon: 'fab fa-github', color: '#333' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/marco-rodríguez-b42a50309', icon: 'fab fa-linkedin', color: '#0077B5' },
        { name: 'Instagram', url: 'https://www.instagram.com/marco_rr03', icon: 'fab fa-instagram', color: '#E4405F' },
        { name: 'YouTube', url: 'https://www.youtube.com/@codewithMarco', icon: 'fab fa-youtube', color: '#FF0000' },
    ];

    return (
        <section id="contact">
             <div className='title2'>
             <i className='fas fa-comments'></i>
                <h2>Contacto</h2>
            </div>
           
            <div className="social-links">
                 <p>Envíame un mensaje a <a href="mailto:marcoanrr0314@gmail.com" className='link'>marcoanrr0314@gmail.com</a></p>
                {socialLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        style={{ color: link.color }} 
                    >
                        <i className={link.icon}></i>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default Contact;
