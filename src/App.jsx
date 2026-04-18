import { useContext, useEffect, useRef, useMemo, lazy, Suspense } from 'react';
import { tsParticles } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero.jsx';
import AboutMe from './components/AboutMe.jsx';
import AnalyticsTracker from './components/AnalyticsTracker.jsx';
import SEO from './components/SEO.jsx';

// Lazy load non-critical sections for performance optimization
const Projects = lazy(() => import('./components/Projects.jsx'));
const Certificates = lazy(() => import('./components/Certificates.jsx'));
const Education = lazy(() => import('./components/Education.jsx'));
const Skills = lazy(() => import('./components/Skills.jsx'));
const Contact = lazy(() => import('./components/Contact.jsx'));
const Hackathon = lazy(() => import('./components/Hackathon.jsx'));
const Achievements = lazy(() => import('./components/Achievements.jsx'));
const Resume = lazy(() => import('./components/Resume.jsx'));

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
      number: { value: isDark ? 40 : 30, density: { enable: true, value_area: 1200 } },
      color: { value: isDark ? '#818cf8' : '#475569' },
      shape: { type: 'circle' },
      opacity: {
        value: isDark ? 0.4 : 0.1,
        random: false,
        anim: { enable: false },
      },
      size: { value: { min: 1, max: isDark ? 2.5 : 1.5 }, random: true },
      links: {
        enable: true,
        distance: 150,
        color: isDark ? '#6366f1' : '#6366f1',
        opacity: isDark ? 0.25 : 0.05,
        width: isDark ? 1 : 0.5,
      },
      move: {
        enable: true,
        speed: isDark ? 0.6 : 0.4,
        direction: 'none',
        random: false,
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

const MainContent = ({ sectionFocus }) => {
  useEffect(() => {
    if (sectionFocus) {
      const element = document.getElementById(sectionFocus);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 600); // Give time for entry sequence and lazy loading
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [sectionFocus]);

  return (
    <Suspense fallback={<div className="min-h-screen" />}>
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
    </Suspense>
  );
};

function App() {
  const particlesContainerRef = useRef(null);
  const { theme } = useContext(ThemeContext);
  const location = useLocation();

  const particlesOptions = useMemo(() => getParticleOptions(theme), [theme]);

  useEffect(() => {
    // Delay particles slightly to prioritize LCP
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
    
    const timeout = setTimeout(initParticles, 1000);
    return () => {
      clearTimeout(timeout);
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

        <Routes>
          <Route path="/" element={<><SEO /><MainContent /></>} />
          <Route path="/about" element={<><SEO title="About Me" /><MainContent sectionFocus="about" /></>} />
          <Route path="/skills" element={<><SEO title="Skills" /><MainContent sectionFocus="skills" /></>} />
          <Route path="/projects" element={<><SEO title="Projects" /><MainContent sectionFocus="projects" /></>} />
          <Route path="/education" element={<><SEO title="Education" /><MainContent sectionFocus="education" /></>} />
          <Route path="/certificates" element={<><SEO title="Certificates" /><MainContent sectionFocus="certificates" /></>} />
          <Route path="/hackathon" element={<><SEO title="Hackathons" /><MainContent sectionFocus="hackathon" /></>} />
          <Route path="/achievements" element={<><SEO title="Achievements" /><MainContent sectionFocus="achievements" /></>} />
          <Route path="/resume" element={<><SEO title="Resume" /><MainContent sectionFocus="resume" /></>} />
          <Route path="/contact" element={<><SEO title="Contact" /><MainContent sectionFocus="contact" /></>} />
        </Routes>

      </div>
    </EntrySequence>
  );
}

export default App;