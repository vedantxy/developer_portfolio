import { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProjectCard from './ProjectCard';
import { ThemeContext } from '../context/ThemeContext';


const CATEGORIES = ['All', 'HTML/CSS', 'MERN Stack', 'Figma'];

const PROJECTS_DATA = [
    {
        id: 1,
        title: 'Nansen AI',
        description: 'Built a responsive clone of the Nansen AI website using HTML & CSS.Focused on clean UI, layout accuracy, and modern design.',
        category: 'HTML/CSS',
        image: 'https://cdn.prod.website-files.com/60118ca1c2eab61d24bcf151/6254dfc86e4d48156c78c48d_JRZ7q9k4LKnSzadnpwB509TSjBmRzEB9h9VqxR_Mwk50aV2dQH5-_ih9D01YosaAHgYSrhUctRLsXDK3W4GveNmhgvhoc7oqgHAqqlXvpwMbNSMwDo0_l-Ko8aZ-X35uL-AFedih.png', 
        liveLink: 'https://css-clone-website.netlify.app/hw-1/',
        codeLink: 'https://github.com/vedantxy/css-clone-by-vedant-patel/tree/main/hw-1',
    },
    {
        id: 2,
        title: 'Myntra',
        description: 'Recreated the shopping experience of the Myntra website with a clean and responsive UI Designed interactive sections like navigation, banners, and product categories using HTML & CSS.',
        category: 'HTML/CSS',
        image: 'https://img-cdn.publive.online/fit-in/640x360/filters:format(webp)/entrackr/media/post_attachments/wp-content/uploads/2017/12/myntra-image-3.jpg', 
        liveLink: 'https://css-clone-website.netlify.app/hw-2/',
        codeLink: 'https://github.com/vedantxy/css-clone-by-vedant-patel/tree/main/hw-2',
    },
    {
        id: 3,
        title: 'RoadPilot',
        description: 'Built a responsive frontend clone of the RoadPilot logistics platform using HTML & CSS.Focused on designing a structured layout with navigation, pricing sections, and service-based UI.',
        category: 'HTML/CSS',
        image: 'https://roadpilot.co.in/assets/images/frontend/blog/thumb_660e1184789ab1712198020.png', 
        liveLink: 'https://css-clone-website.netlify.app/hw-3/',
        codeLink: 'https://github.com/vedantxy/css-clone-by-vedant-patel/tree/main/hw-3',
    },
    {
        id: 4,
        title: 'Cronos',
        description: 'Built a modern frontend clone of the Cronos website with a sleek dark-themed UI.Focused on animations, structured content sections, and visually engaging design elements.',
        category: 'HTML/CSS',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQtqa34IUaE9dUXJPW9Ej1eMSQqBm2vGhTeA&s', 
        liveLink: 'https://css-clone-website.netlify.app/hw-4/',
        codeLink: 'https://github.com/vedantxy/css-clone-by-vedant-patel/tree/main/hw-4',
    },
    {
        id: 5,
        title: 'Bombay Closet Cleanse',
        description: 'Built a responsive clone of Bombay Closet Cleanse using HTML & CSS.Focused on clean UI, product grids, and mobile-friendly design.',
        category: 'HTML/CSS',
        image: 'https://bombayclosetcleanse.in/cdn/shop/files/Banner_03.png?v=1711542578&width=3840', 
        liveLink: 'https://css-clone-website.netlify.app/hw-5/',
        codeLink: 'https://github.com/vedantxy/css-clone-by-vedant-patel/tree/main/hw-5',
    },
    {
        id: 6,
        title: 'XRP Ledger',
        description: 'Built a responsive clone of the XRP Ledger website using HTML & CSS. Focused on structured layouts, navigation design, and clean UI components.',
        category: 'HTML/CSS',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxL6eEDei0PxcmF5XUr8w8HpsY2y6euYGPFw&s', 
        liveLink: 'https://css-clone-website.netlify.app/hw-6/',
        codeLink: 'https://github.com/vedantxy/css-clone-by-vedant-patel/tree/main/hw-6',
    },
    {
        id: 7,
        title: ' CodeForge AI',
        description: 'Developed an AI-powered solution at CodeForge Hackathon, leveraging intelligent algorithms and modern technologies to solve real-world problems efficiently.',
        category: 'MERN Stack',
        image: 'https://res.cloudinary.com/dv7bazp5k/image/upload/q_auto/f_auto/v1775490626/free-ai-resume-analyzer_bbilhn.jpg', 
        liveLink: 'https://art-park-code-forge-hackathon-nine.vercel.app/',
        codeLink: 'https://github.com/vedantxy/ArtPark_CodeForge_Hackathon',
    },  {
        id: 8,
        title: 'CleanPulse',
        description: 'CleanPulse is a smart waste management system designed to optimize collection and promote environmental sustainability using modern web technologies.',
        category: 'MERN Stack',
        image: 'https://www.lingayasvidyapeeth.edu.in/sanmax/wp-content/uploads/2024/02/Solid-Waste-Management-in-Smart-Cities.webp', 
        liveLink: 'https://clean-pulse-taupe.vercel.app/',
        codeLink: 'https://github.com/vedantxy/cleanPulse',
    },
    {
        id: 9,
        title: 'oberoi mall',
        description: 'Designed a user-centric UI/UX for Oberoi Mall, enhancing navigation, accessibility, and overall digital shopping experience through modern and responsive design principles.',
        category: 'Figma',
        image: 'https://res.cloudinary.com/dv7bazp5k/image/upload/q_auto/f_auto/v1775491841/mall_tpukvr.webp', 
        liveLink: 'https://www.figma.com/design/KxdacndljNmlOhHl1HTTVM/Untitled?node-id=330-4&t=EGvzuftVaFx2AJkE-1',
    },
     {
        id: 10,
        title: 'Red Bus',
        description: 'Designed a user-centric bus booking UI/UX, optimizing search, seat selection, and checkout flow to deliver a fast, intuitive, and seamless travel booking experience.',
        category: 'Figma',
        image: 'https://res.cloudinary.com/dv7bazp5k/image/upload/q_auto/f_auto/v1775492336/red_bus_vhsyr4.webp', 
        liveLink: 'https://www.figma.com/design/KxdacndljNmlOhHl1HTTVM/Untitled?node-id=63-2&t=EGvzuftVaFx2AJkE-1',
    },
     {
        id: 11,
        title: 'Coding Gita',
        description: 'CodingGita is a modern tech education platform offering industry-focused full-stack development programs that bridge the gap between academic learning and real-world skills.',
        category: 'Figma',
        image: 'https://res.cloudinary.com/dv7bazp5k/image/upload/q_auto/f_auto/v1775493029/codinggita_lzg7gv.png', 
        liveLink: 'https://www.figma.com/design/KxdacndljNmlOhHl1HTTVM/Untitled?node-id=79-2&t=EGvzuftVaFx2AJkE-1',
    },
    
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