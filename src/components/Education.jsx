import { motion, useScroll, useSpring } from 'motion/react';
import { useRef, useContext, useMemo } from 'react';
import { GraduationCap, Building2, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import './Education.css';

const EDUCATION_DATA = [
    {
        id: 1,
        degree: "Computer Science",
        institution: "Swaminarayan University",
        location: "Kalol, Gandhinagar, India",
        duration: "Aug 2025 – Aug 2029",
        highlights: [
            "Strong foundation in Frontend and Backend Web Development",
            "Proficient in HTML, CSS, JavaScript, React, Node.js, Express, MongoDB",
            "Skilled in UI/UX design and database management",
            "Currently pursuing B.Tech in Computer Science"
        ]
    },
    {
        id: 2,
        degree: "Higher Secondary Education (Science)",
        institution: "B.M High School",
        location: "Patan, Gujarat, India",
        duration: "Jun 2023 – Mar 2025",
        highlights: [
            "Completed 12th grade with Physics, Chemistry, Mathematics",
            "Achieved 82.75% and 82.15 percentile in board examinations",
            "Built strong academic foundation for engineering and computer science"
        ]
    },
    {
        id: 3,
        degree: "Secondary School Certificate (SSC)",
        institution: "B.M High School",
        location: "Patan, Gujarat, India",
        duration: "Jun 2022 – Mar 2023",
        highlights: [
            "Achieved 80% and 92.65 percentile in board examinations",
            "Demonstrated strong aptitude in Mathematics and Science",
            "Recognized for discipline and consistent academic excellence"
        ]
    }
];

function EducationCard({ data, index, isTransitioning }) {
    const isEven = index % 2 === 0;

    return (
        <div className={`flex flex-col md:flex-row w-full mb-16 relative ${isEven ? 'md:flex-row-reverse' : ''}`}>
            {/* Timeline Node */}
            <div className={`timeline-node transition-all duration-300 ${isTransitioning ? 'scale-0' : 'scale-100'}`}>
                <GraduationCap size={24} />
            </div>

            {/* Content Card */}
            <motion.div
                initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ transitionDelay: `${index * 50}ms` }}
                className={`w-full md:w-[45%] education-card p-8 rounded-3xl border bg-[#1a1f2e] border-gray-800 hover:border-[#00d4ff]/30 shadow-xl ml-12 md:ml-0 card-theme-animation ${isTransitioning ? 'theme-transition-tilt' : ''}`}
            >
                <div className="flex flex-col gap-4">
                    <div>
                        <h3 className={`text-2xl md:text-3xl font-black text-[#00d4ff] mb-2 text-morph ${isTransitioning ? 'text-morph-active' : ''}`}>
                            {data.degree}
                        </h3>
                        <div className={`flex items-center gap-2 text-gray-400 font-bold mb-1 text-morph ${isTransitioning ? 'text-morph-active' : ''}`}>
                            <Building2 size={16} />
                            <span>{data.institution}</span>
                        </div>
                    </div>

                    <div className={`flex flex-wrap gap-4 text-sm text-gray-500 font-medium text-morph ${isTransitioning ? 'text-morph-active' : ''}`}>
                        <div className="flex items-center gap-1.5">
                            <MapPin size={14} className="text-purple-500" />
                            <span>{data.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-cyan-500" />
                            <span>{data.duration}</span>
                        </div>
                    </div>

                    <div className="h-[1px] w-full bg-gray-800/50 my-2"></div>

                    <ul className="space-y-3">
                        {data.highlights.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <CheckCircle2 size={16} className="text-[#00d4ff] mt-1 shrink-0" />
                                <p className={`text-gray-300 text-sm leading-relaxed font-medium text-morph ${isTransitioning ? 'text-morph-active' : ''}`}>
                                    {item}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </div>
    );
}

function Education() {
    const containerRef = useRef(null);
    const { isTransitioning } = useContext(ThemeContext);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const particles = useMemo(() => {
        return [...Array(15)].map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            delay: `${Math.random() * 10}s`,
            duration: `${Math.random() * 10 + 10}s`
        }));
    }, []);

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section id="education" ref={containerRef} className="education-section py-32 px-6">
            {/* Background Effects */}
            <div className="constellation-bg"></div>
            <div className="bg-particles">
                {particles.map((p) => (
                    <div 
                        key={p.id} 
                        className="particle" 
                        style={{
                            left: p.left,
                            top: p.top,
                            width: p.width,
                            height: p.height,
                            animationDelay: p.delay,
                            animationDuration: p.duration
                        }}
                    ></div>
                ))}
            </div>

            <div className="max-w-7xl mx-auto relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <h2 className={`text-5xl md:text-7xl font-black text-white mb-6 text-morph ${isTransitioning ? 'text-morph-active' : ''}`}>
                        Education <span className="text-[#00d4ff]">Journal</span>
                    </h2>
                    <div className="h-2 w-24 bg-gradient-to-r from-[#00d4ff] to-purple-600 mx-auto rounded-full"></div>
                </motion.div>

                <div className="relative">
                    {/* Glowing Sequential Timeline Line */}
                    <motion.div 
                        className={`timeline-line origin-top transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
                        style={{ scaleY }}
                    />

                    <div className="flex flex-col">
                        {EDUCATION_DATA.map((item, index) => (
                            <EducationCard 
                                key={item.id} 
                                data={item} 
                                index={index} 
                                isTransitioning={isTransitioning}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Education;
