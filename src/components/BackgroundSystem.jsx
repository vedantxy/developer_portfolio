import React, { useMemo, memo } from 'react';
import { motion } from 'motion/react';

const BackgroundSystem = memo(() => {
  // Generate random particles
  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 10,
    }));
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-50 overflow-hidden pointer-events-none bg-system-gradient">
      
      {/* 1. Base Layer: Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay noise-bg pointer-events-none" />

      {/* 2. Grid Pattern Layer */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" />

      {/* 3. Blur Blobs (Glows) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top Left - Blue Blob */}
        <motion.div 
          animate={{ 
            x: [0, 30, 0], 
            y: [0, 50, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full opacity-[0.15] blur-[120px] will-change-transform"
          style={{ background: 'var(--blob-blue)' }}
        />
        
        {/* Bottom Right - Purple Blob */}
        <motion.div 
          animate={{ 
            x: [0, -40, 0], 
            y: [0, -60, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-[15%] -right-[10%] w-[60vw] h-[60vw] rounded-full opacity-[0.2] blur-[140px] will-change-transform"
          style={{ background: 'var(--blob-purple)' }}
        />

        {/* Center - Soft Indigo/Pink Glow (Optional) */}
        <motion.div 
          animate={{ 
            opacity: [0.05, 0.1, 0.05],
            scale: [0.8, 1, 0.8]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full opacity-[0.08] blur-[160px]"
          style={{ background: 'var(--accent)' }}
        />
      </div>

      {/* 4. Floating Particles Layer (Reduced on mobile) */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{ 
              y: ['-10vh', '110vh'],
              x: ['-5vw', '5vw'],
              opacity: [0, 0.3, 0]
            }}
            transition={{ 
              duration: p.duration, 
              repeat: Infinity, 
              delay: p.delay,
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              left: p.left,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: 'var(--particle-color)',
            }}
          />
        ))}
      </div>

      {/* 5. Mobile Particles (Fewer) */}
      <div className="absolute inset-0 pointer-events-none sm:hidden">
        {particles.slice(0, 8).map((p) => (
          <motion.div
            key={`mobile-${p.id}`}
            initial={{ opacity: 0 }}
            animate={{ 
              y: ['-10vh', '110vh'],
              opacity: [0, 0.2, 0]
            }}
            transition={{ 
              duration: p.duration * 1.5, 
              repeat: Infinity, 
              delay: p.delay,
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              left: p.left,
              width: p.size * 0.8,
              height: p.size * 0.8,
              borderRadius: '50%',
              backgroundColor: 'var(--particle-color)',
            }}
          />
        ))}
      </div>

      {/* 6. Custom Scan Line (Premium SaaS feel) */}
      <div className="absolute inset-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent top-0 animate-scan-line pointer-events-none opacity-[0.2]" />

    </div>
  );
});

export default BackgroundSystem;
