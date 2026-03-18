import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FaLinkedinIn, FaGithub, FaYoutube } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const SocialSidebar = () => {
  const { theme } = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const heroSection = document.getElementById('home');
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2, // Show when at least 20% of hero is visible
      }
    );

    observer.observe(heroSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  const socialLinks = [
    {
      id: 1,
      name: 'LinkedIn',
      icon: <FaLinkedinIn size={20} />,
      url: 'https://www.linkedin.com/in/vedant-patel-3b6a4636a/',
      color: 'group-hover:text-white',
      bgHover: 'focus:ring-[#0077b5] group-hover:bg-[#0077b5]',
      shadowHover: 'group-hover:shadow-[0_0_20px_rgba(0,119,181,0.6)]',
    },
    {
      id: 2,
      name: 'GitHub',
      icon: <FaGithub size={20} />,
      url: 'https://github.com/vedantxy',
      color: theme === 'dark' ? 'group-hover:text-black' : 'group-hover:text-white',
      bgHover: theme === 'dark' ? 'focus:ring-white group-hover:bg-white' : 'focus:ring-black group-hover:bg-black',
      shadowHover: theme === 'dark' ? 'group-hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]' : 'group-hover:shadow-[0_0_20px_rgba(0,0,0,0.6)]',
    },
    {
      id: 3,
      name: 'LeetCode',
      icon: <SiLeetcode size={20} />,
      url: 'https://leetcode.com/u/Vedant_2403/',
      color: 'group-hover:text-white',
      bgHover: 'focus:ring-[#ffa116] group-hover:bg-[#ffa116]',
      shadowHover: 'group-hover:shadow-[0_0_20px_rgba(255,161,22,0.6)]',
    },
    {
      id: 4,
      name: 'YouTube',
      icon: <FaYoutube size={20} />,
      url: 'https://www.youtube.com/@VedantPatel-y7k',
      color: 'group-hover:text-white',
      bgHover: 'focus:ring-[#ff0000] group-hover:bg-[#ff0000]',
      shadowHover: 'group-hover:shadow-[0_0_20px_rgba(255,0,0,0.6)]',
    },
  ];

  return (
    <div 
      className={`fixed left-2 sm:left-6 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-4 sm:gap-8 group/sidebar perspective-1000 transition-all duration-500 ${
        isVisible ? 'opacity-100 pointer-events-auto translate-x-0' : 'opacity-0 pointer-events-none -translate-x-10'
      }`}
    >
      {socialLinks.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            group flex items-center gap-3
            p-2 sm:p-3 rounded-full 
            w-[40px] sm:w-[48px] lg:hover:w-[130px]
            transition-all duration-300 ease-in-out overflow-hidden
            ${theme === 'dark' ? 'bg-[#2a2a2a]/80 text-[#aed9e0]/80 shadow-[#b8f2e6]/5 border-white/10' 
              : 'bg-white/80 text-[#5e6472]/80 shadow-black/5 border-black/5'}
            backdrop-blur-md border shadow-lg origin-left hover:-translate-y-1
            ${link.bgHover} ${link.color} ${link.shadowHover} relative
          `}
          aria-label={link.name}
          title={link.name}
        >
          {/* Tooltip Content inside the button */}
          <div className="flex-shrink-0 flex items-center justify-center relative w-[24px] h-[24px]">
            {link.icon}
          </div>
          <span className="font-semibold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 flex-shrink-0">
            {link.name}
          </span>
        </a>
      ))}
    </div>
  );
};

export default SocialSidebar;
