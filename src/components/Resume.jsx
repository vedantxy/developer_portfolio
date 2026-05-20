import { motion } from 'motion/react';
import { Download } from 'lucide-react';

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

  return (
    <section id="resume" className="w-full relative overflow-hidden py-16" style={{ background: '#7b97b0' }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left side: Name & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">
            Vedant Patel
          </h2>
          <p className="text-sm md:text-base font-medium tracking-wide text-white/80">
            Full Stack Developer | Swaminarayan University | Gandhinagar, India
          </p>
        </div>

        {/* Right side: Buttons */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = RESUME_DOWNLOAD_URL}
            className="px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 shadow-md transition-all bg-white text-[#7b97b0]"
          >
            <Download size={18} />
            Download Resume
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-2.5 rounded-lg border border-white/40 font-bold text-sm text-white backdrop-blur-sm transition-all whitespace-nowrap hover:bg-white/10"
          >
            Contact Me
          </motion.button>
        </div>
      </div>
    </section>
  );
}

export default Resume;
