import { useContext } from 'react';
import { motion } from 'motion/react';
import { ThemeContext } from '../context/ThemeContext';
import { ExternalLink, Figma } from 'lucide-react';

const FIGMA_DESIGNS = [
  {
    id: 1,
    title: 'Oberoi Mall',
    description:
      'A complete UI/UX redesign for Oberoi Mall — enhanced navigation flows, product discovery, and a seamless digital shopping experience with modern design principles.',
    image: 'https://res.cloudinary.com/dv7bazp5k/image/upload/q_auto/f_auto/v1775491841/mall_tpukvr.webp',
    figmaLink: 'https://www.figma.com/design/KxdacndljNmlOhHl1HTTVM/Untitled?node-id=330-4&t=EGvzuftVaFx2AJkE-1',
    tags: ['UI/UX', 'E-Commerce', 'Navigation'],
  },
  {
    id: 2,
    title: 'Red Bus',
    description:
      'Bus booking UI/UX design with optimised search, seat selection grids, filter panels, and a fast intuitive checkout flow to maximise conversion and user satisfaction.',
    image: 'https://res.cloudinary.com/dv7bazp5k/image/upload/q_auto/f_auto/v1775492336/red_bus_vhsyr4.webp',
    figmaLink: 'https://www.figma.com/design/KxdacndljNmlOhHl1HTTVM/Untitled?node-id=63-2&t=EGvzuftVaFx2AJkE-1',
    tags: ['UI/UX', 'Travel & Booking', 'Mobile-first'],
  },
  {
    id: 3,
    title: 'Coding Gita',
    description:
      'Modern ed-tech platform UI offering industry-focused full-stack development dashboards, course progress tracking, and a professional landing page bridging academics and real-world skills.',
    image: 'https://res.cloudinary.com/dv7bazp5k/image/upload/q_auto/f_auto/v1775493029/codinggita_lzg7gv.png',
    figmaLink: 'https://www.figma.com/design/KxdacndljNmlOhHl1HTTVM/Untitled?node-id=79-2&t=EGvzuftVaFx2AJkE-1',
    tags: ['UI/UX', 'EdTech', 'Dashboard'],
  },
];

function FigmaDesigns() {
  const { theme, isTransitioning } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <section id="figma" className="py-24 px-6 relative overflow-hidden bg-transparent">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute top-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-10 ${isDark ? 'bg-pink-400' : 'bg-pink-300'}`}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute bottom-20 left-10 w-80 h-80 rounded-full blur-3xl opacity-10 ${isDark ? 'bg-violet-500' : 'bg-violet-300'}`}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <Figma size={36} className={isDark ? 'text-[#b8f2e6]' : 'text-[#5e6472]'} />
            <h2 className={`text-5xl md:text-6xl font-bold text-morph ${isTransitioning ? 'text-morph-active' : ''} ${isDark ? 'text-[#b8f2e6]' : 'text-[#5e6472]'}`}>
              Figma Designs
            </h2>
          </div>
          <p className={`text-lg mb-6 ${isDark ? 'text-[#aed9e0]/70' : 'text-[#5e6472]/70'}`}>
            UI/UX designs crafted in Figma — combining aesthetics with usability.
          </p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '6rem' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`h-1.5 rounded-full ${isDark ? 'bg-[#b8f2e6]' : 'bg-[#aed9e0]'}`}
          />
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FIGMA_DESIGNS.map((design, idx) => (
            <motion.div
              key={design.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group rounded-2xl overflow-hidden border transition-all duration-300 shadow-lg card-theme-animation ${isTransitioning ? 'theme-transition-tilt' : ''} ${
                isDark
                  ? 'bg-[#1a1e29] border-gray-700/50 hover:border-pink-500/50'
                  : 'bg-white border-gray-200 hover:border-pink-300 hover:shadow-xl'
              }`}
            >
              {/* Preview Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={design.image}
                  alt={design.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                {/* Figma overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <a
                    href={design.figmaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 bg-white text-black rounded-xl font-semibold text-sm hover:bg-pink-100 transition-colors"
                  >
                    <Figma size={18} />
                    Open in Figma
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-[#b8f2e6]' : 'text-[#5e6472]'}`}>
                  {design.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {design.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {design.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-pink-500/10 text-pink-400 border border-pink-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <a
                  href={design.figmaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
                    isDark ? 'text-pink-400 hover:text-pink-300' : 'text-pink-500 hover:text-pink-600'
                  }`}
                >
                  <ExternalLink size={16} />
                  View Design
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FigmaDesigns;
