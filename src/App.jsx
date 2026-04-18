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
  const isDark = theme === 'dark';
  return {
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    particles: {
      number: { value: isDark ? 80 : 60, density: { enable: true, value_area: 900 } },
      color: { value: isDark ? '#818cf8' : '#475569' },
      shape: { type: 'circle' },
      opacity: {
        value: isDark ? 0.6 : 0.15,
        random: true,
        anim: { enable: true, speed: 0.3, opacity_min: 0.1, sync: false },
      },
      size: { value: { min: 1, max: isDark ? 3.5 : 2.5 }, random: true },
      links: {
        enable: true,
        distance: 170,
        color: isDark ? '#6366f1' : '#6366f1',
        opacity: isDark ? 0.35 : 0.08,
        width: isDark ? 1.5 : 0.8,
      },
      move: {
        enable: true,
        speed: isDark ? 0.8 : 0.6,
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
          line_linked: { opacity: 0.8, color: isDark ? '#ffffff' : '#6366f1' },
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
        <ThemeTransitionOverlay />
        <Navbar />

        {/* Page sections */}
        <Hero />
        <AboutMe />
        <Skills />
        <Achievements />
        <Hackathon />
        <Projects />
        <Education />
        <Certificates />
        <Resume />
        <Contact />


      </div>
    </EntrySequence>
  );
}

export default App;