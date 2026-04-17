import { motion } from 'motion/react';
import { Award, Briefcase } from 'lucide-react';

function CertificateCard({ certificate, onClick }) {
  const visibleTags = certificate.tags?.slice(0, 2) || [];
  const extraTagsCount = (certificate.tags?.length || 0) - visibleTags.length;

  return (
    <motion.div
      whileHover={{ y: -10, shadow: '0 20px 40px rgba(0,0,0,0.08)' }}
      onClick={onClick}
      className="group relative bg-white rounded-[2rem] p-8 md:p-10 shadow-lg border border-slate-100 cursor-pointer transition-all duration-500"
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-10">
        <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center border border-slate-50 shadow-sm text-[#84a3c4]">
          <Award size={28} />
        </div>
        <div className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-[11px] font-black text-slate-800 tracking-wide">
          {certificate.date}
        </div>
      </div>

      {/* Main Info */}
      <div className="space-y-4 mb-10">
        <h3 className="text-3xl md:text-4xl font-black text-[#5e7ca7] leading-tight group-hover:text-[#4a6b98] transition-colors">
          {certificate.title}
        </h3>
        
        <div className="flex items-center gap-2.5 text-slate-400 font-bold">
          <Briefcase size={18} />
          <span className="tracking-tight text-lg">{certificate.org}</span>
        </div>
      </div>

      {/* Tags / Skills Row */}
      <div className="flex flex-wrap items-center gap-6 mt-auto">
        {visibleTags.map((tag) => (
          <span 
            key={tag} 
            className="text-sm font-bold text-slate-500 tracking-tight"
          >
            {tag}
          </span>
        ))}
        {extraTagsCount > 0 && (
          <span className="text-sm font-black text-slate-400">
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
