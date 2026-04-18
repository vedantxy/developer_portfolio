import { useContext, useEffect, useRef, useMemo } from 'react';
import { tsParticles } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero.jsx';
import Projects from './components/Projects.jsx';
import Certificates from './components/Certificates.jsx';
import AboutMe from './components/AboutMe.jsx';
import Education from './components/Education.jsx';
import Skills from './components/Skills.jsx';
import Contact from './components/Contact.jsx';
import AnalyticsTracker from './components/AnalyticsTracker.jsx';
import SEO from './components/SEO.jsx';

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

const MainContent = ({ sectionFocus }) => {
  useEffect(() => {
    if (sectionFocus) {
      const element = document.getElementById(sectionFocus);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 500); // Give time for entry sequence
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [sectionFocus]);

  return (
    <>
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
    </>
  );
};

function App() {
  const particlesContainerRef = useRef(null);
  const { theme } = useContext(ThemeContext);
  const location = useLocation();

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

        <Routes>
          <Route path="/" element={<><SEO /><MainContent /></>} />
          <Route path="/about" element={<><SEO title="About Me" description="Learn more about Vedant Patel's journey as a developer." /><MainContent sectionFocus="about" /></>} />
          <Route path="/skills" element={<><SEO title="Skills & Expertise" description="Technical skills and professional expertise of Vedant Patel." /><MainContent sectionFocus="skills" /></>} />
          <Route path="/projects" element={<><SEO title="Projects" description="Explore the professional work and innovative projects by Vedant Patel." /><MainContent sectionFocus="projects" /></>} />
          <Route path="/education" element={<><SEO title="Education" description="Academic background and educational journey of Vedant Patel." /><MainContent sectionFocus="education" /></>} />
          <Route path="/certificates" element={<><SEO title="Certificates" description="Verified certifications and achievements of Vedant Patel." /><MainContent sectionFocus="certificates" /></>} />
          <Route path="/hackathon" element={<><SEO title="Hackathons" description="Hackathon participation and awards won by Vedant Patel." /><MainContent sectionFocus="hackathon" /></>} />
          <Route path="/achievements" element={<><SEO title="Achievements" description="Significant milestones and professional achievements of Vedant Patel." /><MainContent sectionFocus="achievements" /></>} />
          <Route path="/resume" element={<><SEO title="Resume" description="View and download the professional resume of Vedant Patel." /><MainContent sectionFocus="resume" /></>} />
          <Route path="/contact" element={<><SEO title="Contact" description="Get in touch with Vedant Patel for collaborations or inquiries." /><MainContent sectionFocus="contact" /></>} />
        </Routes>

      </div>
    </EntrySequence>
  );
}

export default App;