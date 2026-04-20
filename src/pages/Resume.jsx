import React from 'react';
import { motion } from 'framer-motion';
import { DownloadCloud, FileText } from 'lucide-react';

const Resume = () => {
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
          My <span className="text-gradient">Resume</span>
        </h2>
        <div className="w-24 h-1 bg-accent mx-auto rounded-full glow-border"></div>
        <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
          Take a look at my detailed experience, education, and past roles.
        </p>
      </motion.div>

      <motion.div 
        className="glass rounded-3xl p-10 max-w-lg w-full text-center border border-accent/20 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Glow effect behind */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-accentGlow blur-[100px] -z-10 rounded-full opacity-20" />
        
        <FileText size={80} className="text-accent mx-auto mb-8 drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]" />
        
        <h3 className="text-2xl font-bold text-white mb-3 font-display">Krishniya k Resume.pdf</h3>
        <p className="text-gray-400 mb-8 text-sm">PDF formatting • 1.2 MB</p>
        
        <motion.a 
          href="/resume.pdf"
          download="My_Resume.pdf"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-full gap-3 bg-accent text-primary py-4 px-8 rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] transition-shadow duration-300"
        >
          <DownloadCloud size={24} />
          Download Resume
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Resume;
