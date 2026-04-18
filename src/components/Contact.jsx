import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import {
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
  FaMapMarkerAlt,
  FaYoutube
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';
import './Contact.css';

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

function Contact() {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: ''
  });
  const formRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.from_name.trim() || !isValidEmail(formData.from_email.trim()) || !formData.message.trim()) {
      setToast({ type: 'error', message: 'Please fill in all fields correctly.' });
      return;
    }

    setIsLoading(true);

    const isEmailJSConfigured = 
      import.meta.env.VITE_EMAILJS_SERVICE_ID && 
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID && 
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!isEmailJSConfigured) {
      setIsLoading(false);
      setToast({ type: 'error', message: 'EmailJS keys are missing in Environment Variables.' });
      return;
    }

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          setIsLoading(false);
          setFormData({ from_name: '', from_email: '', message: '' });
          setToast({ type: 'success', message: 'Message sent successfully!' });
        },
        (err) => {
          setIsLoading(false);
          setToast({ type: 'error', message: 'Failed to send message.' });
        }
      );
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: FaLinkedinIn, url: 'https://www.linkedin.com/in/vedant-patel-3b6a4636a/' },
    { name: 'GitHub', icon: FaGithub, url: 'https://github.com/vedantxy' },
    { name: 'Twitter', icon: FaXTwitter, url: 'https://x.com/VedantPate1601' },
    { name: 'LeetCode', icon: SiLeetcode, url: 'https://leetcode.com/vedant_patel_01/' },
    { name: 'YouTube', icon: FaYoutube, url: '#' },
  ];

  return (
    <section id="contact" className="contact-section pt-16 pb-8 px-6 md:px-12 transition-colors duration-500" style={{ background: 'var(--bg-primary)' }}>
      <div className="contact-grid" />
      <div className="contact-blob top-[-10%] right-[-10%]" />
      <div className="contact-blob bottom-[-10%] left-[-10%]" style={{ background: 'radial-gradient(circle, var(--accent-10) 0%, transparent 70%)' }} />

      <div className="max-w-[1000px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="contact-script text-6xl md:text-7xl mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            Let’s Talk
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-medium tracking-wide text-sm uppercase"
            style={{ color: 'var(--text-muted)' }}
          >
            Any question or remarks? Just write me a message!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div>
              <h3 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Get in touch</h3>
              <p className="leading-[1.8] max-w-md" style={{ color: 'var(--text-secondary)' }}>
                I'm always open to discussing new projects, creative ideas or original opportunities to be part of your visions.
              </p>
            </div>

            <div className="space-y-6">
              <ContactItem 
                icon={<FaEnvelope size={18} />} 
                label="Email" 
                value="vedantpatelxy12@gmail.com" 
              />
              <ContactItem 
                icon={<FaMapMarkerAlt size={18} />} 
                label="Location" 
                value="Gujarat, India" 
              />
            </div>
          </motion.div>

          {/* Right Column: Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-10 rounded-[2rem] border transition-all duration-500"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', boxShadow: 'var(--glow)' }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold ml-1" style={{ color: 'var(--text-muted)' }}>Name</label>
                <input
                  type="text"
                  name="from_name"
                  value={formData.from_name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="contact-form-input w-full rounded-xl px-5 py-3.5 outline-none transition-all placeholder:text-slate-400"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-bold ml-1" style={{ color: 'var(--text-muted)' }}>Email</label>
                <input
                  type="email"
                  name="from_email"
                  value={formData.from_email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="contact-form-input w-full rounded-xl px-5 py-3.5 outline-none transition-all placeholder:text-slate-400"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-bold ml-1" style={{ color: 'var(--text-muted)' }}>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="What's on your mind?"
                  className="contact-form-input w-full rounded-xl px-5 py-3.5 outline-none transition-all resize-none placeholder:text-slate-400"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                />
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full text-white py-4 rounded-xl font-bold tracking-wide transition-all flex items-center justify-center gap-2"
                style={{ background: 'var(--accent)', boxShadow: 'var(--glow)' }}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

        </div>

        {/* Footer Area */}
        <div className="mt-16 pt-8 border-t text-center" style={{ borderColor: 'var(--border)' }}>

          <p className="contact-script text-[20px] md:text-[24px] mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            "I'm Vedant — not just a developer, but a builder, a thinker, and a curious learner. Thanks for flipping through my pages."
          </p>
          
          <div className="flex justify-center gap-5 mb-6">
            {socialLinks.map((social) => (
              <a 
                key={social.name} 
                href={social.url} 
                target="_blank" 
                rel="noreferrer"
                className="social-icon-btn transition-all duration-300"
                style={{ color: 'var(--text-muted)' }}
                aria-label={social.name}
              >
                <social.icon size={28} />
              </a>
            ))}
          </div>

          <p className="text-[12px] tracking-widest" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Vedant Patel. All rights reserved.
          </p>
        </div>

      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-10 left-1/2 -translate-x-1/2 px-8 py-4 rounded-2xl shadow-2xl font-bold z-[100] ${toast.type === 'success' ? 'bg-[#6b85a6] text-white' : 'bg-red-500 text-white'}`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ContactItem({ icon, label, value }) {
  return (
    <div className="contact-info-item flex items-center gap-5 group cursor-default">
      <div className="contact-info-circle text-slate-500 group-hover:text-slate-800">
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">{label}</p>
        <p className="text-slate-700 font-medium">{value}</p>
      </div>
    </div>
  );
}

export default Contact;