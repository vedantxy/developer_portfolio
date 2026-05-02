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

      {/* 3. Blur Blobs (Glows) - Optimized with CSS animations for better performance */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top Left - Blue Blob */}
        <div 
          className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full opacity-[0.12] blur-[120px] animate-blob-1 will-change-transform"
          style={{ background: 'var(--blob-blue)' }}
        />
        
        {/* Bottom Right - Purple Blob */}
        <div 
          className="absolute -bottom-[15%] -right-[10%] w-[60vw] h-[60vw] rounded-full opacity-[0.15] blur-[140px] animate-blob-2 will-change-transform"
          style={{ background: 'var(--blob-purple)' }}
        />

        {/* Center - Soft Accent Glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full opacity-[0.05] blur-[160px] animate-pulse-soft"
          style={{ background: 'var(--accent)' }}
        />
      </div>

      {/* 4. Floating Particles Layer (Optimized for performance) */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        {particles.slice(0, 15).map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{ 
              y: ['-10vh', '110vh'],
              x: ['-2vw', '2vw'],
              opacity: [0, 0.2, 0]
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
              willChange: 'transform, opacity'
            }}
          />
        ))}
      </div>

      {/* 5. Mobile Particles (Minimal) */}
      <div className="absolute inset-0 pointer-events-none sm:hidden">
        {particles.slice(0, 5).map((p) => (
          <motion.div
            key={`mobile-${p.id}`}
            initial={{ opacity: 0 }}
            animate={{ 
              y: ['-10vh', '110vh'],
              opacity: [0, 0.15, 0]
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
              width: p.size * 0.7,
              height: p.size * 0.7,
              borderRadius: '50%',
              backgroundColor: 'var(--particle-color)',
              willChange: 'transform, opacity'
            }}
          />
        ))}
      </div>

      {/* 6. Custom Scan Line */}
      <div className="absolute inset-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent top-0 animate-scan-line pointer-events-none opacity-[0.15] will-change-transform" />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blob-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, 50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes blob-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, -60px) scale(1.2); }
        }
        .animate-blob-1 { animation: blob-1 20s infinite ease-in-out; }
        .animate-blob-2 { animation: blob-2 25s infinite ease-in-out; }
      `}} />
    </div>
  );
});

export default BackgroundSystem;
