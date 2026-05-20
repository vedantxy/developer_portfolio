import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { ArrowRight, Code2, Terminal } from 'lucide-react';

/* ── Animated Counter ── */
function AnimatedCounter({ target, suffix = '' }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return unsub;
  }, [rounded]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate(count, target, { duration: 2, ease: [0.16, 1, 0.3, 1] });
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [count, target]);

  return <span ref={ref}>{display}{suffix}</span>;
}

/* ── Typing animation for code lines ── */
function TypedCodeBlock() {
  const lines = [
    { indent: 0, content: [{ text: 'const ', color: 'var(--code-keyword)' }, { text: 'developer', color: 'var(--code-variable)' }, { text: ' = {', color: 'var(--code-bracket)' }] },
    { indent: 1, content: [{ text: 'name', color: 'var(--code-property)' }, { text: ': ', color: 'var(--code-bracket)' }, { text: "'Vedant Patel'", color: 'var(--code-string)' }, { text: ',', color: 'var(--code-bracket)' }] },
    { indent: 1, content: [{ text: 'role', color: 'var(--code-property)' }, { text: ': ', color: 'var(--code-bracket)' }, { text: "'Full Stack Developer'", color: 'var(--code-string)' }, { text: ',', color: 'var(--code-bracket)' }] },
    { indent: 1, content: [{ text: 'university', color: 'var(--code-property)' }, { text: ': ', color: 'var(--code-bracket)' }, { text: "'Swaminarayan University'", color: 'var(--code-string)' }, { text: ',', color: 'var(--code-bracket)' }] },
    { indent: 1, content: [{ text: 'stack', color: 'var(--code-property)' }, { text: ': ', color: 'var(--code-bracket)' }, { text: "['React'", color: 'var(--code-string)' }, { text: ', ', color: 'var(--code-bracket)' }, { text: "'Node'", color: 'var(--code-string)' }, { text: ', ', color: 'var(--code-bracket)' }, { text: "'Express'", color: 'var(--code-string)' }, { text: ']', color: 'var(--code-bracket)' }, { text: ',', color: 'var(--code-bracket)' }] },
    { indent: 1, content: [{ text: 'focus', color: 'var(--code-property)' }, { text: ': ', color: 'var(--code-bracket)' }, { text: "['Clean Code'", color: 'var(--code-string)' }, { text: ', ', color: 'var(--code-bracket)' }, { text: "'Performance'", color: 'var(--code-string)' }, { text: ']', color: 'var(--code-bracket)' }, { text: ',', color: 'var(--code-bracket)' }] },
    { indent: 1, content: [{ text: 'scpa', color: 'var(--code-property)' }, { text: ': ', color: 'var(--code-bracket)' }, { text: '10', color: 'var(--code-number)' }, { text: ',', color: 'var(--code-bracket)' }] },
    { indent: 1, content: [{ text: 'hireable', color: 'var(--code-property)' }, { text: ': ', color: 'var(--code-bracket)' }, { text: 'true', color: 'var(--code-boolean)' }] },
    { indent: 0, content: [{ text: '}', color: 'var(--code-bracket)' }] },
  ];

  const [visibleLines, setVisibleLines] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let i = 0;
          const interval = setInterval(() => {
            i++;
            setVisibleLines(i);
            if (i >= lines.length) clearInterval(interval);
          }, 180);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [lines.length]);

  return (
    <div ref={ref} className="font-mono text-[13px] md:text-sm leading-[2] select-text">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={i < visibleLines ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="flex"
        >
          {/* Line number */}
          <span className="w-8 shrink-0 text-right pr-4 select-none opacity-25" style={{ color: 'var(--code-line-num)' }}>
            {i + 1}
          </span>
          {/* Indent */}
          <span style={{ width: `${line.indent * 24}px` }} className="shrink-0" />
          {/* Tokens */}
          {line.content.map((token, j) => (
            <span key={j} style={{ color: token.color }}>{token.text}</span>
          ))}
        </motion.div>
      ))}
      {/* Blinking cursor */}
      {visibleLines >= lines.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex"
        >
          <span className="w-8 shrink-0 text-right pr-4 select-none opacity-25" style={{ color: 'var(--code-line-num)' }}>
            {lines.length + 1}
          </span>
          <span className="w-[2px] h-5 bg-indigo-400 animate-pulse rounded-full mt-0.5" />
        </motion.div>
      )}
    </div>
  );
}

