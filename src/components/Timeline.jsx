import { useContext } from 'react';
import { motion } from 'motion/react';
import { ThemeContext } from '../context/ThemeContext';
import { Briefcase, Code2, Rocket, GraduationCap, Star } from 'lucide-react';

const TIMELINE_DATA = [
  {
    id: 1,
    year: '2023',
    title: 'Started Web Development',
    org: 'Self-taught',
    description: 'Began learning HTML, CSS, and JavaScript fundamentals. Built first static websites and discovered a passion for frontend development.',
    icon: Code2,
    color: '#00F5FF',
    side: 'left',
  },
  {
    id: 2,
    year: '2024',
    title: 'Enrolled at Coding Gita',
    org: 'Coding Gita',
    description: 'Joined the Full-Stack MERN Development Programme. Dived deep into React.js, Node.js, Express, MongoDB and modern dev workflows.',
    icon: GraduationCap,
    color: '#8A2BE2',
    side: 'right',
  },
  {
    id: 3,
    year: '2025',
    title: 'HackerRank CSS Certified',
    org: 'HackerRank',
    description: 'Earned the official CSS (Basic) certification from HackerRank, validating expertise in styling, layouts, and responsive design.',
    icon: Star,
    color: '#00EA64',
    side: 'left',
  },
  {
    id: 4,
    year: '2025',
    title: 'Deployed 10+ Clone Projects',
    org: 'Netlify',
    description: 'Built and deployed 10+ frontend clone projects across e-commerce, logistics, and fintech domains. Mastered pixel-perfect UI replication.',
    icon: Rocket,
    color: '#FFD700',
    side: 'right',
  },
  {
    id: 5,
    year: '2026',
    title: 'Built Full-Stack Applications',
    org: 'Vercel',
    description: 'Developed and launched CleanPulse (smart waste management) and ArtPark (AI career tools) — production-ready MERN apps with live deployment.',
    icon: Briefcase,
    color: '#FF6B6B',
    side: 'left',
  },
  {
    id: 6,
    year: '2026',
    title: 'CodeForge Hackathon',
    org: 'IISc Bangalore',
    description: 'Competed at CodeForge Hackathon, collaborating with a team to build an AI-powered solution under a strict time constraint. Delivered a working product.',
    icon: Star,
    color: '#00F5FF',
    side: 'right',
  },
];

function TimelineCard({ item, idx }) {
  const { theme, isTransitioning } = useContext(ThemeContext);
  const Icon = item.icon;
  const isLeft = item.side === 'left';

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      className={`relative flex items-center ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-row gap-6 lg:gap-12 mb-12`}
    >
      {/* Content Card */}
      <div className="flex-1 lg:w-5/12">
        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={`glass-card space-card p-6 rounded-2xl card-theme-animation ${isTransitioning ? 'theme-transition-tilt' : ''}`}
          style={{ borderColor: `${item.color}30` }}
        >
          {/* Year badge */}
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
            style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}
          >
            {item.year}
          </span>
          <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            {item.title}
          </h3>
          <p className="text-xs font-semibold mb-3" style={{ color: item.color }}>
            {item.org}
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {item.description}
          </p>
        </motion.div>
      </div>

      {/* Central icon node */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        <motion.div
          animate={{ boxShadow: [`0 0 10px ${item.color}40`, `0 0 25px ${item.color}80`, `0 0 10px ${item.color}40`] }}
          transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
          className="w-12 h-12 rounded-full flex items-center justify-center z-10"
          style={{ background: `${item.color}15`, border: `2px solid ${item.color}` }}
        >
          <Icon size={20} style={{ color: item.color }} />
        </motion.div>
      </div>

      {/* Empty spacer for alternating layout */}
      <div className="hidden lg:block flex-1 lg:w-5/12" />
    </motion.div>
  );
}

function Timeline() {
  const { theme, isTransitioning } = useContext(ThemeContext);

  return (
    <section id="timeline" className="py-24 px-6 relative overflow-hidden" style={{ background: 'transparent' }}>
      {/* Background blob */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 30, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-5"
          style={{ background: 'var(--accent-1)' }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2
            className={`text-5xl md:text-6xl font-bold mb-4 text-morph ${isTransitioning ? 'text-morph-active' : ''}`}
            style={{ color: 'var(--text-primary)' }}
          >
            My Journey
          </h2>
          <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
            From curiosity to creation — a timeline of growth.
          </p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '6rem' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 mx-auto rounded-full"
            style={{ background: 'var(--accent-1)' }}
          />
        </motion.div>

        {/* Vertical line */}
        <div className="relative">
          <div
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: `linear-gradient(to bottom, transparent, var(--accent-1), transparent)` }}
          />

          {/* Cards */}
          {TIMELINE_DATA.map((item, idx) => (
            <TimelineCard key={item.id} item={item} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Timeline;
