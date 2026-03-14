import { motion } from 'motion/react';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { 
  FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaGitAlt, FaFigma, FaLaptopCode
} from 'react-icons/fa';
import { 
  SiJavascript, SiTailwindcss, SiMongodb, SiVite, SiExpress
} from 'react-icons/si';
import './Skills.css';

const SKILLS_DATA = {
  "Frontend": [
    { name: 'HTML5', icon: FaHtml5, color: '#E34F26' },
    { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6' },
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { name: 'React', icon: FaReact, color: '#61DAFB' },
    { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'Vite', icon: SiVite, color: '#646CFF' },
  ],
  "Backend": [
    { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
    { name: 'Express', icon: SiExpress, color: '#ffffff' },
  ],
  "Database & Design": [
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'Git', icon: FaGitAlt, color: '#F05032' },
    { name: 'GitHub', icon: FaLaptopCode, color: '#ffffff' },
    { name: 'Figma', icon: FaFigma, color: '#F24E1E' },
  ]
};

function SkillItem({ skill }) {
  const { theme, isTransitioning } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const Icon = skill.icon;

  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={`skill-item group card-theme-animation ${isTransitioning ? 'theme-transition-tilt' : ''}`}
    >
      <div 
        className="skill-icon-wrapper transition-all duration-300 relative"
        style={{ 
          color: skill.color,
          backgroundColor: `${skill.color}10`, // 10% opacity hex
        }}
      >
        <Icon size={32} className="relative z-10" />
        <div 
          className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300"
          style={{ backgroundColor: skill.color }}
        />
      </div>
      <span className={`skill-name tracking-wide transition-colors duration-300 text-morph ${isTransitioning ? 'text-morph-active' : ''} ${isDark ? 'text-gray-400 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'}`}>
        {skill.name}
      </span>
    </motion.div>
  );
}

function Skills() {
  const { theme, isTransitioning } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <section id="skills" className="skills-section py-24 px-6 relative overflow-hidden">
      {/* Soft Background Glow */}
      <div className="skills-bg-glow" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="skills-decorated-header">
            <h2 className={`text-5xl md:text-7xl font-black text-morph ${isTransitioning ? 'text-morph-active' : ''} ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Tools <span className="text-[#b8f2e6]">&</span> Skills
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {Object.entries(SKILLS_DATA).map(([category, skills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: categoryIndex * 0.1 }}
              style={{ transitionDelay: `${categoryIndex * 100}ms` }}
              className={`skill-category-card card-theme-animation ${isTransitioning ? 'theme-transition-tilt' : ''}`}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className={`h-8 w-1.5 rounded-full bg-gradient-to-b from-[#00d4ff] to-purple-600`} />
                <h3 className={`text-xl font-black uppercase tracking-[0.2em] text-morph ${isTransitioning ? 'text-morph-active' : ''} ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {category}
                </h3>
              </div>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 md:gap-6">
                {skills.map((skill, idx) => (
                  <SkillItem key={idx} skill={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;