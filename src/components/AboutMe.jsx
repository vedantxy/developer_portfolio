import { motion } from 'motion/react';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { ArrowRight, Zap, Target, MapPin, Code2 } from 'lucide-react';

function AboutMe() {
  const { isTransitioning } = useContext(ThemeContext);

  const highlights = [
    { icon: <Code2 size={16} />, label: "Role", value: "Full Stack Developer" },
    { icon: <Zap size={16} />, label: "Focus", value: "React, Node, Performance" },
    { icon: <MapPin size={16} />, label: "Location", value: "India" },
    { icon: <Target size={16} />, label: "Strength", value: "Clean UI + Scalable Logic" },
  ];

  return (
    <section
      id="about"
      className={`py-20 md:py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden transition-colors duration-500 flex items-center ${isTransitioning ? 'theme-transition-tilt' : ''}`}
      style={{ background: 'transparent' }}
    >
      <div className="max-w-[1100px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* LEFT: Content area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col"
        >
          {/* Subtle Heading */}
          <span className="text-[11px] font-black tracking-[0.3em] uppercase opacity-40 mb-4" style={{ color: 'var(--text-primary)' }}>
            About Me
          </span>

          {/* Hero Statement */}
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1] mb-6" style={{ color: 'var(--text-primary)' }}>
            Building fast, scalable, and user-focused web experiences.
          </h2>

          {/* Micro Bio */}
          <p className="text-lg font-medium leading-relaxed mb-10 opacity-70" style={{ color: 'var(--text-primary)' }}>
            I focus on the intersection of performance and design, transforming complex technical requirements into elegant digital solutions with a meticulous eye for detail.
          </p>

          {/* Key Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 p-3 rounded-xl border border-transparent hover:border-[var(--border)] hover:bg-[var(--bg-secondary)] transition-all duration-300 group"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--accent-10)] text-[var(--accent)] group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-40" style={{ color: 'var(--text-primary)' }}>
                    {item.label}
                  </span>
                  <span className="text-sm font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    {item.value}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ x: 5 }}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 text-sm font-black uppercase tracking-widest group transition-colors"
            style={{ color: 'var(--accent)' }}
          >
            View Projects
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>

        {/* RIGHT: Visual Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative aspect-square lg:aspect-[4/5] w-full max-w-[450px] mx-auto group"
        >
          {/* Decorative glass elements */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-700" />
          
          {/* Main Visual Card */}
          <div className="relative z-10 w-full h-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-[#09090b]">
             {/* Abstract Minimal Dashboard UI for Right Side */}
             <div className="absolute inset-0 p-8 flex flex-col gap-6 opacity-40 group-hover:opacity-60 transition-opacity duration-700">
                <div className="w-full h-12 rounded-2xl bg-white/5 border border-white/10" />
                <div className="grid grid-cols-3 gap-4 h-32">
                  <div className="rounded-2xl bg-indigo-500/10 border border-indigo-500/20" />
                  <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20" />
                  <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20" />
                </div>
                <div className="flex-1 rounded-3xl bg-white/5 border border-white/10 p-6 flex flex-col gap-4">
                   <div className="w-2/3 h-4 rounded-full bg-white/10" />
                   <div className="w-full h-32 rounded-2xl bg-white/5 border border-white/5" />
                </div>
             </div>

             {/* Profile Overlay (Subtle) */}
             <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-white/20 shadow-inner group-hover:scale-[1.02] transition-transform duration-700">
                   <img 
                    src="/hero-photo.webp" 
                    alt="Vedant Patel" 
                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                   
                   {/* Name Badge */}
                   <div className="absolute bottom-6 left-6 right-6 p-4 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl">
                      <div className="flex items-center justify-between">
                         <span className="text-white font-bold tracking-tight">Vedant Patel</span>
                         <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-[10px] text-white/60 font-bold uppercase tracking-wider">Available</span>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Border accents */}
          <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-slate-500/20 rounded-tl-2xl pointer-events-none" />
          <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-slate-500/20 rounded-br-2xl pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}

export default AboutMe;