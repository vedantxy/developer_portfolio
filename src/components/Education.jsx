import React, { useContext, memo } from 'react';
import { motion } from 'motion/react';
import { ThemeContext } from '../context/ThemeContext';
import './Education.css';

const Education = memo(() => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <section id="education" className="education-section py-20 md:py-32 px-6 overflow-hidden">
      <div className="max-w-[1280px] mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="edu-script text-6xl mb-2 header-blue-grey"
          >
            Education
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[17px] mb-6 tracking-wide subtitle-blue-grey"
          >
            My academic journey and achievements
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold edu-sans"
            style={{ color: 'var(--edu-text-primary)' }}
          >
            Academic Background
          </motion.h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-10 md:gap-16 items-start">
          
          {/* Left Column: Main Cards */}
          <div className="space-y-8">
            
            {/* BTech Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="edu-main-card rounded-3xl p-8 md:p-10 shadow-sm relative overflow-hidden"
              style={{ background: 'var(--edu-card-bg)' }}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--edu-text-primary)' }}>
                    BTech in Computer Science
                  </h3>
                  <p className="font-medium" style={{ color: 'var(--edu-text-secondary)' }}>
                    Swaminarayan University
                  </p>
                  <p className="text-sm mt-1" style={{ color: 'var(--edu-text-muted)' }}>
                    2025 – Present
                  </p>
                </div>
                <span className="px-4 py-1.5 text-xs font-bold rounded-full uppercase tracking-wider" style={{ background: 'var(--edu-bg)', color: 'var(--edu-text-secondary)' }}>
                  Current
                </span>
              </div>

              <div className="space-y-6">
                <p className="text-lg font-semibold" style={{ color: 'var(--edu-text-primary)' }}>
                  1st Year, CGPA 9.48
                </p>
                
                <div className="space-y-4">
                  <p className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--edu-text-primary)' }}>Highlights</p>
                  <ul className="space-y-3">
                    {['Core Subjects: React, AngularJS, DBMS, DSA', 'Class Representative', 'Hackathon Participant'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-[15px]" style={{ color: 'var(--edu-text-secondary)' }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--edu-text-muted)' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* HSC Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="edu-main-card rounded-3xl p-8 md:p-10 shadow-sm relative overflow-hidden"
              style={{ background: 'var(--edu-card-bg)' }}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--edu-text-primary)' }}>
                    Higher Secondary Education
                  </h3>
                  <p className="font-medium" style={{ color: 'var(--edu-text-secondary)' }}>
                    B.M High Schools
                  </p>
                  <p className="text-sm mt-1" style={{ color: 'var(--edu-text-muted)' }}>
                    2023 – 2025
                  </p>
                </div>
                <span className="px-4 py-1.5 text-xs font-bold rounded-full uppercase tracking-wider" style={{ background: 'var(--edu-bg)', color: 'var(--edu-text-secondary)' }}>
                  Completed
                </span>
              </div>

              <div className="space-y-6">
                <p className="leading-relaxed text-[15px]" style={{ color: 'var(--edu-text-secondary)' }}>
                  Completed Higher Secondary Certificate (HSC) with a focus on Science stream, building a strong foundation in Mathematics and Computer Science. Gained fundamental knowledge of programming and problem-solving techniques. Developed analytical and logical thinking skills through coursework and practical exercises. Engaged in Artificial Intelligence and Machine Learning. Prepared for advanced studies in Computer Science and emerging technologies.
                </p>
                
                <div className="space-y-4">
                  <p className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--edu-text-primary)' }}>Highlights</p>
                  <ul className="space-y-3">
                    {['JEE Mains: 85 PR', 'Board Examinations: 82.85%'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-[15px]" style={{ color: 'var(--edu-text-secondary)' }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--edu-text-muted)' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Side Info Cards */}
          <div className="flex flex-col gap-6 md:gap-8">
            
            {/* Academic Record Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="edu-side-card rounded-3xl p-6 md:p-8 shadow-sm"
              style={{ background: 'var(--edu-card-bg)' }}
            >
              <h4 className="edu-script text-2xl mb-6" style={{ color: 'var(--edu-text-primary)' }}>Academic Record</h4>
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <p className="text-sm font-medium" style={{ color: 'var(--edu-text-secondary)' }}>Current CGPA</p>
                  <p className="text-lg font-black" style={{ color: 'var(--edu-text-primary)' }}>9.48/10</p>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--edu-bg)' }}>
                  <div className="edu-progress-fill h-full rounded-full" style={{ background: 'var(--edu-accent)', opacity: 0.6 }} />
                </div>
                <div className="space-y-4 pt-2">
                  {[
                    { label: 'Academic Year', value: '1st Year' },
                    { label: 'Projects Completed', value: '6+' },
                    { label: 'Specialization', value: 'Computer Science', isBold: true }
                  ].map((stat, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <p style={{ color: 'var(--edu-text-secondary)' }}>{stat.label}</p>
                      <p className={`${stat.isBold ? 'font-black' : 'font-semibold'}`} style={{ color: 'var(--edu-text-primary)' }}>{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Core Subjects Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="edu-side-card rounded-3xl p-6 md:p-8 shadow-sm"
              style={{ background: 'var(--edu-card-bg)' }}
            >
              <h4 className="edu-script text-2xl mb-6" style={{ color: 'var(--edu-text-primary)' }}>Core Subjects</h4>
              <div className="space-y-4">
                {[
                  { name: 'React Development', tag: 'Frontend' },
                  { name: 'AngularJS', tag: 'Framework' },
                  { name: 'Database Management', tag: 'DBMS' },
                  { name: 'Data Structures', tag: 'DSA' }
                ].map((subject, i) => (
                  <div key={i} className="flex justify-between items-center p-3 rounded-xl" style={{ background: 'var(--edu-bg)' }}>
                    <p className="text-sm font-medium" style={{ color: 'var(--edu-text-secondary)' }}>{subject.name}</p>
                    <span className="text-[10px] font-black uppercase tracking-tighter px-2 py-1 rounded-md border shadow-sm" style={{ background: 'var(--edu-card-bg)', color: 'var(--edu-text-muted)', borderColor: 'var(--edu-grid)' }}>
                      {subject.tag}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Achievements Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="edu-side-card rounded-3xl p-6 md:p-8 shadow-sm"
              style={{ background: 'var(--edu-card-bg)' }}
            >
              <h4 className="edu-script text-2xl mb-6" style={{ color: 'var(--edu-text-primary)' }}>Achievements</h4>
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-bold mb-1" style={{ color: 'var(--edu-text-primary)' }}>JEE Mains</p>
                  <p className="text-xs" style={{ color: 'var(--edu-text-muted)' }}>85 Percentile</p>
                </div>
                <div>
                  <p className="text-sm font-bold mb-1" style={{ color: 'var(--edu-text-primary)' }}>Board Examinations</p>
                  <p className="text-xs" style={{ color: 'var(--edu-text-muted)' }}>82.85% Grade</p>
                </div>
                <div>
                  <p className="text-sm font-bold mb-1" style={{ color: 'var(--edu-text-primary)' }}>Leadership Role</p>
                  <p className="text-xs" style={{ color: 'var(--edu-text-muted)' }}>Class Representative</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

});

export default Education;
