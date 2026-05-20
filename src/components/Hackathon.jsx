import React, { memo } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, Trophy, Cpu, Zap, Target, Play, Clock, Users, Award, ArrowUpRight } from 'lucide-react';

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
    youtubeLink: 'https://youtu.be/iHOUewlpLHg',
    image:
      'https://www.resumeanalyzerai.com/demo-video-cover.png',
    metrics: [
      { icon: <Clock size={14} />, value: '48h', label: 'Build Time' },
      { icon: <Users size={14} />, value: '500+', label: 'Users' },
      { icon: <Award size={14} />, value: '1st', label: 'Place' },
    ],
  },
];

const Hackathon = memo(() => {
  return (
    <section id="hackathon" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden transition-colors duration-500" style={{ background: 'transparent' }}>
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-[1100px] mx-auto relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-[2px] rounded-full bg-amber-500" />
            <span className="text-[11px] font-black tracking-[0.3em] uppercase text-amber-500">
              Hackathons
            </span>
            <div className="w-8 h-[2px] rounded-full bg-amber-500" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-5" style={{ color: 'var(--text-primary)' }}>
            Competing under{' '}
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              pressure
            </span>
          </h2>
          <p className="text-lg font-medium opacity-50 max-w-lg mx-auto" style={{ color: 'var(--text-primary)' }}>
            Building real solutions in record time — where ideas meet execution.
          </p>
        </motion.div>

        {/* ── Featured Hackathon Cards ── */}
        {HACKATHONS.map((hackathon) => (
          <motion.div
            key={hackathon.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-[2rem] md:rounded-[2.5rem] border border-[var(--border)] overflow-hidden transition-all duration-500 hover:border-amber-500/20 group"
            style={{ background: 'var(--bg-card)', boxShadow: 'var(--glow)' }}
          >
            {/* ── Winner Ribbon ── */}
            <div className="absolute top-6 right-6 z-30">
              <motion.div
                initial={{ scale: 0, rotate: -12 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 15 }}
                className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-amber-500/30 shadow-lg"
                style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(249, 115, 22, 0.1) 100%)' }}
              >
                <Trophy size={14} className="text-amber-500" />
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-500">
                  Winner
                </span>
              </motion.div>
            </div>

            {/* ── Card Hover Glow ── */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2.5rem]" />

            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-0">

              {/* ══ Left Column: Image + Details ══ */}
              <div className="p-6 md:p-10 flex flex-col gap-8">

                {/* Image with Play Button */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative aspect-[16/10] rounded-2xl md:rounded-3xl overflow-hidden border border-[var(--border)] group/img"
                >
                  <img
                    src={hackathon.image}
                    alt={hackathon.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                  {/* Play Button */}
                  <a
                    href={hackathon.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-2xl group-hover/img:bg-white/30 transition-all duration-300"
                    >
                      <Play size={24} className="text-white ml-1" fill="white" />
                    </motion.div>
                  </a>

                  {/* Bottom image badge */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">
                      Watch Demo
                    </span>
                  </div>
                </motion.div>

                {/* Problem / Solution / Outcome — Glassmorphic Cards */}
                <div className="flex flex-col gap-4">
                  <DetailCard
                    icon={<Target size={16} />}
                    label="Problem"
                    text={hackathon.problem}
                    accentColor="#ef4444"
                    delay={0.3}
                  />
                  <DetailCard
                    icon={<Zap size={16} />}
                    label="Solution"
                    text={hackathon.solution}
                    accentColor="#22c55e"
                    delay={0.4}
                  />
                  <DetailCard
                    icon={<Cpu size={16} />}
                    label="Outcome"
                    text={hackathon.outcome}
                    accentColor="#6366f1"
                    delay={0.5}
                  />
                </div>
              </div>

              {/* ══ Right Column: Content & Actions ══ */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="p-6 md:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[var(--border)]"
              >
                <div>
                  {/* Theme Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.15em]" style={{ color: 'var(--text-secondary)' }}>
                      {hackathon.theme}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl md:text-4xl font-black mb-3 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    {hackathon.name}
                  </h3>
                  <p className="text-sm font-semibold mb-8 opacity-50" style={{ color: 'var(--text-primary)' }}>
                    Organized by {hackathon.org} • {hackathon.date}
                  </p>

                  {/* ── Impact Metrics ── */}
                  <div className="flex gap-3 mb-10">
                    {hackathon.metrics.map((metric, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        whileHover={{ y: -3, scale: 1.03 }}
                        className="flex-1 p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] text-center group/metric transition-all duration-300 hover:border-amber-500/20"
                      >
                        <div className="flex items-center justify-center mb-2 text-amber-500 group-hover/metric:scale-110 transition-transform">
                          {metric.icon}
                        </div>
                        <div className="text-xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
                          {metric.value}
                        </div>
                        <div className="text-[9px] font-bold uppercase tracking-[0.15em] opacity-40" style={{ color: 'var(--text-primary)' }}>
                          {metric.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* ── Tech Stack ── */}
                  <div className="mb-10">
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] opacity-30 block mb-4 ml-0.5" style={{ color: 'var(--text-primary)' }}>
                      Built With
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {hackathon.tags.map((tag, i) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + i * 0.06, duration: 0.4 }}
                          whileHover={{ y: -2, scale: 1.05 }}
                          className="px-4 py-2 rounded-xl text-[12px] font-bold tracking-wide border border-[var(--border)] bg-[var(--bg-secondary)] hover:border-amber-500/20 hover:bg-amber-500/5 transition-all duration-300"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── Action Buttons ── */}
                <div className="flex flex-col gap-3">
                  {/* Primary: Live Demo */}
                  <motion.a
                    href={hackathon.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black uppercase tracking-wider text-xs shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                    <ArrowUpRight size={14} className="opacity-60" />
                  </motion.a>

                  {/* Secondary row */}
                  <div className="grid grid-cols-2 gap-3">
                    <motion.a
                      href={hackathon.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border border-[var(--border)] font-bold text-xs uppercase tracking-wider hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-300"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <Github size={16} />
                      Source Code
                    </motion.a>

                    <motion.a
                      href={hackathon.certificateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border border-[var(--border)] font-bold text-xs uppercase tracking-wider hover:border-amber-500/30 hover:bg-amber-500/5 transition-all duration-300"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <Trophy size={16} />
                      Certificate
                    </motion.a>
                  </div>
                </div>

              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
});

/* ── Glassmorphic Detail Card ── */
function DetailCard({ icon, label, text, accentColor, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ x: 4 }}
      className="relative p-4 md:p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden group/detail transition-all duration-300 hover:border-opacity-50"
      style={{ '--detail-accent': accentColor }}
    >
      {/* Colored left accent bar */}
      <div
        className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full transition-all duration-300 group-hover/detail:top-2 group-hover/detail:bottom-2"
        style={{ background: accentColor }}
      />

      <div className="pl-3">
        <div className="flex items-center gap-2 mb-2">
          <span style={{ color: accentColor }}>{icon}</span>
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: accentColor }}>
            {label}
          </h4>
        </div>
        <p className="text-[13px] leading-relaxed font-medium opacity-70" style={{ color: 'var(--text-primary)' }}>
          {text}
        </p>
      </div>
    </motion.div>
  );
}

Hackathon.displayName = 'Hackathon';

export default Hackathon;
