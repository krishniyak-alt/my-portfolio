import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState(null); // 'success', 'error', 'loading', null

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('loading');

    // Replace these heavily with actual EmailJS keys when putting into production
    // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
    setTimeout(() => {
      setStatus('success');
      e.target.reset();
      setTimeout(() => setStatus(null), 5000);
    }, 1500); // Simulated delay for demo
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] py-20 flex flex-col items-center justify-center relative">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
          Get In <span className="text-gradient">Touch</span>
        </h2>
        <div className="w-24 h-1 bg-accent mx-auto rounded-full glow-border"></div>
        <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
          Have an exciting project you need help with? Send me an email or contact me via instant message!
        </p>
      </motion.div>

      <motion.div 
        className="glass rounded-3xl p-8 md:p-12 max-w-2xl w-full border border-white/10 relative"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {status === 'success' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -top-12 left-0 w-full bg-green-500/20 text-green-400 p-3 rounded-lg border border-green-500/50 flex flex-row items-center justify-center gap-2">
            <CheckCircle size={20} /> Message sent successfully! I will get back to you shortly.
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -top-12 left-0 w-full bg-red-500/20 text-red-400 p-3 rounded-lg border border-red-500/50 flex flex-row items-center justify-center gap-2">
            <AlertCircle size={20} /> Failed to send message. Please try again.
          </motion.div>
        )}

        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-300 ml-1">Your Name</label>
              <input 
                type="text" 
                name="user_name" 
                required 
                className="w-full bg-primary/50 text-white rounded-xl px-4 py-3 outline-none border border-white/10 focus:border-accent transition-colors duration-300"
                placeholder="Krishniya k"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-300 ml-1">Your Email</label>
              <input 
                type="email" 
                name="user_email" 
                required 
                className="w-full bg-primary/50 text-white rounded-xl px-4 py-3 outline-none border border-white/10 focus:border-accent transition-colors duration-300"
                placeholder="kkirithisrik@gmail.com"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-300 ml-1">Message</label>
            <textarea 
              name="message" 
              required 
              rows="5"
              className="w-full bg-primary/50 text-white rounded-xl px-4 py-3 outline-none border border-white/10 focus:border-accent transition-colors duration-300 resize-none"
              placeholder="Hi there, I wanted to ask about..."
            ></textarea>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-accent hover:bg-sky-400 text-primary font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] transition-all duration-300 disabled:opacity-70"
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
            {!status && <Send size={20} />}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
