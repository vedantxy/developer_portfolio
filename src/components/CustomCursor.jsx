import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';

const BURST_COUNT = 24;

class Particle {
  constructor(x, y, color, speedX, speedY, size) {
    this.x = x;
    this.y = y;
    this.vx = speedX || (Math.random() - 0.5) * 2;
    this.vy = speedY || (Math.random() - 0.5) * 2;
    this.size = size || Math.random() * 2 + 1;
    this.alpha = 1;
    this.color = color;
    this.decay = Math.random() * 0.015 + 0.012; // sleek fast decay
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;
    if (this.size > 0.1) this.size -= 0.02;
    this.vx *= 0.97;
    this.vy *= 0.97;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export default function CustomCursor() {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const requestRef = useRef();
  
  const [cursorMode, setCursorMode] = useState('default'); // 'default', 'hover', 'media', 'text', 'magnetic'
  const [hoverText, setHoverText] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  
  const mousePos = useRef({ x: -100, y: -100 });
  const prevMousePos = useRef({ x: -100, y: -100 });
  const velocity = useRef(0);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // High-performance spring physics
  const springConfig = { damping: 32, stiffness: 350, mass: 0.6 };
  const quickSpring = { damping: 22, stiffness: 700, mass: 0.15 };
  
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Process trailing trail
    for (let i = 0; i < particles.current.length; i++) {
      const p = particles.current[i];
      p.update();
      p.draw(ctx);
      if (p.alpha <= 0) {
        particles.current.splice(i, 1);
        i--;
      }
    }
    
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isTouch || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    requestRef.current = requestAnimationFrame(animate);
    
    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e;
      
      const dx = x - prevMousePos.current.x;
      const dy = y - prevMousePos.current.y;
      velocity.current = Math.sqrt(dx * dx + dy * dy);
      prevMousePos.current = { x, y };

      let targetX = x;
      let targetY = y;

      // Magnetic hover attraction pull
      const target = e.target;
      const magneticElement = target?.closest('[data-magnetic="true"]') || (target?.dataset?.magnetic === "true" ? target : null);
      
      if (magneticElement) {
        const rect = magneticElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const pull = 0.38; 
        targetX = x + (centerX - x) * pull;
        targetY = y + (centerY - y) * pull;
      }

      mousePos.current = { x: targetX, y: targetY };
      cursorX.set(targetX);
      cursorY.set(targetY);
      
      // Beautiful Cyber Particle Trail
      if (velocity.current > 1.8) {
        const colors = ['#06b6d4', '#6366f1'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const count = Math.min(Math.floor(velocity.current / 4), 2);
        for (let i = 0; i < count; i++) {
          particles.current.push(new Particle(
            x + (Math.random() - 0.5) * 8,
            y + (Math.random() - 0.5) * 8,
            color,
            (Math.random() - 0.5) * 0.8,
            (Math.random() - 0.5) * 0.8,
            Math.random() * 2 + 0.6
          ));
        }
      }
    };
    
    const handleClick = (e) => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 250);
      
      const colors = ['#06b6d4', '#6366f1'];
      // Shockwave particle burst explosion
      for (let i = 0; i < BURST_COUNT; i++) {
        const angle = (Math.PI * 2 * i) / BURST_COUNT;
        const speed = Math.random() * 4.5 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.current.push(new Particle(
          e.clientX, 
          e.clientY, 
          color, 
          Math.cos(angle) * speed, 
          Math.sin(angle) * speed,
          Math.random() * 2.5 + 1.2
        ));
      }
    };
    
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], [data-cursor-hover], [data-magnetic="true"]');
      const media = target.closest('img, video, [data-cursor="media"]');
      const text = target.closest('p, h1, h2, h3, h4, h5, h6, span, code, li');

      if (interactive) {
        const mode = interactive.getAttribute('data-cursor') || 'hover';
        setCursorMode(mode);
        setHoverText(interactive.getAttribute('data-cursor-text') || "");
      } else if (media) {
        setCursorMode('media');
        setHoverText("View");
      } else if (text) {
        setCursorMode('text');
        setHoverText("");
      } else {
        setCursorMode('default');
        setHoverText("");
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleClick);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleClick);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(requestRef.current);
    };
  }, [animate, cursorX, cursorY, isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* ── Particle Engine Canvas ── */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9997]"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* ── Outer Glowing Ring ── */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          borderWidth: cursorMode === 'text' ? '0px' : '1.5px',
          borderStyle: 'solid',
          borderColor: cursorMode === 'media' ? '#06b6d4' : (cursorMode === 'hover' ? '#06b6d4' : '#6366f1'),
        }}
        animate={{
          width: cursorMode === 'default' ? 38 : (cursorMode === 'media' ? 96 : (cursorMode === 'text' ? 0 : 72)),
          height: cursorMode === 'default' ? 38 : (cursorMode === 'media' ? 96 : (cursorMode === 'text' ? 0 : 72)),
          opacity: cursorMode === 'text' ? 0 : (cursorMode === 'media' ? 0.9 : (cursorMode === 'hover' ? 0.8 : 0.35)),
          backgroundColor: cursorMode === 'hover' ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
          backdropFilter: cursorMode === 'hover' ? 'blur(4px)' : 'none',
          boxShadow: cursorMode === 'hover' ? '0 0 20px rgba(99, 102, 241, 0.25)' : (cursorMode === 'media' ? '0 0 30px rgba(6, 182, 212, 0.3)' : 'none'),
        }}
        transition={springConfig}
      />

      {/* ── Inner Core (Awwwards Style Blend/Glow Dot) ── */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: cursorMode === 'text' ? 'difference' : 'normal',
          backgroundColor: cursorMode === 'text' ? '#ffffff' : (cursorMode === 'media' ? 'transparent' : '#06b6d4'),
        }}
        animate={{
          width: cursorMode === 'default' ? 7 : (cursorMode === 'media' ? 0 : (cursorMode === 'text' ? 24 : 10)),
          height: cursorMode === 'default' ? 7 : (cursorMode === 'media' ? 0 : (cursorMode === 'text' ? 24 : 10)),
          boxShadow: cursorMode === 'text' ? 'none' : (cursorMode === 'media' ? 'none' : '0 0 10px rgba(6, 182, 212, 0.8), 0 0 20px rgba(99, 102, 241, 0.4)'),
        }}
        transition={quickSpring}
      />
      
      {/* ── Core Shockwave Glow on Click ── */}
      <AnimatePresence>
        {isClicked && (
          <motion.div
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 5, opacity: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-[9996] border border-[#06b6d4]"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: '-50%',
              translateY: '-50%',
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.4), inset 0 0 20px rgba(99, 102, 241, 0.3)',
              filter: 'blur(1px)'
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Glassy Interactive Label ── */}
      <AnimatePresence>
        {(hoverText || cursorMode === 'media') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.75, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: 10 }}
            className="fixed top-0 left-0 pointer-events-none z-[10000] flex items-center justify-center"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: '-50%',
              translateY: '60px',
            }}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white bg-black/75 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
              {hoverText || (cursorMode === 'media' ? "View" : "")}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

