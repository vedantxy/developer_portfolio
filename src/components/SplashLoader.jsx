import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';
import SignatureSVG from '../assets/VP.svg?react';

gsap.registerPlugin(CSSPlugin);

const SplashLoader = ({ onAnimationComplete }) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const svgElement = svgRef.current;
    const container = containerRef.current;
    if (!svgElement || !container) return;

    const paths = svgElement.querySelectorAll('path, line, polyline, circle, ellipse');
    if (paths.length === 0) return;

    paths.forEach((path) => {
      const length = path.getTotalLength?.();
      if (isNaN(length) || !length) return;
      path.removeAttribute('fill');
      path.removeAttribute('stroke');
      path.removeAttribute('stroke-width');
      path.removeAttribute('stroke-dasharray');
      path.removeAttribute('stroke-dashoffset');
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        fill: 'none',
        stroke: '#00F5FF',
        strokeWidth: 1.5,
      });
    });

    svgElement.querySelectorAll('g').forEach((g) => {
      g.removeAttribute('fill');
      g.style.fill = 'none';
    });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(container, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            setIsMounted(false);
            if (onAnimationComplete) onAnimationComplete();
          },
        });
      },
    });

    tl.to(paths, {
      strokeDashoffset: 0,
      duration: 2.5,
      ease: 'power2.inOut',
      stagger: { each: 0.12, ease: 'power1.inOut' },
    })
    .to(paths, {
      filter: 'drop-shadow(0 0 12px rgba(0, 245, 255, 0.9)) drop-shadow(0 0 30px rgba(0, 245, 255, 0.4))',
      duration: 0.5,
      ease: 'power2.out',
    }, '-=0.4')
    .to({}, { duration: 0.8 });

    return () => tl.kill();
  }, [onAnimationComplete]);

  if (!isMounted) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100vh',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        backgroundColor: '#06141B',
        zIndex: 100000, opacity: 1,
        overflow: 'hidden',
      }}
    >
      {/* Space stars background */}
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            borderRadius: '50%',
            backgroundColor: '#00F5FF',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.6 + 0.2,
            animation: `star-twinkle ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite`,
          }}
        />
      ))}

      {/* Orbital rings */}
      <div style={{
        position: 'absolute',
        width: '400px', height: '400px',
        border: '1px solid rgba(0,245,255,0.15)',
        borderRadius: '50%',
        animation: 'spin-slow 20s linear infinite',
      }} />
      <div style={{
        position: 'absolute',
        width: '300px', height: '300px',
        border: '1px solid rgba(138,43,226,0.2)',
        borderRadius: '50%',
        animation: 'spin-slow 14s linear infinite reverse',
      }} />

      {/* Center glow */}
      <div style={{
        position: 'absolute',
        width: '350px', height: '350px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,245,255,0.08) 0%, transparent 70%)',
        animation: 'float-y-slow 3s ease-in-out infinite',
      }} />

      {/* VP Signature */}
      <SignatureSVG
        ref={svgRef}
        style={{
          width: '280px', height: 'auto',
          stroke: '#00F5FF', fill: 'none',
          strokeWidth: 1.5,
          position: 'relative', zIndex: 1,
          filter: 'drop-shadow(0 0 0px rgba(0,245,255,0))',
        }}
      />

      {/* Loading text */}
      <p style={{
        color: 'rgba(0,245,255,0.5)',
        fontSize: '11px',
        letterSpacing: '0.4em',
        textTransform: 'uppercase',
        marginTop: '32px',
        fontFamily: 'monospace',
        animation: 'typewriter-cursor 1.2s ease infinite',
        position: 'relative', zIndex: 1,
      }}>
        Initializing...
      </p>

      <style>{`
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.5); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes float-y-slow {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes typewriter-cursor {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
};

export default SplashLoader;