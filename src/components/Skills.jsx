import { motion } from 'motion/react';
import React, { memo } from 'react';
import { 
  FaServer, FaCode, FaPaintBrush, FaMagic, FaLaptopCode
} from 'react-icons/fa';
import { 
  SiReact, SiJavascript, SiTailwindcss, SiFramer, SiHtml5, 
  SiNodedotjs, SiExpress, SiCplusplus, SiGithub, SiVite, SiFigma 
} from 'react-icons/si';

// Defining specific icons for tools to avoid import mismatch, using generic fallbacks if specific doesn't exist
import { DiVisualstudio } from 'react-icons/di';

const SKILLS_DATA = [
  {
    category: "Frontend Development",
    color: "#3B82F6", // Blue
    skills: [
      { name: "React.js", icon: SiReact, level: "Advanced", description: "Building complex, interactive web UIs", color: "#00b2e8" },
      { name: "JavaScript (ES6+)", icon: SiJavascript, level: "Advanced", description: "Core logic and DOM manipulation", color: "#d1b300" },
      { name: "Tailwind CSS", icon: SiTailwindcss, level: "Advanced", description: "Utility-first rapid responsive styling", color: "#319795" },
      { name: "Framer Motion", icon: SiFramer, level: "Proficient", description: "Fluid, physics-based web animations", color: "#E902B5" },
      { name: "HTML5 & CSS3", icon: SiHtml5, level: "Advanced", description: "Semantic markup and core styling", color: "#E34F26" }
    ]
  },
  {
    category: "Backend Development",
    color: "#10B981", // Green
    skills: [
      { name: "Node.js", icon: SiNodedotjs, level: "Proficient", description: "Scalable server-side execution", color: "#2f8c2f" },
      { name: "Express.js", icon: SiExpress, level: "Proficient", description: "Robust backend routing frameworks", color: "#000000" },
      { name: "REST APIs", icon: FaServer, level: "Advanced", description: "Designing secure data endpoints", color: "#006bd6" }
    ]
  },
  {
    category: "Programming Languages",
    color: "#8B5CF6", // Purple
    skills: [
      { name: "C++", icon: SiCplusplus, level: "Advanced", description: "High-performance systems logic", color: "#00599C" },
      { name: "JavaScript", icon: SiJavascript, level: "Advanced", description: "Full-stack application logic", color: "#d1b300" }
    ]
  },
  {
    category: "Tools & Technologies",
    color: "#F59E0B", // Yellow
    skills: [
      { name: "Git & GitHub", icon: SiGithub, level: "Advanced", description: "Version control and CI/CD pipelines", color: "#000000" },
      { name: "VS Code", icon: DiVisualstudio, level: "Advanced", description: "Primary IDE and environment setup", color: "#007ACC" },
      { name: "Vite", icon: SiVite, level: "Proficient", description: "Next-generation frontend tooling", color: "#646CFF" },
      { name: "Figma", icon: SiFigma, level: "Proficient", description: "UI/UX design and wireframing", color: "#F24E1E" }
    ]
  },
  {
    category: "Design & UI/UX",
    color: "#EC4899", // Pink
    skills: [
      { name: "Responsive Design", icon: FaLaptopCode, level: "Advanced", description: "Mobile-first layout architectures", color: "#0891b2" },
      { name: "UI Prototyping", icon: FaPaintBrush, level: "Proficient", description: "Interactive high-fidelity prototypes", color: "#9333ea" },
      { name: "Animation", icon: FaMagic, level: "Proficient", description: "Micro-interactions and UX flow", color: "#e11d48" }
    ]
  }
];

const SkillCard = memo(({ skill, delay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: delay * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="relative p-5 rounded-2xl border backdrop-blur-xl overflow-hidden group cursor-default transition-all duration-300 flex flex-col min-h-[130px] will-change-transform"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', boxShadow: 'var(--glow)' }}
    >
      {/* Background Hover Glow Mapping For Light Theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div 
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-[40px] opacity-0 group-hover:opacity-[0.15] transition-opacity duration-500 pointer-events-none" 
        style={{ backgroundColor: skill.color }} 
      />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-3">
          <div className="flex items-start justify-between mb-4">
            <div 
              className="p-2.5 rounded-xl border shadow-sm transition-colors duration-300" 
              style={{ color: skill.color, background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
            >
               <skill.icon size={22} />
            </div>
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border transition-colors" style={{ color: 'var(--text-muted)', background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
              {skill.level}
            </span>
          </div>
          <h4 className="font-bold text-lg tracking-wide" style={{ color: 'var(--text-primary)' }}>{skill.name}</h4>
        </div>
        
        <div className="mt-auto pt-1.5">
          <p className="text-[13px] font-medium leading-snug transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}>
            {skill.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
});

const Skills = memo(() => {
  return (
    <section id="skills" className="py-20 md:py-24 px-6 md:px-12 lg:px-24 flex items-center relative overflow-hidden transition-colors duration-500" style={{ background: 'transparent' }}>
      
      {/* Background Ecosystem */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: "radial-gradient(var(--border) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        
        {/* Deep background ambient glows */}
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1400px] mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center lg:text-left flex flex-col items-center lg:items-start"
        >
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border" style={{ borderColor: 'var(--accent-30)', background: 'var(--accent-10)', backdropFilter: 'blur(10px)' }}>
             <span className="text-[10px] font-black tracking-[0.3em] uppercase" style={{ color: 'var(--accent)' }}>Technical Arsenal</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6" style={{ color: 'var(--text-primary)' }}>
            Skills & <br className="hidden md:block" />
            <span className="italic font-serif opacity-30">Expertise.</span>
          </h2>
          <p className="text-lg font-medium max-w-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Engineering high-performance web experiences with modern frameworks, scalable architectures, and pixel-perfect design.
          </p>
        </motion.div>

        {/* Structured Grid Layout per Category */}
        <div className="flex flex-col gap-16">
          {SKILLS_DATA.map((categoryGroup) => (
            <motion.div 
              key={categoryGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex flex-col relative"
            >
              {/* Category Header with Colored Accent */}
              <div className="flex items-center gap-5 mb-8">
                <div className="w-1.5 h-6 rounded-full shadow-sm" style={{ backgroundColor: categoryGroup.color }} />
                <h3 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
                  {categoryGroup.category}
                </h3>
                <div className="flex-1 h-px ml-4" style={{ background: 'linear-gradient(90deg, var(--border), transparent)' }} />
              </div>

              {/* Responsive Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryGroup.skills.map((skill, sIndex) => (
                  <SkillCard key={skill.name} skill={skill} delay={sIndex} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .font-serif {
          font-family: 'Playfair Display', serif !important;
        }
      `}} />
    </section>
  );
});

export default Skills;