import { useContext } from 'react';
import { motion } from 'motion/react';
import { ThemeContext } from '../context/ThemeContext';
import CertificateCard from './CertificateCard';
import cssCert from '../assets/css_certificate.jpg';

const CERTIFICATES_DATA = [
  {
    id: 1,
    title: 'ArtPark_CodeForge_Hackathon',
    org: ' IISc Bangalore',
    date: 'march 2026',
    description: 'Demonstrated strong problem-solving by implementing optimized algorithms and data structure techniques under time constraints.',
    tags: ['Full-Stack Development','Teamwork & Collaboration', 'Data Structures'],
    recipient: 'Vedant Patel',
    link: 'https://res.cloudinary.com/dv7bazp5k/image/upload/q_auto/f_auto/v1775489564/73e7cdda-ea5d-4ca9-84ab-77fe49695dcb_jkapar.jpg'
  },
  {
    id: 2,
    title: 'CSS (Basic)',
    org: 'HackerRank',
    date: 'Dec 2025',
    description: 'Earned certification for foundational CSS styling, layout design, and responsive web development expertise.',
    tags: ['CSS', 'WebDevelopment', 'Coding'],
    recipient: 'Vedant Patel',
    link: '/css_certificate.pdf',
    image: cssCert
  }
];

function Certificates() {
  const { theme, isTransitioning } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <section id="certificates" className="py-24 px-6 relative overflow-hidden bg-transparent">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 ${
            isDark ? "bg-purple-400" : "bg-purple-200"
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className={`text-5xl md:text-6xl font-bold mb-4 text-morph ${isTransitioning ? 'text-morph-active' : ''} ${isDark ? 'text-[#b8f2e6]' : 'text-[#5e6472]'}`}>
            Certificates
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`h-1 rounded-full ${isDark ? 'bg-[#b8f2e6]' : 'bg-[#aed9e0]'}`}
          />
        </motion.div>

        {/* Certificates Grid - Responsive 2-column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {CERTIFICATES_DATA.map((cert, idx) => (
            <CertificateCard 
              key={cert.id} 
              certificate={cert} 
              theme={theme} 
              delay={idx * 50}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certificates;
