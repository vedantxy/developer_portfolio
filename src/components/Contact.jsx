import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, Send, Github, Linkedin, Twitter, Youtube } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

function Contact() {
  const [formData, setFormData] = useState({ from_name: '', from_email: '', message: '' });
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
      setToast({ type: 'error', message: 'EmailJS keys are missing.' });
      return;
    }

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formRef.current,
      { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
    ).then(() => {
      setIsLoading(false);
      setFormData({ from_name: '', from_email: '', message: '' });
      setToast({ type: 'success', message: 'Message sent successfully!' });
    }, () => {
      setIsLoading(false);
      setToast({ type: 'error', message: 'Failed to send message.' });
    });
  };

  return (
    <section id="contact" className="py-20 md:py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden bg-transparent">
      <div className="max-w-[1100px] mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 text-center lg:text-left">
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
           >
              <span className="text-[11px] font-black tracking-[0.3em] uppercase opacity-40" style={{ color: 'var(--text-primary)' }}>
                Connect
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none" style={{ color: 'var(--text-primary)' }}>
                Let&apos;s start a conversation.
              </h2>
           </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Side: Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <p className="text-lg font-medium leading-relaxed mb-12 opacity-70 max-w-md" style={{ color: 'var(--text-primary)' }}>
              I&apos;m always looking for new opportunities and interesting projects. Whether you have a question or just want to say hi, I&apos;ll do my best to get back to you!
            </p>

            <div className="space-y-8 mb-12">
               <ContactInfoItem icon={<Mail size={20} />} label="Email" value="vedantpatelxy12@gmail.com" />
               <ContactInfoItem icon={<MapPin size={20} />} label="Location" value="Gujarat, India" />
            </div>

            <div className="mt-auto">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 block mb-6" style={{ color: 'var(--text-primary)' }}>
                Social Channels
              </span>
              <div className="flex gap-4">
                 <SocialBtn icon={<Linkedin size={20} />} url="https://www.linkedin.com/in/vedant-patel-3b6a4636a/" />
                 <SocialBtn icon={<Github size={20} />} url="https://github.com/vedantxy" />
                 <SocialBtn icon={<Youtube size={20} />} url="https://www.youtube.com/@VedantPatel-y7k" />
                 <SocialBtn icon={<Twitter size={20} />} url="https://x.com/VedantPate1601" />
                 <SocialBtn icon={<SiLeetcode size={20} />} url="https://leetcode.com/u/Vedant_2403/" />
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 md:p-10 rounded-[2.5rem] border border-[var(--border)] bg-[var(--bg-card)] shadow-2xl relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-[2.5rem] pointer-events-none" />
            
            <form ref={formRef} onSubmit={handleSubmit} className="relative z-10 space-y-8">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: 'var(--text-secondary)' }}>Your Name</label>
                <input
                  type="text"
                  name="from_name"
                  value={formData.from_name}
                  onChange={handleChange}
                  placeholder="Vedant Patel"
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:border-indigo-500/50 focus:bg-[var(--bg-card)] transition-all placeholder:text-[var(--text-muted)] placeholder:opacity-60"
                  style={{ color: 'var(--text-primary)' }}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: 'var(--text-secondary)' }}>Email Address</label>
                <input
                  type="email"
                  name="from_email"
                  value={formData.from_email}
                  onChange={handleChange}
                  placeholder="hello@example.com"
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:border-indigo-500/50 focus:bg-[var(--bg-card)] transition-all placeholder:text-[var(--text-muted)] placeholder:opacity-60"
                  style={{ color: 'var(--text-primary)' }}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: 'var(--text-secondary)' }}>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="How can I help you?"
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:border-indigo-500/50 focus:bg-[var(--bg-card)] transition-all resize-none placeholder:text-[var(--text-muted)] placeholder:opacity-60"
                  style={{ color: 'var(--text-primary)' }}
                />
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 rounded-2xl bg-indigo-600 text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isLoading ? 'Sending...' : (
                  <>
                    Send Message
                    <Send size={14} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className={`fixed bottom-10 left-1/2 px-8 py-4 rounded-2xl shadow-2xl font-bold z-[100] ${toast.type === 'success' ? 'bg-indigo-600 text-white' : 'bg-red-500 text-white'}`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ContactInfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-5 group">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[var(--bg-secondary)] border border-[var(--border)] text-indigo-500 dark:text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40" style={{ color: 'var(--text-primary)' }}>{label}</span>
        <span className="text-base font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>{value}</span>
      </div>
    </div>
  );
}

function SocialBtn({ icon, url }) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -5, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-300"
    >
      {icon}
    </motion.a>
  );
}

export default Contact;