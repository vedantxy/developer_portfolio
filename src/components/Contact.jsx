import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'motion/react';
import { useContext, useState, useEffect, useRef } from 'react';
import ReactGA from 'react-ga4';
import { ThemeContext } from '../context/ThemeContext';
import {
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';
import './Contact.css';

// Simple input sanitization function
const sanitizeInput = (input) => {
  return input.replace(/[<>&"']/g, '').trim();
};

// Email format validation
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
  const { theme = 'light', isTransitioning } = useContext(ThemeContext);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const validateForm = () => {
    if (!formData.from_name.trim()) return false;
    if (!formData.from_email.trim() || !isValidEmail(formData.from_email)) return false;
    if (!formData.message.trim()) return false;
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setToast({ type: 'error', message: 'Please fill in all fields correctly.' });
      return;
    }

    setIsLoading(true);

    const isEmailJSConfigured = 
      import.meta.env.VITE_EMAILJS_SERVICE_ID && 
      import.meta.env.VITE_EMAILJS_SERVICE_ID !== 'your_service_id_here' &&
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID && 
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID !== 'your_template_id_here' &&
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY && 
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY !== 'your_public_key_here';

    if (!isEmailJSConfigured) {
      setIsLoading(false);
      setToast({ type: 'error', message: 'Setup Required: EmailJS keys are missing in the Environment Variables.' });
      return;
    }

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setIsLoading(false);
          setFormData({ from_name: '', from_email: '', message: '' });
          setToast({ type: 'success', message: 'Message sent successfully!' });
        },
        (err) => {
          setIsLoading(false);
          console.error('EmailJS Error:', err);
          setToast({ type: 'error', message: 'Failed to send. Please check your EmailJS keys.' });
        }
      );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: FaLinkedinIn, url: 'https://www.linkedin.com/in/vedant-patel-3b6a4636a/', color: '#0077b5' },
    { name: 'GitHub', icon: FaGithub, url: 'https://github.com/vedantxy', color: theme === 'dark' ? '#fff' : '#333' },
    { name: 'Instagram', icon: FaInstagram, url: 'https://www.instagram.com/vedant_5301/?hl=en', color: '#E1306C' },
  ];

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden bg-transparent">
      <div className="contact-grid-overlay" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className={`text-5xl md:text-7xl font-bold mb-4 text-morph ${isTransitioning ? 'text-morph-active' : ''} ${theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#5e6472]'}`}>
            Contact
          </h2>
          <div className={`h-1.5 w-24 mx-auto rounded-full ${theme === 'dark' ? 'bg-[#b8f2e6]' : 'bg-[#aed9e0]'}`} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Info & Cards */}
          <div className="lg:col-span-5 space-y-8">
            <h3 className={`text-3xl font-bold text-morph ${isTransitioning ? 'text-morph-active' : ''} ${theme === 'dark' ? 'text-white' : 'text-[#5e6472]'}`}>
              Get In Touch
            </h3>

            <div className="space-y-4">
              {[
                { label: 'Phone', value: '+91 9875051366', icon: FaPhoneAlt, color: '#b8f2e6' },
                { label: 'Email', value: 'vedantpatelxy12@gmail.com', icon: FaEnvelope, color: '#aed9e0' },
                { label: 'Location', value: 'Gujarat, India', icon: FaMapMarkerAlt, color: '#b8f2e6' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02, x: 10 }}
                  style={{ transitionDelay: `${i * 50}ms` }}
                  className={`contact-card-3d card-theme-animation ${isTransitioning ? 'theme-transition-tilt' : ''}`}
                >
                  <div className={`contact-card-inner glass-card-contact p-6 rounded-2xl flex items-center gap-5 transition-colors duration-500`}>
                    <div className="p-3 rounded-xl bg-white/5" style={{ color: item.color }}>
                      <item.icon size={22} />
                    </div>
                    <div>
                      <p className={`text-xs uppercase tracking-widest opacity-50 mb-1 text-morph ${isTransitioning ? 'text-morph-active' : ''} ${theme === 'dark' ? 'text-white' : 'text-[#5e6472]'}`}>{item.label}</p>
                      <p className={`font-medium text-morph ${isTransitioning ? 'text-morph-active' : ''} ${theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#5e6472]'}`}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Icons Strip */}
            <div className="pt-10">
              <p className={`text-sm font-bold uppercase tracking-widest opacity-40 mb-6 text-morph ${isTransitioning ? 'text-morph-active' : ''} ${theme === 'dark' ? 'text-white' : 'text-[#5e6472]'}`}>Socials</p>
              <div className="flex gap-4">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ 
                      transitionDelay: `${(3 + i) * 50}ms`,
                      color: social.color 
                    }}
                    whileHover={{ scale: 1.2, y: -5 }}
                    className={`p-4 rounded-xl glass-card-contact floating-social-icon transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
                  >
                    <social.icon size={24} />
                  </motion.a>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Modern Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`glass-card-contact p-8 md:p-12 rounded-[2.5rem] relative card-theme-animation ${isTransitioning ? 'theme-transition-tilt' : ''}`}
            >
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`text-sm font-bold opacity-60 ml-2 text-morph ${isTransitioning ? 'text-morph-active' : ''} ${theme === 'dark' ? 'text-white' : 'text-[#5e6472]'}`}>Your Name</label>
                    <input
                      type="text"
                      name="from_name"
                      value={formData.from_name}
                      onChange={handleChange}
                      placeholder="Vedant Patel"
                      className={`w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus-glow-cyan outline-none transition-all ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''} ${theme === 'dark' ? 'text-white placeholder:text-white/50' : 'text-[#5e6472] placeholder:text-[#5e6472]/50'}`}
                      disabled={isTransitioning}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-sm font-bold opacity-60 ml-2 text-morph ${isTransitioning ? 'text-morph-active' : ''} ${theme === 'dark' ? 'text-white' : 'text-[#5e6472]'}`}>Your Email</label>
                    <input
                      type="email"
                      name="from_email"
                      value={formData.from_email}
                      onChange={handleChange}
                      placeholder="vedant@example.com"
                      className={`w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus-glow-cyan outline-none transition-all ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''} ${theme === 'dark' ? 'text-white placeholder:text-white/50' : 'text-[#5e6472] placeholder:text-[#5e6472]/50'}`}
                      disabled={isTransitioning}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={`text-sm font-bold opacity-60 ml-2 text-morph ${isTransitioning ? 'text-morph-active' : ''} ${theme === 'dark' ? 'text-white' : 'text-[#5e6472]'}`}>Message</label>
                  <textarea
                    rows="5"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Let's build something amazing together!"
                    className={`w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus-glow-cyan outline-none transition-all resize-none ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''} ${theme === 'dark' ? 'text-white placeholder:text-white/50' : 'text-[#5e6472] placeholder:text-[#5e6472]/50'}`}
                    disabled={isTransitioning}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isLoading || isTransitioning}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-5 rounded-2xl font-black text-xl tracking-widest uppercase transition-all flex items-center justify-center gap-3 ${theme === 'dark' ? 'bg-[#b8f2e6] text-[#1c1c1c]' : 'bg-[#5e6472] text-[#fff]'
                    } shadow-2xl shadow-cyan-500/20 ${isTransitioning ? 'opacity-50' : ''}`}
                >
                  {isLoading ? 'Sending...' : 'Send Magic'}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-10 right-10 px-8 py-4 rounded-2xl shadow-2xl font-bold z-[100] ${toast.type === 'success' ? 'bg-[#b8f2e6] text-black' : 'bg-red-500 text-white'
              }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Contact;