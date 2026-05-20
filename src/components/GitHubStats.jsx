import { useContext } from 'react';
import { motion } from 'motion/react';
import { ThemeContext } from '../context/ThemeContext';
import { Github, Star, GitFork, Eye, Code2, Users } from 'lucide-react';

const GITHUB_USERNAME = 'vedantxy';

const PINNED_REPOS = [
  { name: 'cleanPulse',                  desc: 'Smart AI waste management MERN app',     stars: 0, forks: 0, lang: 'JavaScript', color: '#f1e05a' },
  { name: 'ArtPark_CodeForge_Hackathon', desc: 'AI-powered career tools — Hackathon',    stars: 0, forks: 0, lang: 'JavaScript', color: '#f1e05a' },
  { name: 'css-clone-by-vedant-patel',   desc: '10+ frontend clone projects in HTML/CSS',stars: 0, forks: 0, lang: 'CSS',        color: '#563d7c' },
  { name: 'portfolio',                   desc: 'Anti-gravity 3D React portfolio',         stars: 0, forks: 0, lang: 'JSX',        color: '#61dafb' },
];

const STAT_CARDS = [
  { label: 'Public Repos', icon: Code2,  value: '10+', color: '#00F5FF' },
  { label: 'GitHub Stars', icon: Star,   value: '5+',  color: '#FFD700' },
  { label: 'Forks',        icon: GitFork,value: '2+',  color: '#8A2BE2' },
  { label: 'Followers',    icon: Users,  value: '10+', color: '#00EA64' },
];

function GitHubStats() {
  const { isTransitioning } = useContext(ThemeContext);

  return (
    <section id="github" className="py-24 px-6 relative overflow-hidden" style={{ background: 'transparent' }}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1,1.3,1], x:[0,-60,0], y:[0,40,0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute top-10 right-10 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: 'var(--accent-2)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <Github size={36} style={{ color: 'var(--text-primary)' }} />
            <h2
              className={`text-5xl md:text-6xl font-bold text-morph ${isTransitioning ? 'text-morph-active' : ''}`}
              style={{ color: 'var(--text-primary)' }}
            >
              GitHub Stats
            </h2>
          </div>
          <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
            Code is my craft — here&apos;s a snapshot of what I build.
          </p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '6rem' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1.5 rounded-full"
            style={{ background: 'var(--accent-1)' }}
          />
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-14">
          {STAT_CARDS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.04 }}
                className={`glass-card space-card p-6 rounded-2xl text-center card-theme-animation float-card-slow ${isTransitioning ? 'theme-transition-tilt' : ''}`}
                style={{ animationDelay: `${idx * 0.5}s` }}
              >
                <motion.div
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: idx * 0.5 }}
                  className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center"
                  style={{ background: `${stat.color}15` }}
                >
                  <Icon size={22} style={{ color: stat.color }} />
                </motion.div>
                <p className="text-3xl font-black mb-1" style={{ color: stat.color }}>
                  {stat.value}
                </p>
                <p className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* GitHub Streak Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row gap-6 mb-14 items-center justify-center"
        >
          <div
            className="glass-card rounded-2xl p-4 overflow-hidden"
            style={{ maxWidth: '500px', width: '100%' }}
          >
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=transparent&title_color=00F5FF&text_color=9BA8AB&icon_color=00F5FF&border_color=4A5C6A&hide_border=false`}
              alt="GitHub Stats"
              className="w-full rounded-xl"
              loading="lazy"
            />
          </div>
          <div
            className="glass-card rounded-2xl p-4 overflow-hidden"
            style={{ maxWidth: '500px', width: '100%' }}
          >
            <img
              src={`https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&theme=dark&hide_border=true&stroke=00F5FF&ring=00F5FF&fire=FF00FF&currStreakLabel=CCD0CF&background=11212D`}
              alt="GitHub Streak"
              className="w-full rounded-xl"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Pinned Repos */}
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl font-bold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Featured Repositories
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PINNED_REPOS.map((repo, idx) => (
            <motion.a
              key={repo.name}
              href={`https://github.com/${GITHUB_USERNAME}/${repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`glass-card space-card p-6 rounded-2xl block card-theme-animation ${isTransitioning ? 'theme-transition-tilt' : ''}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Github size={18} style={{ color: 'var(--accent-1)' }} />
                  <span className="font-bold truncate" style={{ color: 'var(--accent-1)', maxWidth: '220px' }}>
                    {repo.name}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <span className="flex items-center gap-1"><Star size={13} />{repo.stars}</span>
                  <span className="flex items-center gap-1"><GitFork size={13} />{repo.forks}</span>
                </div>
              </div>
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>{repo.desc}</p>
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: repo.color }}
                />
                <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                  {repo.lang}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <motion.a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4, scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-sm transition-all"
            style={{
              background: 'var(--accent-1-10)',
              border: '1px solid var(--border-glow)',
              color: 'var(--accent-1)',
            }}
          >
            <Github size={18} />
            View All on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default GitHubStats;
