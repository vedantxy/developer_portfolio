import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProjectCard from './ProjectCard';

const CATEGORIES = [
  { label: 'Clones',     emoji: '⊕' },
  { label: 'Full Stack', emoji: '⚡' },
  { label: 'Frontend',   emoji: '◻' },
  { label: 'Figma',      emoji: '✦' },
  { label: 'Games',      emoji: '◉' },
];

const PROJECTS_DATA = [
  // ── Clones
  {
    id: 1, title: 'Nansen AI', category: 'Clones', year: '2025',
    description: 'Objective: Recreate the sophisticated Nansen AI interface. Challenge: Managing complex data visualizations and deep-nested layouts. Solution: Processed with refined CSS architecture and semantic HTML for high-performance rendering.',
    liveLink: 'https://css-clone-website.netlify.app/hw-1/',
    codeLink: 'https://github.com/vedantxy/css-clone-by-vedant-patel/tree/main/hw-1',
    youtubeLink: 'https://youtu.be/iHOUewlpLHg',
    tags: ['UI CLONE', 'HTML5', 'CSS3']
  },
  {
    id: 2, title: 'Myntra', category: 'Clones', year: '2025',
    description: 'Objective: Build a high-traffic e-commerce storefront. Challenge: Ensuring seamless navigation and responsive product grids. Solution: Developed a custom utility system for fluid layouts and interactive hover states.',
    liveLink: 'https://css-clone-website.netlify.app/hw-2/',
    codeLink: 'https://github.com/vedantxy/css-clone-by-vedant-patel/tree/main/hw-2',
    youtubeLink: 'https://youtu.be/7cY-X165tiE',
    tags: ['E-COMMERCE', 'RESPONSIVE']
  },
  {
    id: 3, title: 'RoadPilot', category: 'Clones', year: '2025',
    description: 'Objective: Logistics platform frontend. Challenge: Synchronizing multi-section scrolling with professional business aesthetics. Solution: Leveraged advanced CSS positioning and structured visual hierarchy.',
    liveLink: 'https://css-clone-website.netlify.app/hw-3/',
    codeLink: 'https://github.com/vedantxy/css-clone-by-vedant-patel/tree/main/hw-3',
    youtubeLink: 'https://youtu.be/x0PbaEGeDNg',
    tags: ['LOGISTICS', 'B2B']
  },
  {
    id: 4, title: 'Cronos', category: 'Clones', year: '2025',
    description: 'Objective: Modern Web3 interface. Challenge: Dynamic animations and high-contrast dark theme balance. Solution: Integrated subtle transitions and optimized asset loading for a premium user experience.',
    liveLink: 'https://css-clone-website.netlify.app/hw-4/',
    codeLink: 'https://github.com/vedantxy/css-clone-by-vedant-patel/tree/main/hw-4',
    youtubeLink: 'https://youtu.be/MlwUuwq-QD0',
    tags: ['WEB3', 'FRONTEND']
  },
  {
    id: 5, title: 'Bombay Closet Cleanse', category: 'Clones', year: '2025',
    description: 'Objective: Fashion e-commerce UI. Challenge: Mobile-first product discovery and filter layouts. Solution: Implemented an intuitive UI pattern focused on conversion and clean minimalism.',
    liveLink: 'https://css-clone-website.netlify.app/hw-5/',
    codeLink: 'https://github.com/vedantxy/css-clone-by-vedant-patel/tree/main/hw-5',
    youtubeLink: 'https://youtu.be/0w_3k7zc2Kg',
    tags: ['FASHION', 'ECOMMERCE']
  },
  {
    id: 6, title: 'XRP Ledger', category: 'Clones', year: '2025',
    description: 'Objective: Crypto ecosystem landing page. Challenge: Communicating technical complexity through clean design. Solution: Utilized a structured information architecture and precise typography.',
    liveLink: 'https://css-clone-website.netlify.app/hw-6/',
    codeLink: 'https://github.com/vedantxy/css-clone-by-vedant-patel/tree/main/hw-6',
    youtubeLink: 'https://youtu.be/XaR9oB-c-FE',
    tags: ['CRYPTO', 'BLOCKCHAIN']
  },
  // ── Full Stack
  {
    id: 7, title: 'CodeForge AI', category: 'Full Stack', year: '2025',
    description: 'Objective: AI career suite. Challenge: Integrating complex AI feedback into a user-friendly dashboard. Solution: Built a MERN-based interactive interface that simplifies resume analysis and job matching.',
    liveLink: 'https://art-park-code-forge-hackathon-nine.vercel.app/',
    codeLink: 'https://github.com/vedantxy/ArtPark_CodeForge_Hackathon',
    postmanLink: null,
    tags: ['MERN', 'AI CORE']
  },
  {
    id: 8, title: 'CleanPulse', category: 'Full Stack', year: '2025',
    description: 'Objective: Smart city waste management. Challenge: Visualizing real-time collection routes and data. Solution: Developed a full-stack REST API system with a clean, actionable admin dashboard.',
    liveLink: 'https://clean-pulse-taupe.vercel.app/',
    codeLink: 'https://github.com/vedantxy/cleanPulse',
    postmanLink: null,
    tags: ['SMART CITY', 'REST API']
  },
  // ── Frontend
  {
    id: 12, title: 'FilmVault', category: 'Frontend', year: '2025',
    description: 'Objective: Develop a sleek movie exploration dashboard. Challenge: Handling real-time API queries and responsive media carousels. Solution: Integrated TMDB API with React dynamic routing and state-driven search filtering for an immersive cinematic browsing experience.',
    liveLink: 'https://moviereact-test.netlify.app/',
    codeLink: 'https://github.com/vedantxy/react-test',
    tags: ['REACT', 'TMDB API', 'DESIGN']
  },
  // ── Figma
  {
    id: 9, title: 'Oberoi Mall', category: 'Figma', year: '2025',
    description: 'Objective: Retail digital experience design. Challenge: Enhancing physical space navigation through UI. Solution: Designed a comprehensive mobile-centric design system focused on accessibility and retail flow.',
    liveLink: 'https://www.figma.com/design/KxdacndljNmlOhHl1HTTVM/Untitled?node-id=330-4&t=EGvzuftVaFx2AJkE-1',
    tags: ['RETAIL', 'ACCESSIBILITY']
  },
  {
    id: 10, title: 'Red Bus', category: 'Figma', year: '2025',
    description: 'Objective: Travel booking optimization. Challenge: Reducing friction in the seat selection and checkout process. Solution: Crafted a streamlined, user-centered booking flow with real-time feedback.',
    liveLink: 'https://www.figma.com/design/KxdacndljNmlOhHl1HTTVM/Untitled?node-id=63-2&t=EGvzuftVaFx2AJkE-1',
    tags: ['TRAVEL', 'BOOKING']
  },
  {
    id: 11, title: 'Coding Gita', category: 'Figma', year: '2025',
    description: 'Objective: Ed-tech platform dashboard. Challenge: Organizing vast academic modular content for easy access. Solution: Engineered a high-density industrial dashboard layout for both students and mentors.',
    liveLink: 'https://www.figma.com/design/KxdacndljNmlOhHl1HTTVM/Untitled?node-id=79-2&t=EGvzuftVaFx2AJkE-1',
    tags: ['ED-TECH', 'DASHBOARD']
  },
  // ── Games
  {
    id: 13, title: 'Click Counter', category: 'Games', year: '2025',
    description: 'Objective: Arcade reflex game. Challenge: Millisecond-accurate state updates and input handling. Solution: Developed a lean event-driven system to ensure no lag during intense rapid clicking.',
    liveLink: 'https://click-conter-game.netlify.app/',
    codeLink: 'https://github.com/vedantxy/game-sub/tree/main/click-counter',
    tags: ['ARCADE', 'JAVASCRIPT']
  },
  {
    id: 14, title: 'Color Guessing', category: 'Games', year: '2025',
    description: 'Objective: Educational color puzzle. Challenge: Translating RGB values to visual accuracy. Solution: Created a dynamic color generation engine providing a fun, interactive way to learn color theory.',
    liveLink: 'https://colour-gusseing-game.netlify.app/',
    codeLink: 'https://github.com/vedantxy/game-sub/tree/main/Color%20Guessing%20Game',
    tags: ['PUZZLE', 'COLOR THEORY']
  },
  {
    id: 15, title: 'Todo List Game', category: 'Games', year: '2025',
    description: 'Objective: Gamified productivity tool. Challenge: Maintaining engagement in routine tasks. Solution: Integrated an RPG-style progress system with sleek checkmark animations and level-up mechanics.',
    liveLink: 'https://todo-listgame.netlify.app/',
    codeLink: 'https://github.com/vedantxy/game-sub/tree/main/todo-list',
    tags: ['PRODUCTIVITY', 'GAMIFIED']
  },
  {
    id: 16, title: 'Typing Speed', category: 'Games', year: '2025',
    description: 'Objective: Performance typing test. Challenge: Real-time calculation of WPM and accuracy metrics. Solution: Optimized character-tracking algorithms to provide instantaneous data visualization.',
    liveLink: 'https://typing-speed-project-game.netlify.app/',
    codeLink: 'https://github.com/vedantxy/game-sub/tree/main/typing-speed-test',
    tags: ['TYPING', 'DATA VIS']
  },
  {
    id: 17, title: 'Whack-a-Mole', category: 'Games', year: '2025',
    description: 'Objective: Classic arcade revival. Challenge: Random state management with increasing difficulty. Solution: Implemented a robust timer-based spawning logic with smooth CSS transformations.',
    liveLink: 'https://woak-a-mole.netlify.app/',
    codeLink: 'https://github.com/vedantxy/game-sub/tree/main/whack-a-mole',
    tags: ['CLASSIC', 'ARCADE']
  },

];

