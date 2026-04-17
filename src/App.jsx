import { useContext, useEffect, useRef, useMemo } from 'react';
import { tsParticles } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import Navbar from './components/Navbar';
import Hero from './components/Hero.jsx';
import Projects from './components/Projects.jsx';
import Certificates from './components/Certificates.jsx';
import AboutMe from './components/AboutMe.jsx';
import Education from './components/Education.jsx';
import Skills from './components/Skills.jsx';
import Contact from './components/Contact.jsx';
import AnalyticsTracker from './components/AnalyticsTracker.jsx';

import Hackathon from './components/Hackathon.jsx';
import Achievements from './components/Achievements.jsx';
import Resume from './components/Resume.jsx';

import { ThemeContext } from './context/ThemeContext';
import ThemeTransitionOverlay from './components/ThemeTransitionOverlay';
import CustomCursor from './components/CustomCursor.jsx';

// Monochrome Gray+White particle configs per theme
const getParticleOptions = (theme) => {
  const isMono = theme !== 'neon';
  return {
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    particles: {
      number: { value: theme === 'neon' ? 100 : 60, density: { enable: true, value_area: 900 } },
      color: { value: '#ffffff' },
      shape: { type: 'circle' },
      opacity: {
        value: theme === 'dark' ? 0.18 : theme === 'light' ? 0.12 : 0.35,
        random: true,
        anim: { enable: true, speed: 0.3, opacity_min: 0.05, sync: false },
      },
      size: { value: { min: 1, max: 2.5 }, random: true },
      links: {
        enable: true,
        distance: 170,
        color: '#ffffff',
        opacity: theme === 'dark' ? 0.07 : theme === 'light' ? 0.05 : 0.18,
        width: 0.8,
      },
      move: {
        enable: true,
        speed: theme === 'neon' ? 1.2 : 0.5,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'grab' },
        onClick: { enable: false },
        resize: { enable: true },
      },
      modes: {
        grab: {
          distance: 160,
          line_linked: { opacity: 0.25, color: '#ffffff' },
        },
      },
    },
    detectRetina: true,
  };
};


import EntrySequence from './components/EntrySequence.jsx';

function App() {
  const particlesContainerRef = useRef(null);
  const { theme } = useContext(ThemeContext);

  const particlesOptions = useMemo(() => getParticleOptions(theme), [theme]);

  useEffect(() => {
    const initParticles = async () => {
      if (!particlesContainerRef.current) return;
      try {
        await loadSlim(tsParticles);
        await tsParticles.load({
          id: 'tsparticles',
          element: particlesContainerRef.current,
          options: particlesOptions,
        });
      } catch (error) {
        console.error('tsParticles failed to load:', error);
      }
    };
    initParticles();
    return () => {
      const container = tsParticles.dom().find((c) => c.id === 'tsparticles');
      if (container) container.destroy();
    };
  }, [particlesOptions]);

  return (
    <EntrySequence>
      <div
        className="relative min-h-screen w-full"
        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
      >
        <CustomCursor />

        {/* Particle background */}
        <div
          id="tsparticles"
          ref={particlesContainerRef}
          className="absolute inset-0 w-full h-full particles-canvas"
          style={{ minHeight: '100vh', zIndex: -10 }}
        />

        <AnalyticsTracker />
        <Navbar />

        {/* Page sections */}
        <Hero />
        <AboutMe />
        <Skills />
        <Projects />
        <Education />
        <Achievements />
        <Certificates />
        <Hackathon />
        <Resume />
        <Contact />


      </div>
    </EntrySequence>
  );
}

export default App;