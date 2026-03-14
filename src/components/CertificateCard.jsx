import { useContext } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Award, Calendar, Medal } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

function CertificateCard({ certificate, theme, delay = 0 }) {
    const { isTransitioning } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8 }}
            style={{ transitionDelay: `${delay}ms` }}
            className={`flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 group border card-theme-animation ${isTransitioning ? 'theme-transition-tilt' : ''} ${isDark ? 'border-gray-800' : 'border-gray-100'}`}
        >
            {/* Left Side: Thumbnail Preview */}
            <div className="w-full md:w-5/12 bg-white p-6 flex items-center justify-center relative min-h-[200px]">
                {/* Thumbnail Certificate Mockup */}
                <div className="w-full h-full border-2 border-gray-100 rounded-lg p-4 flex flex-col justify-between items-center text-center shadow-inner relative bg-white">
                    <div className="absolute top-2 right-2 text-purple-600">
                        <Medal size={28} fill="currentColor" fillOpacity={0.2} />
                    </div>
                    
                    <div className="mb-2">
                        <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mb-1 mx-auto border border-gray-100 italic font-bold text-[8px] text-gray-400">
                            {certificate.org === 'HackerRank' ? 'HR' : 'SL'}
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{certificate.org}</p>
                    </div>

                    <div className="flex-grow flex flex-col justify-center">
                        <h5 className="text-[12px] font-black text-gray-800 leading-tight mb-1">{certificate.title}</h5>
                        <div className="h-[1px] w-8 bg-purple-200 mx-auto mb-1"></div>
                        <p className="text-[10px] text-gray-500 font-medium">{certificate.recipient}</p>
                    </div>

                    <div className="mt-auto pt-2 border-t border-gray-50 w-full">
                        <p className="text-[8px] text-gray-400 font-bold">{certificate.date}</p>
                    </div>
                </div>

                {/* Actual image overlay if available (optional enhancement) */}
                {certificate.image && (
                    <div className="absolute inset-0 p-4 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                         <img src={certificate.image} alt="Certificate" className="w-full h-full object-contain rounded-lg" />
                    </div>
                )}
            </div>

            {/* Right Side: Details */}
            <div className={`w-full md:w-7/12 p-8 flex flex-col justify-between ${isDark ? 'bg-[#1a1f2e]' : 'bg-white'}`}>
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-bold uppercase tracking-widest text-morph ${isTransitioning ? 'text-morph-active' : ''} ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {certificate.org} • {certificate.date}
                        </span>
                        <Award size={16} className="text-purple-500" />
                    </div>

                    <h3 className={`text-xl font-black mb-4 leading-tight group-hover:text-[#00d4ff] transition-colors duration-300 text-morph ${isTransitioning ? 'text-morph-active' : ''} ${isDark ? 'text-[#00d4ff]' : 'text-cyan-600'}`}>
                        {certificate.title}
                    </h3>

                    <p className={`text-sm mb-6 line-clamp-2 text-morph ${isTransitioning ? 'text-morph-active' : ''} ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {certificate.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {certificate.tags.map((tag, i) => (
                            <span
                                key={i}
                                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                    isDark
                                        ? 'bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20'
                                        : 'bg-cyan-50 text-cyan-700 border border-cyan-100'
                                }`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-800/20">
                    <a
                        href={certificate.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all duration-300 group/link ${
                            isDark ? 'text-[#00d4ff] hover:text-white' : 'text-cyan-600 hover:text-cyan-800'
                        }`}
                    >
                        <span>View Full Certificate</span>
                        <ExternalLink size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                    </a>
                </div>
            </div>
        </motion.div>
    );
}

export default CertificateCard;