/* ── Main About Me Component ── */
function AboutMe() {
  const { isTransitioning } = useContext(ThemeContext);

  const stats = [
    { number: 150, suffix: '+', label: 'LeetCode Solved' },
    { number: 15, suffix: '+', label: 'Projects Built' },
    { number: 10, suffix: '', label: 'Sem 1 SCPA' },
  ];

  return (
    <section
      id="about"
      className={`py-24 md:py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden transition-colors duration-500 ${isTransitioning ? 'theme-transition-tilt' : ''}`}
      style={{ background: 'transparent' }}
    >
      {/* Subtle background accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1100px] w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── LEFT: Text Content ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            {/* Label with decorative line */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] rounded-full" style={{ background: 'var(--accent)' }} />
              <span className="text-[11px] font-black tracking-[0.3em] uppercase" style={{ color: 'var(--accent)' }}>
                About Me
              </span>
            </div>

            {/* Bold Headline */}
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.08] mb-8" style={{ color: 'var(--text-primary)' }}>
              CSE Student &amp;
              <br />
              <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Full Stack Developer
              </span>
            </h2>

            {/* Bio Paragraphs */}
            <div className="space-y-5 mb-10">
              <p className="text-[15px] font-medium leading-relaxed opacity-70" style={{ color: 'var(--text-primary)' }}>
                I&apos;m a <strong className="opacity-100 font-extrabold">Computer Science Engineering student</strong> at
                Swaminarayan University (Semester 1 SCPA: 10/10),
                specializing in the <strong className="opacity-100 font-extrabold">MERN Stack</strong>. Experienced in building
                production-grade systems including full-stack web platforms
                and interactive UI applications.
              </p>
              <p className="text-[15px] font-medium leading-relaxed opacity-70" style={{ color: 'var(--text-primary)' }}>
                Strong focus on <strong className="opacity-100 font-extrabold">clean code, scalable architecture, and
                intuitive UI/UX</strong>. I&apos;ve solved 150+ problems on LeetCode with
                a strong grasp of arrays, strings, recursion, and dynamic
                programming.
              </p>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-8 mb-10">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex flex-col"
                >
                  <span className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: 'var(--accent)' }}>
                    <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] mt-1 opacity-50" style={{ color: 'var(--text-primary)' }}>
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ x: 6 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 text-sm font-black uppercase tracking-widest group transition-colors w-fit"
              style={{ color: 'var(--accent)' }}
            >
              View Projects
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>

          {/* ── RIGHT: Code Editor Card ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative w-full max-w-[520px] mx-auto lg:ml-auto group"
          >
            {/* Glow behind card */}
            <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/10 via-blue-500/5 to-purple-500/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Main Card */}
            <div
              className="relative rounded-[1.75rem] overflow-hidden border shadow-2xl"
              style={{
                background: 'var(--code-bg)',
                borderColor: 'var(--code-border)',
              }}
            >
              {/* Title Bar */}
              <div className="flex items-center gap-2 px-5 py-4 border-b" style={{ borderColor: 'var(--code-border)' }}>
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="ml-3 text-[11px] font-bold tracking-wider opacity-40" style={{ color: 'var(--code-line-num)' }}>
                  about-vedant.js
                </span>
              </div>

              {/* Code Content */}
              <div className="px-5 py-6 overflow-x-auto">
                <TypedCodeBlock />
              </div>

              {/* Bottom Status Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-t" style={{ borderColor: 'var(--code-border)' }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent)', color: '#fff' }}>
                    <Code2 size={14} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold tracking-tight" style={{ color: 'var(--code-line-num)' }}>
                      System Thinking
                    </span>
                    <span className="text-[10px] font-medium opacity-40" style={{ color: 'var(--code-line-num)' }}>
                      Always learning
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Terminal size={12} style={{ color: 'var(--code-line-num)', opacity: 0.4 }} />
                  <span className="text-[10px] font-bold opacity-40" style={{ color: 'var(--code-line-num)' }}>
                    JavaScript
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative corner accents */}
            <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 rounded-tl-xl pointer-events-none opacity-20" style={{ borderColor: 'var(--accent)' }} />
            <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 rounded-br-xl pointer-events-none opacity-20" style={{ borderColor: 'var(--accent)' }} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default AboutMe;