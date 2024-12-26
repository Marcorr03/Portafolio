import React from 'react';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

const App = () => {
    return (
        <div className="App">
            <Header />
            <main>
                <About />
                <Projects />
                <Education />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

export default App;
