import { motion, useMotionValue, useSpring } from 'motion/react';
import { useContext, useRef } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import ProfileDark from "./../assets/Web_Photo_Editor.jpg"
import { Server, Layout, Zap, Rocket } from 'lucide-react';

function InterestCard({ icon: MyIcon, title, index, theme }) {
    const { isTransitioning } = useContext(ThemeContext);
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            style={{ transitionDelay: `${index * 50}ms` }}
            whileHover={{ 
                y: -8, 
                transition: { duration: 0.3 } 
            }}
            className={`p-6 rounded-2xl border transition-all duration-300 group cursor-default card-theme-animation ${isTransitioning ? 'theme-transition-tilt' : ''} ${
                theme === 'dark' 
                ? 'bg-[#1c1c1c]/40 border-[#b8f2e6]/10 hover:border-[#b8f2e6]/30 hover:bg-[#b8f2e6]/5' 
                : 'bg-white/40 border-[#aed9e0]/20 hover:border-[#aed9e0]/40 hover:bg-[#aed9e0]/10'
            }`}
        >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300 ${
                theme === 'dark' ? 'bg-[#b8f2e6]/10' : 'bg-[#aed9e0]/20'
            }`}>
                <MyIcon size={24} className={theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#5e6472]'} />
            </div>
            <h3 className={`font-semibold text-lg text-morph ${isTransitioning ? 'text-morph-active' : ''} ${
                theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#5e6472]'
            }`}>
                {title}
            </h3>
        </motion.div>
    );
}

function AboutMe() {
    const { theme, isTransitioning } = useContext(ThemeContext);
    const containerRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const interests = [
        { icon: Server, title: "Building scalable web applications" },
        { icon: Layout, title: "Creating intuitive user interfaces" },
        { icon: Zap, title: "Optimizing application performance" },
        { icon: Rocket, title: "Learning new technologies" }
    ];

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <section
            id="about"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className={`py-24 px-6 relative overflow-hidden bg-transparent transition-colors duration-500`}
        >
            {/* Interactive Background Glow */}
            <motion.div
                className="absolute pointer-events-none opacity-40 blur-[120px] z-0"
                style={{
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: theme === 'dark' ? 'rgba(184, 242, 230, 0.15)' : 'rgba(174, 217, 224, 0.2)',
                    left: springX,
                    top: springY,
                    transform: 'translate(-50%, -50%)',
                }}
            />

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className={`absolute top-20 right-10 w-72 h-72 rounded-full blur-3xl opacity-10 ${theme === "dark" ? "bg-[#b8f2e6]" : "bg-[#aed9e0]"}`}
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -90, 0],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className={`absolute bottom-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-10 ${theme === "dark" ? "bg-[#b8f2e6]" : "bg-[#aed9e0]"}`}
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, type: "spring", stiffness: 40 }}
                        className="w-full lg:w-5/12 flex justify-center"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: 2 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            className={`relative group card-theme-animation ${isTransitioning ? 'theme-transition-tilt' : ''}`}
                        >
                            <motion.div
                                className={`absolute -inset-4 rounded-3xl opacity-50 blur-xl ${theme === "dark" ? "bg-[#b8f2e6]" : "bg-[#aed9e0]"}`}
                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            />
                            
                            <div className={`relative w-80 h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden border-2 transition-colors duration-500 ${theme === "dark" ? "border-[#b8f2e6]/30 bg-[#1c1c1c]" : "border-[#aed9e0]/50 bg-white"}`}>
                                <motion.img
                                    src={ProfileDark}
                                    alt="Profile"
                                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                    initial={{ scale: 1.2 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1 }}
                                />
                                <motion.div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${theme === "dark" ? "bg-gradient-to-t from-[#b8f2e6]/20 to-transparent" : "bg-gradient-to-t from-[#aed9e0]/30 to-transparent"}`} />
                            </div>

                            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className={`absolute -top-4 -right-4 w-24 h-24 rounded-full border-4 opacity-40 ${theme === "dark" ? "border-[#b8f2e6]" : "border-[#aed9e0]"}`} />
                            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className={`absolute -bottom-6 -left-6 w-32 h-32 rounded-full border-4 opacity-30 ${theme === "dark" ? "border-[#b8f2e6]" : "border-[#aed9e0]"}`} />
                        </motion.div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, type: "spring", stiffness: 40, delay: 0.2 }}
                        className="w-full lg:w-7/12"
                    >
                        <div className="mb-12">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className={`text-5xl md:text-6xl font-bold mb-6 text-morph ${isTransitioning ? 'text-morph-active' : ''} ${theme === "dark" ? "text-[#b8f2e6]" : "text-[#5e6472]"}`}
                            >
                                About Me
                            </motion.h2>
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "6rem" }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className={`h-1.5 rounded-full mb-8 ${theme === "dark" ? "bg-[#b8f2e6]" : "bg-[#aed9e0]"}`}
                            />
                        </div>

                        <div className="space-y-10">
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className={`text-xl md:text-2xl font-light leading-relaxed text-morph ${isTransitioning ? 'text-morph-active' : ''} ${theme === "dark" ? "text-[#aed9e0]" : "text-[#5e6472]"}`}
                            >
                                I&apos;m a passionate Full-Stack Developer with a strong foundation in both frontend and backend technologies. My journey in web development started with a curiosity about how things work on the internet, and it has evolved into a professional pursuit of creating elegant, efficient, and user-friendly applications.
                            </motion.p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {interests.map((interest, idx) => (
                                    <InterestCard key={idx} {...interest} index={idx} theme={theme} />
                                ))}
                            </div>

                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                className={`text-base md:text-lg italic opacity-80 text-morph ${isTransitioning ? 'text-morph-active' : ''} ${theme === "dark" ? "text-[#aed9e0]" : "text-[#5e6472]"}`}
                            >
                                When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through technical blog posts.
                            </motion.p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default AboutMe;