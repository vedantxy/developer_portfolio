import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence, useMotionTemplate } from 'motion/react';

const BURST_COUNT = 20;

class Particle {
  constructor(x, y, color, speedX, speedY, size) {
    this.x = x;
    this.y = y;
    this.vx = speedX || (Math.random() - 0.5) * 2;
    this.vy = speedY || (Math.random() - 0.5) * 2;
    this.size = size || Math.random() * 2 + 1;
    this.alpha = 1;
    this.color = color;
    this.decay = Math.random() * 0.01 + 0.005;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;
    if (this.size > 0.1) this.size -= 0.01;
    // Slight air resistance
    this.vx *= 0.98;
    this.vy *= 0.98;
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
  
  const [cursorMode, setCursorMode] = useState('default'); // 'default', 'hover', 'media', 'magnetic'
  const [hoverText, setHoverText] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  
  const mousePos = useRef({ x: -100, y: -100 });
  const prevMousePos = useRef({ x: -100, y: -100 });
  const velocity = useRef(0);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring configurations for elite feel
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const quickSpring = { damping: 20, stiffness: 800, mass: 0.1 };
  
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const isHovering = cursorMode !== 'default';

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Process particles
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
      
      // Calculate velocity
      const dx = x - prevMousePos.current.x;
      const dy = y - prevMousePos.current.y;
      velocity.current = Math.sqrt(dx * dx + dy * dy);
      prevMousePos.current = { x, y };

      let targetX = x;
      let targetY = y;

      // Magnetic Effect Check
      const target = e.target;
      const magneticElement = target.closest('[data-magnetic="true"]') || (target.dataset.magnetic === "true" ? target : null);
      
      if (magneticElement) {
        const rect = magneticElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Pull strength based on distance to center
        const pull = 0.35; 
        targetX = x + (centerX - x) * pull;
        targetY = y + (centerY - y) * pull;
      }

      mousePos.current = { x: targetX, y: targetY };
      cursorX.set(targetX);
      cursorY.set(targetY);
      
      // Emit Trail based on velocity
      if (velocity.current > 2) {
        const color = getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim() || '#FFF';
        const count = Math.min(Math.floor(velocity.current / 5), 3);
        for (let i = 0; i < count; i++) {
          particles.current.push(new Particle(
            x + (Math.random() - 0.5) * 10,
            y + (Math.random() - 0.5) * 10,
            color,
            (Math.random() - 0.5) * 1,
            (Math.random() - 0.5) * 1,
            Math.random() * 1.5 + 0.5
          ));
        }
      }
    };
    
    const handleClick = (e) => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 200);
      
      const color = getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim() || '#FFF';
      // High-end burst explosion
      for (let i = 0; i < BURST_COUNT; i++) {
        const angle = (Math.PI * 2 * i) / BURST_COUNT;
        const speed = Math.random() * 6 + 3;
        particles.current.push(new Particle(
          e.clientX, 
          e.clientY, 
          color, 
          Math.cos(angle) * speed, 
          Math.sin(angle) * speed,
          Math.random() * 3 + 2
        ));
      }
    };
    
    const handleMouseOver = (e) => {
      const target = e.target;
      const interactive = target.closest('a, button, [role="button"], [data-cursor]');
      
      if (interactive) {
        const mode = interactive.getAttribute('data-cursor') || 'hover';
        setCursorMode(mode);
        setHoverText(interactive.getAttribute('data-cursor-text') || "");
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
  }, [animate, cursorX, cursorY]);

  return (
    <>
      {/* ── Particle Engine ── */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9997]"
        style={{ mixBlendMode: 'difference' }}
      />
      
      {/* ── Inner Core (Glow) ── */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: 'var(--text-primary)',
          filter: isHovering ? 'blur(1px)' : 'none'
        }}
        animate={{
          scale: isClicked ? 4 : (cursorMode === 'media' ? 0 : 1),
          opacity: isClicked ? 0 : 1
        }}
        transition={quickSpring}
      />
      
      {/* ── Magnetic Ring ── */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border border-[var(--text-primary)]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorMode === 'default' ? 36 : (cursorMode === 'media' ? 100 : 70),
          height: cursorMode === 'default' ? 36 : (cursorMode === 'media' ? 100 : 70),
          opacity: isHovering ? 0.3 : 0.15,
          borderWidth: isHovering ? '1px' : '1.5px',
          backgroundColor: isHovering ? 'var(--accent-10)' : 'transparent',
          backdropFilter: isHovering ? 'blur(2px)' : 'none'
        }}
        transition={springConfig}
      />
      
      {/* ── Core Glow Flash ── */}
      <AnimatePresence>
        {isClicked && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9996]"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: '-50%',
              translateY: '-50%',
              backgroundColor: 'var(--text-primary)',
              filter: 'blur(8px)'
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Floating Label ── */}
      <AnimatePresence>
        {(hoverText || cursorMode === 'media') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed top-0 left-0 pointer-events-none z-[10000] flex items-center justify-center overflow-hidden"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: '-50%',
              translateY: '-50%',
            }}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white bg-black/80 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
              {hoverText || (cursorMode === 'media' ? "View" : "")}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
