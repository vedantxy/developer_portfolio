import { useContext } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Play, Github } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

function ProjectCard({ project, theme, delay = 0 }) {
    const { isTransitioning } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            style={{ transitionDelay: `${delay}ms` }}
            className={`flex flex-col rounded-2xl overflow-hidden border card-theme-animation ${
                isTransitioning ? 'theme-transition-tilt' : ''
            } ${
                isDark 
                ? 'bg-[#1a1e29] border-gray-700/50 hover:border-gray-500' 
                : 'bg-white border-gray-200 hover:shadow-xl'
            } transition-all duration-300 group shadow-lg`}
        >
            {/* Image Section */}
            <div className="relative h-56 overflow-hidden">
                <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className={`text-2xl font-bold mb-3 text-morph ${isTransitioning ? 'text-morph-active' : ''} ${isDark ? 'text-[#00e5ff]' : 'text-[#00cce6]'}`}>
                    {project.title}
                </h3>
                
                <p className={`text-sm mb-6 flex-grow leading-relaxed text-morph ${isTransitioning ? 'text-morph-active' : ''} ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {project.description}
                </p>

                {/* Bottom Links */}
                <div className="flex items-center gap-6 mt-auto">
                    {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" 
                           className={`group/link flex flex-col items-center gap-1.5 text-xs font-semibold ${isDark ? 'text-[#00e5ff] hover:text-cyan-300' : 'text-[#00cce6] hover:text-cyan-500'} transition-colors`}>
                            <ExternalLink size={20} className="group-hover/link:-translate-y-1 transition-transform" />
                            <span>Live Demo</span>
                        </a>
                    )}
                    {project.codeLink && (
                        <a href={project.codeLink} target="_blank" rel="noopener noreferrer"
                           className={`group/link flex flex-col items-center gap-1.5 text-xs font-semibold ${isDark ? 'text-[#00e5ff] hover:text-cyan-300' : 'text-[#00cce6] hover:text-cyan-500'} transition-colors`}>
                            <Github size={20} className="group-hover/link:-translate-y-1 transition-transform" />
                            <span>Code</span>
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default ProjectCard;