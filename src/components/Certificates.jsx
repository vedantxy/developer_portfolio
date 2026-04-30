import { useContext, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeContext } from '../context/ThemeContext';
import CertificateCard from './CertificateCard';
import { X, Award, Briefcase, Calendar, Star, CheckCircle2, ExternalLink } from 'lucide-react';
import cssCert from '../assets/css_certificate.jpg';

const CERTIFICATES_DATA = [
  {
    id: 1,
    title: 'CSS (Basic)',
    org: 'HackerRank',
    date: 'August 2025',
    description: 'Basic CSS certification demonstrating knowledge of selectors, box model, layout techniques, and core styling principles for web design.',
    skills: ['Selectors', 'Box Model', 'Positioning', 'Flexbox', 'Styling Basics'],
    tags: ['Selectors', 'Box Model', 'Flexbox'],
    credentialId: '7deb76442b7e',
    category: 'Frontend',
    link: 'https://www.hackerrank.com/certificates/5c784d181ad9',
    image: cssCert,
    featured: true
  },
  {
    id: 2,
    title: 'ArtPark CodeForge Hackathon',
    org: 'IISc Bangalore',
    date: 'March 2026',
    description: 'Secured a top position by developing high-performance algorithms for advanced career-tech solutions at IISc Bangalore.',
    skills: ['Algorithms', 'Full-Stack', 'MERN', 'Problem Solving'],
    tags: ['Algorithms', 'MERN'],
    credentialId: 'APC-2026-VG',
    category: 'Competitions',
    image: 'https://res.cloudinary.com/dv7bazp5k/image/upload/q_auto/f_auto/v1775489564/73e7cdda-ea5d-4ca9-84ab-77fe49695dcb_jkapar.jpg',
    link: 'https://unstop.com/certificate-preview/73e7cdda-ea5d-4ca9-84ab-77fe49695dcb'
  }
];

function CertificateModal({ cert, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden border"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-8 md:p-10 pb-0 flex items-start justify-between">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center border shadow-sm" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
                <Award size={32} style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <h2 className="text-3xl font-black mb-2 leading-tight" style={{ color: 'var(--text-primary)' }}>
                  {cert.title}
                </h2>
                <div className="flex items-center gap-4 font-bold text-sm" style={{ color: 'var(--text-muted)' }}>
                  <div className="flex items-center gap-1.5">
                    <Briefcase size={16} />
                    <span>{cert.org}</span>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--border)' }} />
                  <div className="flex items-center gap-1.5">
                    <Calendar size={16} />
                    <span>{cert.date}</span>
                  </div>
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              <X size={24} />
            </button>
          </div>

          {/* Body */}
          <div className="p-8 md:p-10 space-y-8">
            <div className="p-6 rounded-2xl border leading-relaxed font-medium text-base" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
              {cert.description}
            </div>

            <div>
              <div className="flex items-center gap-2 font-black uppercase tracking-widest text-xs mb-6" style={{ color: 'var(--accent)' }}>
                <Star size={16} />
                <span>Skills & Technologies</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {cert.skills.map((skill, i) => (
                  <div 
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm text-sm font-bold"
                    style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                  >
                    <CheckCircle2 size={14} style={{ color: 'var(--accent)' }} />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
                <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}># Credential ID</p>
                <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{cert.credentialId}</p>
              </div>
              <div className="p-5 rounded-2xl border" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
                <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>⋔ Category</p>
                <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{cert.category}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-8 md:p-10 pt-0 flex gap-4 justify-end">
            <button 
              onClick={onClose}
              className="px-8 py-3.5 rounded-xl font-black text-sm transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              Close
            </button>
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-black text-sm transition-all shadow-md hover:shadow-lg"
              style={{ background: 'var(--accent)' }}
            >
              View Live Certificate
              <ExternalLink size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certificates" className="pt-24 pb-32 md:pt-32 md:pb-48 px-6 relative overflow-hidden transition-colors duration-500" style={{ background: 'transparent' }}>
      {/* Background system handles global patterns */}
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20 md:mb-32 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 0.03, scale: 1 }}
            viewport={{ once: true }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 text-[120px] md:text-[200px] font-black pointer-events-none select-none lg:block hidden"
            style={{ color: 'var(--text-primary)' }}
          >
            02
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-black tracking-[0.4em] uppercase mb-6 block"
            style={{ color: 'var(--text-muted)' }}
          >
            My Achievements
          </motion.span>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8" style={{ color: 'var(--text-primary)' }}>
              Certificates
            </h2>
            <div className="h-px w-24 mx-auto" style={{ background: 'var(--gradient-line)', opacity: 0.3 }} />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {CERTIFICATES_DATA.map((cert) => (
            <CertificateCard 
              key={cert.id} 
              certificate={cert} 
              onClick={() => setSelectedCert(cert)}
            />
          ))}
        </div>
      </div>

      <CertificateModal 
        cert={selectedCert} 
        isOpen={!!selectedCert} 
        onClose={() => setSelectedCert(null)} 
      />
    </section>
  );
}

export default Certificates;



