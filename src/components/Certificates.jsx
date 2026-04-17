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
          className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-8 md:p-10 pb-0 flex items-start justify-between">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm">
                <Award size={32} className="text-[#84a3c4]" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-[#5e7ca7] mb-2 leading-tight">
                  {cert.title}
                </h2>
                <div className="flex items-center gap-4 text-slate-500 font-bold text-sm">
                  <div className="flex items-center gap-1.5">
                    <Briefcase size={16} />
                    <span>{cert.org}</span>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                  <div className="flex items-center gap-1.5">
                    <Calendar size={16} />
                    <span>{cert.date}</span>
                  </div>
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-50 transition-colors text-slate-400"
            >
              <X size={24} />
            </button>
          </div>

          {/* Body */}
          <div className="p-8 md:p-10 space-y-8">
            <div className="p-6 rounded-2xl bg-slate-50/50 border border-slate-100 leading-relaxed text-[#424245] font-medium text-base">
              {cert.description}
            </div>

            <div>
              <div className="flex items-center gap-2 text-[#84a3c4] font-black uppercase tracking-widest text-xs mb-6">
                <Star size={16} />
                <span>Skills & Technologies</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {cert.skills.map((skill, i) => (
                  <div 
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm text-sm font-bold text-slate-700"
                  >
                    <CheckCircle2 size={14} className="text-slate-400" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50/50 border border-slate-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2"># Credential ID</p>
                <p className="font-bold text-slate-700">{cert.credentialId}</p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50/50 border border-slate-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">⋔ Category</p>
                <p className="font-bold text-slate-700">{cert.category}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-8 md:p-10 pt-0 flex gap-4 justify-end">
            <button 
              onClick={onClose}
              className="px-8 py-3.5 rounded-xl font-black text-sm text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Close
            </button>
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#84a3c4] hover:bg-[#728fb0] text-white font-black text-sm transition-all shadow-md hover:shadow-lg"
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

  const bgCircles = useMemo(() => (
    <div className="absolute inset-0 pointer-events-none opacity-[0.05] overflow-hidden">
      <div className="absolute inset-0" style={{ 
        backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', 
        backgroundSize: '40px 40px' 
      }} />
    </div>
  ), []);

  return (
    <section id="certificates" className="pt-16 pb-24 md:pt-20 md:pb-40 px-6 relative overflow-hidden bg-[#f4f7f6]">
      {bgCircles}
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20 md:mb-32 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 0.03, scale: 1 }}
            viewport={{ once: true }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 text-[120px] md:text-[200px] font-black pointer-events-none select-none text-slate-900 lg:block hidden"
          >
            02
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-black tracking-[0.4em] uppercase text-slate-400 mb-6 block"
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
            <h2 className="text-5xl md:text-7xl font-black tracking-tight text-[#5e7ca7] mb-8">
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