const Projects = memo(() => {
  const [activeCategory, setActiveCategory] = useState('Clones');

  const filtered = PROJECTS_DATA.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 md:py-24 px-6 md:px-12 lg:px-24 transition-colors duration-500 overflow-hidden" style={{ background: 'transparent' }}>
      
      <div className="max-w-[1400px] mx-auto">
        
        {/* Newspaper Editorial Header */}
        <div className="mb-10 pb-8 flex flex-col md:flex-row justify-between items-end gap-8" style={{ borderBottom: '2px solid var(--text-primary)' }}>
           <div className="flex flex-col">
             <h2 className="text-5xl md:text-7xl font-serif tracking-tighter leading-none italic font-black" style={{ color: 'var(--text-primary)' }}>
               Projects
             </h2>
           </div>

           {/* Editorial Metadata / Filters */}
           <div className="flex flex-col items-start md:items-end gap-6">
              <div className="flex flex-wrap gap-8 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
                {CATEGORIES.map((cat) => {
                  const active = activeCategory === cat.label;
                  return (
                     <button
                      key={cat.label}
                      onClick={() => setActiveCategory(cat.label)}
                      className={`text-[12px] font-bold uppercase tracking-widest relative py-2 transition-colors duration-300`}
                      style={{ color: active ? 'var(--text-primary)' : 'var(--text-muted)' }}
                    >
                      {cat.label}
                      {active && (
                        <motion.div layoutId="editorial-tab" className="absolute bottom-0 left-0 w-full h-[3px]" style={{ background: 'var(--text-primary)' }} />
                      )}
                    </button>
                  );
                })}
              </div>
           </div>
        </div>

        {/* The Grid: Newspaper Style with Visible Borders */}
        <div className="flex flex-col">
          <div className="grid grid-cols-6" style={{ borderLeft: '1px solid var(--border)', borderTop: '1px solid var(--border)' }}>
            <AnimatePresence mode="popLayout">
              {filtered.map((project, idx) => {
                // Feature Logic: 2 Large (50%), then 3 Regular (33%)
                const isFeatured = idx < 2;
                const gridClass = isFeatured 
                  ? "col-span-6 md:col-span-3" // 50% Desktop
                  : "col-span-6 md:col-span-3 lg:col-span-2"; // 33% Desktop

                return (
                  <motion.div
                    layout
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className={`${gridClass} group/item transition-colors duration-500`}
                    style={{ borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-primary)' }}
                  >
                    <ProjectCard project={project} isFeatured={isFeatured} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
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

Projects.displayName = 'Projects';

export default Projects;