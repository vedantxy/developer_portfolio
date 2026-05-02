import { useContext } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import { ThemeContext } from '../context/ThemeContext';
import { 
  Trophy, 
  Award, 
  Code2, 
  Rocket, 
  Cpu, 
  Palette,
  ChevronRight
} from 'lucide-react';

const ACHIEVEMENTS = [
  {
    id: 1,
    Icon: Trophy,
    title: 'CodeForge Hackathon Participant',
    org: 'IISc Bangalore × Coding Gita',
    date: 'March 2026',
    description:
      'Built and deployed an AI-powered full-stack application within strict time constraints using MERN stack.',
    accent: '#000000',
    status: 'Participant'
  },
  {
    id: 2,
    Icon: Award,
    title: 'HackerRank CSS Certified',
    org: 'HackerRank',
    date: 'December 2025',
    description:
      'Demonstrated proficiency in styling fundamentals, layout techniques, and modern CSS animations.',
    accent: '#4B5563',
    status: 'Certified'
  },
  {
    id: 3,
    Icon: Code2,
    title: 'Full-Stack MERN Developer',
    org: 'Coding Gita',
    date: '2025 – 2026',
    description:
      'Comprehensive programme covering React, Node.js, and complex full-stack architecture.',
    accent: '#1F2937',
    status: 'Completed'
  },
  {
    id: 4,
    Icon: Rocket,
    title: '10+ Frontend Projects',
    org: 'Self-driven',
    date: '2025 – 2026',
    description:
      'Successfully deployed over 10 feature-rich frontend applications across various domains.',
    accent: '#374151',
    status: 'Deployed'
  },
  {
    id: 5,
    Icon: Cpu,
    title: '2+ Apps in Production',
    org: 'Self / Coding Gita',
    date: '2026',
    description:
      'Maintained live full-stack applications like CleanPulse and ArtPark for real-world usage.',
    accent: '#111827',
    status: 'Live'
  },
  {
    id: 6,
    Icon: Palette,
    title: '3+ Figma UI/UX Designs',
    org: 'Figma',
    date: '2025 – 2026',
    description:
      'Created professional-grade UI/UX designs focusing on usability, visual hierarchy, and modern design principles.',
    accent: '#000000',
    status: 'Designed'
  },
];

function AchievementCard({ achievement, index, isDark }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.21, 1.11, 0.81, 0.99] }}
      onMouseMove={handleMouseMove}
      className="group relative rounded-[2.5rem] border p-10 transition-all duration-700 hover:-translate-y-3 overflow-hidden"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', boxShadow: 'var(--glow)' }}
    >
      {/* ── Spotlight Background ── */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(0,0,0,0.025),
              transparent 80%
            )
          `,
        }}
      />

      {/* ── Card Content ── */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Top Row: Icon and Status */}
        <div className="flex justify-between items-start mb-12">
          <div 
            className="w-16 h-16 rounded-[1.25rem] flex items-center justify-center border transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 shadow-lg"
            style={{ 
              background: 'var(--bg-secondary)', 
              borderColor: 'var(--border)',
              boxShadow: isDark ? '0 0 20px var(--accent-20)' : 'none'
            }}
          >
            <achievement.Icon 
              size={32} 
              strokeWidth={1.5} 
              style={{ 
                color: isDark && achievement.Icon === Trophy ? '#fbbf24' : 'var(--accent)',
                filter: isDark ? 'drop-shadow(0 0 8px currentColor)' : 'none'
              }} 
            />
          </div>
          
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
            <span className="relative flex h-1.5 w-1.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isDark ? 'bg-indigo-400' : 'bg-black/40'}`}></span>
              <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${isDark ? 'bg-indigo-500' : 'bg-black'}`}></span>
            </span>
            <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
              {achievement.status}
            </span>
          </div>
        </div>

        {/* Title and Org */}
        <div className="mb-6">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 transition-colors duration-500" 
              style={{ 
                color: 'var(--text-primary)',
                textShadow: isDark ? '0 0 20px rgba(99, 102, 241, 0.4)' : 'none'
              }}>
            {achievement.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-[13px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>
            <span>{achievement.org}</span>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
            <span>{achievement.date}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-base leading-relaxed mb-12 flex-grow max-w-[95%]" style={{ color: 'var(--text-secondary)' }}>
          {achievement.description}
        </p>

        {/* Bottom Decorative Section */}
        <div className="flex items-center justify-between pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>
            Ref. {achievement.id.toString().padStart(3, '0')}
          </span>
          <div className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors px-2" style={{ borderColor: 'var(--border)' }}>
            <ChevronRight size={18} style={{ color: 'var(--text-muted)' }} />
          </div>
        </div>
      </div>

      {/* Subtle corner detail */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/5 to-transparent pointer-events-none" />
    </motion.div>
  );
}

function Achievements() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <section id="achievements" className="py-20 md:py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden transition-colors duration-500" style={{ background: 'transparent', color: 'var(--text-primary)' }}>
      
      {/* Global BackgroundSystem handles the background visuals */}

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* ── Premium Editorial Header ── */}
        <div className="flex flex-col mb-32">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-10 rounded-[2rem] border transition-colors duration-500 mb-10 inline-flex items-center gap-4 self-start"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', boxShadow: 'var(--glow)' }}
          >
            <div className="h-px w-10 bg-[var(--text-primary)]/20" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--text-secondary)]">Achievement Portfolio</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-end">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.85]"
            >
              Proven <br />
              <span className={`italic font-serif font-medium ${isDark ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 opacity-100' : 'text-black/10'}`}>
                Recognition.
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex flex-col items-start gap-8"
            >
              <p className="text-xl md:text-2xl text-black/50 font-medium leading-relaxed max-w-lg">
                High-impact milestones and industry-standard certifications that validate professional expertise in engineering and design.
              </p>
              
              {/* Dynamic Underline */}
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "circOut", delay: 0.8 }}
                className="h-1 bg-black rounded-full"
              />
            </motion.div>
          </div>
        </div>

        {/* ── Achievements Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {ACHIEVEMENTS.map((achievement, idx) => (
            <AchievementCard 
              key={achievement.id} 
              achievement={achievement} 
              index={idx}
              isDark={isDark}
            />
          ))}
        </div>

        {/* ── High-End Spacing Footer ── */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 pt-12 border-t flex justify-between items-center"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="flex gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--border)' }} />
            ))}
          </div>
          <span className="text-[9px] font-black uppercase tracking-[0.5em]" style={{ color: 'var(--text-muted)' }}>End of Record</span>
        </motion.div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,500&display=swap');
        .font-serif {
          font-family: 'Playfair Display', serif !important;
        }
      `}} />
    </section>
  );
}

export default Achievements;
