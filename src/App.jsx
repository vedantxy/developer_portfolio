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
import SocialSidebar from './components/SocialSidebar.jsx';
import { Analytics } from '@vercel/analytics/react';
import { ThemeContext } from './context/ThemeContext';
import ThemeTransitionOverlay from './components/ThemeTransitionOverlay';
import CustomCursor from './components/CustomCursor.jsx';

function App() {
  const particlesContainerRef = useRef(null);
  const { theme } = useContext(ThemeContext);

  const particlesOptions = useMemo(() => {
    return {
      background: {
        color: theme === 'dark' ? '#1c1c1c' : '#fafafa',
      },
      fpsLimit: 60,
      particles: {
        number: {
          value: 80,
          density: { enable: true, value_area: 800 },
        },
        color: { value: theme === 'dark' ? '#ffffff' : '#000000' },
        shape: { type: 'circle' },
        opacity: {
          value: { min: 0.3, max: 0.6 },
          random: true,
          anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false },
        },
        size: {
          value: { min: 2.5, max: 3},
          random: true,
          anim: { enable: true, speed: 2, size_min: 1, sync: false },
        },
        links: {
           enable: true,
          distance: 180,
          color: theme === 'dark' ? '#00BFFF' : '#1a73e8',
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: ['bubble', 'grab'],
          },
          onClick: {
            enable: false,
          },
          resize: { enable: true },
        },
        modes: {
          grab: {
            distance: 150,
            line_linked: {
              opacity: 0.2,
              color: '#00BFFF',
            },
          },
          bubble: {
            distance: 100,
            size: 6,
            opacity: 0.8,
            duration: 2,
            color: '#00BFFF'
          },
        },
      },
      detectRetina: true,
    };
  }, [theme]);

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
      if (container) {
        container.destroy();
      }
    };
  }, [particlesOptions]);

  return (
    <div className="relative min-h-screen w-full bg-transparent">
      <CustomCursor />
      <div
        id="tsparticles"
        ref={particlesContainerRef}
        className="absolute inset-0 w-full h-full particles-canvas"
        style={{ minHeight: '100vh', zIndex: -10 }}
      />
      <Analytics />
      <AnalyticsTracker />
      <SocialSidebar />
      <Navbar />
      <Hero />
      <AboutMe />
      <Skills />
      <Projects />
      <Certificates />
      <Education />
      <Contact />
    </div>
  );
}

export default App;