import { motion } from 'motion/react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { FaYoutube } from 'react-icons/fa';
import { SiPostman } from 'react-icons/si';

function ProjectCard({ project, isFeatured = false }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full p-6 md:p-7 transition-colors duration-500"
    >
      {/* Top Meta Row (Newspaper Style) */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-[9px] font-bold tracking-[0.3em] uppercase" style={{ color: 'var(--text-muted)' }}>
          {project.category} · {project.tags?.[0] || 'ARCHIVE'}
        </span>
        <span className="text-[11px] font-black font-mono tracking-widest" style={{ color: 'var(--accent)' }}>
          {project.year || '2024'}
        </span>
      </div>

      {/* Narrative Hub */}
      <div className="flex-grow">
        {/* Editorial Heading */}
        <h3 className={`font-serif font-black leading-[0.95] tracking-tighter mb-5 relative inline-block group/title cursor-default`} style={{ color: 'var(--text-primary)' }}>
          <span className={`${isFeatured ? 'text-3xl md:text-5xl lg:text-6xl' : 'text-2xl md:text-3xl'}`}>
            {project.title}
          </span>
          <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#111111] transition-all duration-500 group-hover/title:w-full" />
        </h3>

        {/* Newspaper Column Description */}
        <p className="text-[14px] leading-relaxed max-w-[95%] mb-8 font-medium" style={{ color: 'var(--text-secondary)' }}>
          {project.description.split(/(Objective:|Challenge:|Solution:)/g).map((part, i) => 
            ['Objective:', 'Challenge:', 'Solution:'].includes(part) ? <span key={i} className="font-black" style={{ color: 'var(--text-primary)' }}>{part}</span> : part
          )}
        </p>

        {/* Rectangular Stack Indices */}
        <div className="flex flex-wrap gap-2 mb-8">
           {project.tags?.map((tag) => (
             <span key={tag} className="px-2 py-1 text-[9px] font-bold uppercase tracking-widest backdrop-blur-sm" style={{ color: 'var(--text-secondary)', border: '1px solid var(--border)', background: 'var(--glass-bg)' }}>
               {tag}
             </span>
           ))}
        </div>
      </div>

      {/* Bottom Section: Primary Action Side-by-Side with Metadata Controls */}
      <div className="pt-8 flex items-center justify-between" style={{ borderTop: '1px solid var(--border)' }}>
        
        {/* Main CTA: Text-Only (Not a link) */}
        <div 
          className="flex items-center gap-3 text-[11px] font-bold tracking-[0.25em]"
          style={{ color: 'var(--text-primary)', cursor: 'default' }}
        >
          VIEW CASE STUDY
          <ArrowRight size={14} />
        </div>

        {/* Ghost Icons Row */}
        <div className="flex items-center gap-5" style={{ color: 'var(--text-muted)' }}>
           {[
              { href: project.liveLink,    Icon: ExternalLink, label: 'Live' },
              { href: project.codeLink,    Icon: Github,       label: 'Code' },
              { href: project.youtubeLink, Icon: FaYoutube,    label: 'Demo' },
              { href: project.postmanLink, Icon: SiPostman,    label: 'API' },
            ].filter(l => l.href).map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors opacity-80 hover:opacity-100 hover:text-[var(--text-primary)]"
                style={{ color: 'var(--text-secondary)' }}
                aria-label={label}
                onClick={(e) => e.stopPropagation()}
              >
                <Icon size={20} strokeWidth={2.5} />
              </a>
            ))}
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;