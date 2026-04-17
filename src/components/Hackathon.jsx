import { useContext } from 'react';
import { motion } from 'motion/react';
import { ThemeContext } from '../context/ThemeContext';
import { ExternalLink, Github, Trophy, Cpu, Zap, Target } from 'lucide-react';

const HACKATHONS = [
  {
    id: 1,
    name: 'Free AI Resume Analyzer',
    org: 'Coding Gita × IISc Bangalore',
    date: 'March 2026',
    badge: '🏆 Hackathon Winner',
    theme: 'AI Powered Real World Solutions',
    problem:
      'Job seekers often struggle to align their resumes with complex Applicant Tracking Systems (ATS), leading to high rejection rates despite having relevant skills.',
    solution:
      'Developed an intelligent platform using the MERN stack and AI APIs that parses resumes, calculates ATS compatibility scores, and provides actionable improvement suggestions in real-time.',
    outcome:
      'Successfully built a production-ready tool that identifies critical skill gaps and provides automated feedback, significantly improving a candidate\'s chance of passing initial screenings.',
    tags: ['AI', 'MERN Stack', 'React', 'Node.js', 'MongoDB', 'Express'],
    liveLink: 'https://art-park-code-forge-hackathon-nine.vercel.app/',
    codeLink: 'https://github.com/vedantxy/ArtPark_CodeForge_Hackathon',
    certificateLink:
      'https://res.cloudinary.com/dv7bazp5k/image/upload/q_auto/f_auto/v1775489564/73e7cdda-ea5d-4ca9-84ab-77fe49695dcb_jkapar.jpg',
    image:
      'https://www.resumeanalyzerai.com/demo-video-cover.png',
  },
];

function Hackathon() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <section id="hackathon" className="py-24 px-6 relative overflow-hidden">
      {/* ── Ultra-Premium White Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 1. Pure White Base */}
        <div 
          className="absolute inset-0 bg-[#ffffff]"
        />

        {/* 2. Structured Design Grid (Minimal) */}
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{ 
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px'
          }}
        />

        {/* 3. Soft Subtle Radial Gradient for Depth */}
        <div 
          className="absolute inset-0 opacity-[0.4]"
          style={{ 
            background: 'radial-gradient(circle at 50% 0%, #f8f9fb 0%, transparent 70%)'
          }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        
        {/* Modern Header (Clean & Minimal) */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-start gap-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a0a]">
              🏆 Hackathons
            </h2>
            <p className="text-[#6b7280] text-lg font-medium max-w-2xl">
              Competing under pressure — building real solutions in record time.
            </p>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '60px' }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-1 bg-[#0a0a0a] rounded-full"
            />
          </motion.div>
        </div>

        {/* Featured Hackathon Card (White-Dominant) */}
        {HACKATHONS.map((hackathon) => (
          <motion.div
            key={hackathon.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.6 }}
            className="relative group bg-white border border-black/[0.06] rounded-[2.5rem] p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.06)] overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 md:gap-20">
              
              {/* Left Column: Visuals */}
              <div className="space-y-10">
                <div 
                  className="relative aspect-[16/10] rounded-[1.5rem] overflow-hidden border border-black/[0.04] transition-all duration-500"
                  data-cursor="media"
                >
                  <motion.img
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.8 }}
                    src={hackathon.image}
                    alt={hackathon.name}
                    className="w-full h-full object-cover filter grayscale-[0.9] contrast-[1.05] brightness-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
                </div>

                {/* Sub-details (Problem/Solution/Outcome) for Desktop */}
                <div className="hidden lg:grid grid-cols-1 gap-10 px-2">
                  <DetailSection 
                    icon={<Target size={18} className="text-[#9ca3af]" />} 
                    label="Problem Statement" 
                    text={hackathon.problem} 
                  />
                  <DetailSection 
                    icon={<Zap size={18} className="text-[#9ca3af]" />} 
                    label="Solution" 
                    text={hackathon.solution} 
                  />
                </div>
              </div>

              {/* Right Column: Content & Actions */}
              <div className="flex flex-col justify-between py-2">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 bg-[#f3f4f6] rounded-full">
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#374151]">
                      {hackathon.theme}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-4 tracking-tight">
                    {hackathon.name}
                  </h3>
                  <p className="text-[#6b7280] text-base mb-10 leading-relaxed font-medium">
                    Organized by {hackathon.org} • {hackathon.date}
                  </p>

                  {/* Outcome for Mobile & Sidebar for Desktop */}
                  <div className="lg:hidden mb-10 space-y-10">
                    <DetailSection label="Problem Statement" text={hackathon.problem} />
                    <DetailSection label="Solution" text={hackathon.solution} />
                  </div>

                  <DetailSection 
                    icon={<Cpu size={18} className="text-[#9ca3af]" />} 
                    label="Outcome" 
                    text={hackathon.outcome} 
                  />

                  {/* Tech Stack Chips */}
                  <div className="mt-12">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#9ca3af] mb-6 ml-1">Developed With</p>
                    <div className="flex flex-wrap gap-3">
                      {hackathon.tags.map((tag) => (
                        <motion.span
                          key={tag}
                          whileHover={{ scale: 1.03, background: '#e5e7eb' }}
                          className="px-5 py-2.5 bg-[#f3f4f6] rounded-xl text-[13px] font-semibold text-[#374151] cursor-default transition-all"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-5 mt-16">
                  <motion.a
                    href={hackathon.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-magnetic="true"
                    data-cursor-text="Visit Site"
                    whileHover={{ scale: 1.03, background: '#1a1a1a' }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-10 py-4 bg-[#0a0a0a] text-white rounded-2xl font-bold text-sm shadow-xl transition-all"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </motion.a>

                  <motion.a
                    href={hackathon.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-magnetic="true"
                    data-cursor-text="GitHub"
                    whileHover={{ scale: 1.03, background: '#fafafa' }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-10 py-4 border border-[#e5e7eb] text-[#0a0a0a] rounded-2xl font-bold text-sm bg-transparent transition-all"
                  >
                    <Github size={18} />
                    Source Code
                  </motion.a>

                  <motion.a
                    href={hackathon.certificateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-magnetic="true"
                    data-cursor-text="Award"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-10 py-4 border border-[#e5e7eb] text-[#6b7280] rounded-2xl font-bold text-sm hover:border-black/20 hover:text-black transition-all ml-auto lg:ml-0"
                  >
                    <Trophy size={18} />
                    Certificate
                  </motion.a>
                </div>
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function DetailSection({ icon, label, text }) {
  return (
    <div className="group/item">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 group-hover/item:text-slate-300 transition-colors">
          {label}
        </h4>
      </div>
      <p className="text-[13px] md:text-sm leading-relaxed text-slate-400 group-hover/item:text-slate-200 transition-colors">
        {text}
      </p>
    </div>
  );
}

export default Hackathon;
