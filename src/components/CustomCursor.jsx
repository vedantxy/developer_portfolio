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
    this.decay = Math.random() * 0.015 + 0.012;
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

/**
 * Walk up the DOM from `el` to find the nearest interactive element.
 * Works correctly for SVG children that may not support .closest()
 */
function findInteractive(el) {
  const INTERACTIVE = ['A', 'BUTTON'];
  let node = el;
  while (node && node !== document.body) {
    // Standard HTML interactive tags
    if (INTERACTIVE.includes(node.tagName)) return node;
    // Data-attribute based interactive
    if (
      node.getAttribute &&
      (node.getAttribute('role') === 'button' ||
        node.hasAttribute('data-cursor-hover') ||
        node.hasAttribute('data-cursor-text') ||
        node.getAttribute('data-magnetic') === 'true')
    ) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
}

function findMedia(el) {
  let node = el;
  while (node && node !== document.body) {
    if (['IMG', 'VIDEO'].includes(node.tagName)) return node;
    if (node.getAttribute && node.getAttribute('data-cursor') === 'media') return node;
    node = node.parentElement;
  }
  return null;
}

function findText(el) {
  const TEXT_TAGS = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'CODE', 'LI'];
  let node = el;
  while (node && node !== document.body) {
    if (TEXT_TAGS.includes(node.tagName)) return node;
    node = node.parentElement;
  }
  return null;
}

export default function CustomCursor() {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const requestRef = useRef();

  const [cursorMode, setCursorMode] = useState('default');
  const [hoverText, setHoverText] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Use refs to avoid stale closures in event handlers
  const cursorModeRef = useRef('default');
  const hoverTextRef = useRef('');

  const mousePos = useRef({ x: -100, y: -100 });
  const prevMousePos = useRef({ x: -100, y: -100 });
  const velocity = useRef(0);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 32, stiffness: 350, mass: 0.6 };
  const quickSpring = { damping: 22, stiffness: 700, mass: 0.15 };

  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const setMode = useCallback((mode, text = '') => {
    if (cursorModeRef.current !== mode) {
      cursorModeRef.current = mode;
      setCursorMode(mode);
    }
    if (hoverTextRef.current !== text) {
      hoverTextRef.current = text;
      setHoverText(text);
    }
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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

      // ── Magnetic effect (only for elements with data-magnetic="true") ──
      const el = e.target;
      const magneticElement =
        el?.closest?.('[data-magnetic="true"]') ||
        (el?.dataset?.magnetic === 'true' ? el : null);

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

      // ── Cursor Mode Detection (runs every mousemove — no flicker) ──
      const target = e.target;

      // Priority 1: Interactive element (button, link, data-cursor-text, etc.)
      const interactive = findInteractive(target);
      if (interactive) {
        const mode = interactive.getAttribute('data-cursor') || 'hover';
        const text = interactive.getAttribute('data-cursor-text') || '';
        setMode(mode, text);
      } else {
        // Priority 2: Media element
        const media = findMedia(target);
        if (media) {
          setMode('media', 'View');
        } else {
          // Priority 3: Text element
          const text = findText(target);
          if (text) {
            setMode('text', '');
          } else {
            // Default
            setMode('default', '');
          }
        }
      }

      // ── Particle Trail ──
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

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleClick);
      cancelAnimationFrame(requestRef.current);
    };
  }, [animate, cursorX, cursorY, isMobile, setMode]);

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
          boxShadow: cursorMode === 'hover'
            ? '0 0 20px rgba(99, 102, 241, 0.25)'
            : (cursorMode === 'media' ? '0 0 30px rgba(6, 182, 212, 0.3)' : 'none'),
        }}
        transition={springConfig}
      />

      {/* ── Inner Core Dot ── */}
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

      {/* ── Click Shockwave ── */}
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
              filter: 'blur(1px)',
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Interactive Label ── */}
      <AnimatePresence>
        {(hoverText || cursorMode === 'media') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            className="fixed top-0 left-0 pointer-events-none z-[10000] flex items-center justify-center"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: '-50%',
              translateY: '60px',
            }}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white bg-black/75 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
              {hoverText || (cursorMode === 'media' ? 'View' : '')}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
