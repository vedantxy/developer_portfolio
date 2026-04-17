import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// ── Phase 1: Minimal Loader ──
const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-6"
    >
      <div className="w-full max-w-[200px] space-y-4 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400"
        >
          Loading Experience
        </motion.p>
        <div className="h-[1px] w-full bg-slate-100 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-slate-900"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};

// ── Phase 2: Name Reveal ──
const IdentityReveal = ({ onComplete }) => {
  const name = "Vedant Patel";
  const role = "Full Stack Developer";

  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
    >
      <div className="text-center space-y-6">
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter"
          >
            {name}
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm md:text-lg font-bold text-slate-400 uppercase tracking-[0.5em]"
          >
            {role}
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 1.2, ease: "circOut" }}
          className="h-px w-24 mx-auto bg-slate-900/10 origin-center"
        />
      </div>

      {/* Subtle background "V" watermark */}
      <motion.span 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.03, scale: 1 }}
        className="absolute inset-0 flex items-center justify-center text-[40vw] font-black pointer-events-none text-slate-900"
      >
        V
      </motion.span>
    </motion.div>
  );
};

const EntrySequence = ({ children }) => {
  const [phase, setPhase] = useState('loading'); // loading | reveal | finished

  if (phase === 'finished') return <>{children}</>;

  return (
    <div className="fixed inset-0 z-[1000] bg-white">
      <AnimatePresence mode="wait">
        {phase === 'loading' && (
          <Loader key="loader" onComplete={() => setPhase('reveal')} />
        )}
        {phase === 'reveal' && (
          <IdentityReveal key="reveal" onComplete={() => setPhase('finished')} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EntrySequence;
