import { motion, useMotionValue, useSpring, useInView } from 'motion/react';
import { useContext, useRef, useState, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function AnimatedCounter({ value, duration = 2, decimals = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { bounce: 0, duration: duration * 1000 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplay(latest.toFixed(decimals));
    });
  }, [springValue, decimals]);

  return <span ref={ref}>{display}</span>;
}

const TypewriterLine = ({ children, delay }) => (
  <motion.div
    initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
    whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay, ease: "linear" }}
    className="whitespace-pre overflow-hidden"
  >
    {children}
  </motion.div>
);

const BlinkingCursor = () => (
  <motion.span
    animate={{ opacity: [1, 0, 1] }}
    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    style={{ display: "inline-block", width: "10px", height: "1.1em", background: "var(--accent)", marginLeft: "6px", verticalAlign: "middle" }}
  />
);

function AboutMe() {
  const { isTransitioning } = useContext(ThemeContext);
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 25, stiffness: 150 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 150 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const codeLines = [
    <><span style={{ color: '#c678dd' }}>const</span> <span style={{ color: '#e5c07b' }}>vedant</span> = <span style={{ color: '#d4d4d8' }}>{'{'}</span></>,
    <>&nbsp;&nbsp;role: <span style={{ color: '#98c379' }}>&apos;Full Stack Developer&apos;</span>,</>,
    <>&nbsp;&nbsp;cgpa: <span style={{ color: '#d19a66' }}>9.48</span>,</>,
    <>&nbsp;&nbsp;focus: <span style={{ color: '#d4d4d8' }}>[</span></>,
    <>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#98c379' }}>&apos;Clean Code&apos;</span>,</>,
    <>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#98c379' }}>&apos;Scalability&apos;</span>,</>,
    <>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#98c379' }}>&apos;UI/UX&apos;</span></>,
    <>&nbsp;&nbsp;<span style={{ color: '#d4d4d8' }}>],</span></>,
    <>&nbsp;&nbsp;mindset: <span style={{ color: '#98c379' }}>&apos;Always Building 🚀&apos;</span></>,
    <><span style={{ color: '#d4d4d8' }}>{'};'}</span><BlinkingCursor /></>,
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`min-h-screen py-32 px-8 md:px-16 lg:px-24 xl:px-32 relative overflow-hidden transition-colors duration-500 card-theme-animation flex items-center ${isTransitioning ? 'theme-transition-tilt' : ''}`}
      style={{ background: 'transparent' }}
    >
      {/* Subtle mouse parallax background glow */}
      <motion.div
        className="absolute pointer-events-none blur-[120px] z-0"
        style={{
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'var(--accent-10)',
          left: springX, top: springY,
          transform: 'translate(-50%, -50%)',
          opacity: 0.6,
        }}
      />

      <div className="max-w-[1400px] w-full mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-12 xl:gap-20">
        
        {/* LEFT SIDE: 60% Content Area */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, staggerChildren: 0.2 }}
          className="w-full lg:w-[58%] flex flex-col"
        >
          {/* Section Heading */}
          <div className="mb-6">
            <span className="section-label tracking-widest text-sm uppercase">02 — ABOUT ME</span>
          </div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-12 tracking-tight" 
            style={{ color: 'var(--text-primary)' }}
          >
            More Than <br className="hidden lg:block"/> Just Code.
          </motion.h2>

          {/* Intro Paragraph */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl font-semibold mb-8 leading-relaxed" 
            style={{ color: 'var(--text-primary)' }}
          >
            Hi, I&apos;m Vedant — a Full Stack Developer who focuses on building scalable, high-performance web applications that feel as good as they function.
          </motion.div>

          {/* Story Paragraphs */}
          <div className="flex flex-col gap-6 mb-12 text-base md:text-lg font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}>
              I don&apos;t just build applications — I solve problems.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.4 }}>
              I enjoy transforming complex ideas into simple, elegant, and impactful digital solutions. Whether it&apos;s developing full-stack systems using the MERN stack or solving 150+ DSA problems, I constantly push myself to grow as both an engineer and a thinker.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.5 }}>
              Currently pursuing Computer Science Engineering with a CGPA of 9.48, I combine strong academic fundamentals with real-world development experience.
            </motion.p>
          </div>

          {/* Philosophy Block */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.7, delay: 0.6 }}
            className="pl-6 md:pl-8 py-5 mb-16 border-l-4 rounded-r-2xl shadow-sm backdrop-blur-sm"
            style={{ borderColor: 'var(--accent)', background: 'var(--accent-10)' }}
          >
            <p className="text-lg md:text-xl italic font-medium mb-5 leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              &quot;I believe great software isn&apos;t just functional — it&apos;s intuitive, scalable, and beautifully designed.&quot;
            </p>
            <ul className="flex flex-col gap-3 font-medium text-sm md:text-base tracking-wide" style={{ color: 'var(--text-secondary)' }}>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} /> Clean, maintainable code</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} /> Scalable architecture</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} /> Seamless user experience</li>
            </ul>
          </motion.div>

          {/* Animated Stats Cards Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="grid grid-cols-2 gap-4 md:gap-6"
          >
            {/* Stat Card 1 */}
            <div className="p-6 rounded-2xl glass-card border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group" style={{ background: 'var(--bg-card)', borderColor: 'var(--glass-border)' }}>
              <div className="text-4xl md:text-5xl font-black mb-3 transition-colors duration-300 group-hover:text-[var(--accent)]" style={{ color: 'var(--text-primary)' }}><AnimatedCounter value={150} />+</div>
              <div className="text-xs md:text-sm uppercase tracking-widest font-semibold" style={{ color: 'var(--text-muted)' }}>Problems Solved</div>
            </div>
            {/* Stat Card 2 */}
            <div className="p-6 rounded-2xl glass-card border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group" style={{ background: 'var(--bg-card)', borderColor: 'var(--glass-border)' }}>
              <div className="text-4xl md:text-5xl font-black mb-3 transition-colors duration-300 group-hover:text-[var(--accent)]" style={{ color: 'var(--text-primary)' }}><AnimatedCounter value={10} />+</div>
              <div className="text-xs md:text-sm uppercase tracking-widest font-semibold" style={{ color: 'var(--text-muted)' }}>Projects Built</div>
            </div>
            {/* Stat Card 3 */}
            <div className="p-6 rounded-2xl glass-card border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group" style={{ background: 'var(--bg-card)', borderColor: 'var(--glass-border)' }}>
              <div className="text-4xl md:text-5xl font-black mb-3 transition-colors duration-300 group-hover:text-[var(--accent)]" style={{ color: 'var(--text-primary)' }}><AnimatedCounter value={1} />+</div>
              <div className="text-xs md:text-sm uppercase tracking-widest font-semibold" style={{ color: 'var(--text-muted)' }}>Hackathons</div>
            </div>
            {/* Stat Card 4 */}
            <div className="p-6 rounded-2xl glass-card border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group" style={{ background: 'var(--bg-card)', borderColor: 'var(--glass-border)' }}>
              <div className="text-4xl md:text-5xl font-black mb-3 transition-colors duration-300 group-hover:text-[var(--accent)]" style={{ color: 'var(--text-primary)' }}><AnimatedCounter value={9.48} decimals={2} /> 🎓</div>
              <div className="text-xs md:text-sm uppercase tracking-widest font-semibold" style={{ color: 'var(--text-muted)' }}>CGPA</div>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE: 40% Interactive Larger Code Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
          className="relative w-full lg:w-[40%] mt-16 lg:mt-0 perspective-1000"
        >
          {/* Soft external blur glow */}
          <div className="absolute inset-0 rounded-3xl blur-[80px] opacity-20 transform translate-y-4 scale-90 transition-opacity duration-700 pointer-events-none" style={{ background: 'var(--accent)' }} />

          {/* Glassmorphism Card Container */}
          <motion.div
            whileHover={{ y: -12, scale: 1.03, rotateX: 2, rotateY: -2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10 rounded-2xl border overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] transform-gpu"
            style={{
              background: '#09090b',
              borderColor: '#27272a'
            }}
          >
            {/* Mac OS Style Top Dots */}
            <div className="flex items-center gap-2 px-6 py-5 border-b" style={{ borderColor: '#27272a', background: '#0f0f11' }}>
              <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]" />
            </div>

            {/* Code Content with Typing Animation */}
            <div className="p-8 md:p-10 font-mono text-[16px] md:text-[17px] leading-loose overflow-x-auto" style={{ color: '#a1a1aa' }}>
              {codeLines.map((line, idx) => (
                <TypewriterLine key={idx} delay={1.2 + (idx * 0.15)}>
                  {line}
                </TypewriterLine>
              ))}
            </div>

          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

export default AboutMe;