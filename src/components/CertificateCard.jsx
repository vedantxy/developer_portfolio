import { motion } from 'motion/react';
import { Award, Briefcase } from 'lucide-react';

function CertificateCard({ certificate, onClick }) {
  const visibleTags = certificate.tags?.slice(0, 2) || [];
  const extraTagsCount = (certificate.tags?.length || 0) - visibleTags.length;

  return (
    <motion.div
      whileHover={{ y: -10 }}
      onClick={onClick}
      className="group relative rounded-[2rem] p-8 md:p-10 border cursor-pointer transition-all duration-500"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', boxShadow: 'var(--glow)' }}
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-10">
        <div className="w-14 h-14 rounded-full flex items-center justify-center border shadow-sm" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)', color: 'var(--accent)' }}>
          <Award size={28} />
        </div>
        <div className="px-4 py-1.5 rounded-full border text-[11px] font-black tracking-wide" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
          {certificate.date}
        </div>
      </div>

      {/* Main Info */}
      <div className="space-y-4 mb-10">
        <h3 className="text-3xl md:text-4xl font-black leading-tight transition-colors" style={{ color: 'var(--text-primary)' }}>
          {certificate.title}
        </h3>
        
        <div className="flex items-center gap-2.5 font-bold" style={{ color: 'var(--text-muted)' }}>
          <Briefcase size={18} />
          <span className="tracking-tight text-lg">{certificate.org}</span>
        </div>
      </div>

      {/* Tags / Skills Row */}
      <div className="flex flex-wrap items-center gap-6 mt-auto">
        {visibleTags.map((tag) => (
          <span 
            key={tag} 
            className="text-sm font-bold tracking-tight"
            style={{ color: 'var(--text-secondary)' }}
          >
            {tag}
          </span>
        ))}
        {extraTagsCount > 0 && (
          <span className="text-sm font-black" style={{ color: 'var(--text-muted)' }}>
            +{extraTagsCount}
          </span>
        )}
      </div>

      {/* Subtle indicator dot - mimicking the image */}
      <div className="absolute bottom-12 right-12 w-2 h-2 rounded-full bg-orange-200 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}

export default CertificateCard;
