import { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeContext } from '../context/ThemeContext';
import { FileText, X, ExternalLink, Download } from 'lucide-react';

const RESUME_DRIVE_ID = '1YFi7wZHKKj8DRVWcL4FBWq8gsH5BHpFS';
const RESUME_EMBED_URL = `https://drive.google.com/file/d/${RESUME_DRIVE_ID}/preview`;
const RESUME_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${RESUME_DRIVE_ID}`;

const HIGHLIGHTS = [
  { label: 'Frontend', items: ['React.js', 'HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'] },
  { label: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs'] },
  { label: 'Database', items: ['MongoDB', 'Mongoose'] },
  { label: 'Tools', items: ['Git', 'GitHub', 'Figma', 'Postman', 'Vite'] },
];

function Resume() {
  const { theme, isTransitioning } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="resume" className="py-20 px-6 relative overflow-hidden bg-transparent">
      <div className="max-w-[1280px] mx-auto relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative min-h-[180px] w-full rounded-[2.5rem] overflow-hidden flex items-center shadow-2xl border"
          style={{ 
            background: 'var(--bg-card)',
            borderColor: 'var(--border)'
          }}
        >
          {/* Subtle Dot Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.4] pointer-events-none" 
            style={{ 
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }} 
          />

          <div className="relative z-10 w-full px-8 md:px-16 py-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
            
            {/* Left side: Name & Tagline */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                Vedant Patel
              </h2>
              <p className="text-[13px] md:text-sm font-medium tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                Full Stack Developer | Swaminarayan University | Gandhinagar, India
              </p>
            </div>

            {/* Right side: Buttons */}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open(RESUME_DOWNLOAD_URL, '_blank')}
                className="px-6 md:px-8 py-3 rounded-xl font-bold text-[13px] md:text-sm flex items-center gap-2 shadow-lg transition-all"
                style={{ background: 'var(--accent)', color: 'white' }}
              >
                <Download size={18} />
                Download Resume
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 md:px-8 py-3 rounded-xl border font-bold text-[13px] md:text-sm backdrop-blur-md transition-all whitespace-nowrap"
                style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
              >
                Contact Me
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Resume;
