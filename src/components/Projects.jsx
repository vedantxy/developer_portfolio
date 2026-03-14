import { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProjectCard from './ProjectCard';
import { ThemeContext } from '../context/ThemeContext';

const CATEGORIES = ['All', 'HTML/CSS'];

const PROJECTS_DATA = [
    {
        id: 1,
        title: 'Nansen AI',
        description: 'First HTML & CSS clone project assignment focusing on structural layout and fundamental styling.',
        category: 'HTML/CSS',
        image: 'https://cdn.prod.website-files.com/60118ca1c2eab61d24bcf151/6254dfc86e4d48156c78c48d_JRZ7q9k4LKnSzadnpwB509TSjBmRzEB9h9VqxR_Mwk50aV2dQH5-_ih9D01YosaAHgYSrhUctRLsXDK3W4GveNmhgvhoc7oqgHAqqlXvpwMbNSMwDo0_l-Ko8aZ-X35uL-AFedih.png', 
        liveLink: 'https://css-clone-website.netlify.app/hw-1/',
        codeLink: 'https://github.com/vedantxy/css-clone-by-vedant-patel/tree/main/hw-1',
    },
    {
        id: 2,
        title: 'Myntra',
        description: 'Second HTML & CSS clone project assignment exploring more complex structural layouts.',
        category: 'HTML/CSS',
        image: 'https://img-cdn.publive.online/fit-in/640x360/filters:format(webp)/entrackr/media/post_attachments/wp-content/uploads/2017/12/myntra-image-3.jpg', 
        liveLink: 'https://css-clone-website.netlify.app/hw-2/',
        codeLink: 'https://github.com/vedantxy/css-clone-by-vedant-patel/tree/main/hw-2',
    },
    {
        id: 3,
        title: 'RoadPilot',
        description: 'Third HTML & CSS clone project assignment implementing responsive design principles.',
        category: 'HTML/CSS',
        image: 'https://roadpilot.co.in/assets/images/frontend/blog/thumb_660e1184789ab1712198020.png', 
        liveLink: 'https://css-clone-website.netlify.app/hw-3/',
        codeLink: 'https://github.com/vedantxy/css-clone-by-vedant-patel/tree/main/hw-3',
    },
    {
        id: 4,
        title: 'Cronos',
        description: 'Fourth HTML & CSS clone project assignment featuring advanced CSS techniques.',
        category: 'HTML/CSS',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQtqa34IUaE9dUXJPW9Ej1eMSQqBm2vGhTeA&s', 
        liveLink: 'https://css-clone-website.netlify.app/hw-4/',
        codeLink: 'https://github.com/vedantxy/css-clone-by-vedant-patel/tree/main/hw-4',
    },
    {
        id: 5,
        title: 'Bombay Closet Cleanse',
        description: 'Fifth HTML & CSS clone project assignment demonstrating comprehensive styling skills.',
        category: 'HTML/CSS',
        image: 'https://bombayclosetcleanse.in/cdn/shop/files/Banner_03.png?v=1711542578&width=3840', 
        liveLink: 'https://css-clone-website.netlify.app/hw-5/',
        codeLink: 'https://github.com/vedantxy/css-clone-by-vedant-patel/tree/main/hw-5',
    },
    {
        id: 6,
        title: 'XRP Ledger',
        description: 'Sixth HTML & CSS clone project assignment. (Note: using hw-5 link provided).',
        category: 'HTML/CSS',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxL6eEDei0PxcmF5XUr8w8HpsY2y6euYGPFw&s', 
        liveLink: 'https://css-clone-website.netlify.app/hw-6/',
        codeLink: 'https://github.com/vedantxy/css-clone-by-vedant-patel/tree/main/hw-6',
    }
];

function Projects() {
    const { theme, isTransitioning } = useContext(ThemeContext);
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredProjects = PROJECTS_DATA.filter(project => 
        activeCategory === 'All' ? true : project.category === activeCategory
    );

    return (
        <section id="projects" className="py-24 px-6 relative overflow-hidden bg-transparent">
            {/* Background blob elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div 
                    animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, 50, 0] }} 
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} 
                    className={`absolute top-40 right-20 w-96 h-96 rounded-full blur-3xl opacity-10 ${theme === "dark" ? "bg-cyan-400" : "bg-cyan-600"}`} 
                />
                <motion.div 
                    animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, 30, 0] }} 
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} 
                    className={`absolute bottom-40 left-20 w-80 h-80 rounded-full blur-3xl opacity-10 ${theme === "dark" ? "bg-purple-500" : "bg-blue-400"}`} 
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.6 }} 
                    className="text-center mb-16"
                >
                    <h2 className={`text-5xl md:text-6xl font-bold mb-6 text-morph ${isTransitioning ? 'text-morph-active' : ''} ${theme === "dark" ? "text-[#b8f2e6]" : "text-[#5e6472]"}`}>
                        Projects
                    </h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "6rem" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className={`h-1.5 mx-auto rounded-full mb-12 ${
                            theme === "dark" ? "bg-[#b8f2e6]" : "bg-[#aed9e0]"
                        }`}
                    />
                    {/* Category Filters */}
                    <div className="flex flex-wrap justify-center gap-3 lg:gap-4 text-morph ${isTransitioning ? 'opacity-0' : ''} transition-opacity duration-300">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full border transition-all duration-300 font-medium ${
                                    activeCategory === cat 
                                    ? "bg-[#00e5ff] border-[#00e5ff] text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]" 
                                    : theme === 'dark' 
                                        ? "border-gray-500 text-gray-300 hover:border-[#00e5ff] hover:text-[#00e5ff]" 
                                        : "border-gray-400 text-gray-600 hover:border-[#00cce6] hover:text-[#00cce6]"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Projects Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredProjects.map((project, idx) => (
                            <ProjectCard 
                                key={project.id} 
                                project={project} 
                                theme={theme} 
                                delay={idx * 50}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}

export default Projects;