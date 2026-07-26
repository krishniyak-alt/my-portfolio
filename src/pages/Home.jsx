import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroCanvas from '../components/HeroCanvas';
import { ArrowRight, Mail } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Home = () => {
  const { data, isEditMode, updateHome } = usePortfolio();
  const { home } = data;

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col-reverse md:flex-row items-center justify-center relative">
      {/* Left side: Text content */}
      <div className="w-full md:w-1/2 flex flex-col z-10 pt-10 md:pt-0 pb-20 md:pb-0 px-4 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {isEditMode ? (
            <input
              type="text"
              value={home.greeting}
              onChange={(e) => updateHome({ greeting: e.target.value })}
              className="text-accent font-semibold tracking-wide uppercase mb-3 bg-slate-800/80 px-3 py-1 rounded border border-amber-500/40 w-full"
            />
          ) : (
            <motion.h2 
              className="text-accent font-semibold tracking-wide uppercase mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {home.greeting}
            </motion.h2>
          )}

          {isEditMode ? (
            <div className="mb-4">
              <label className="text-xs text-amber-400 font-mono">YOUR NAME:</label>
              <input
                type="text"
                value={home.name}
                onChange={(e) => updateHome({ name: e.target.value })}
                className="text-3xl font-bold bg-slate-800/80 text-white px-3 py-2 rounded border border-amber-500/40 w-full"
              />
            </div>
          ) : (
            <motion.h1 
              className="text-5xl md:text-7xl font-bold font-display text-white mb-4 leading-tight"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Hi, I'm <br />
              <span className="text-gradient">{home.name}</span>
            </motion.h1>
          )}

          {isEditMode ? (
            <div className="mb-4">
              <label className="text-xs text-amber-400 font-mono">YOUR TITLE / SUBTITLE:</label>
              <input
                type="text"
                value={home.subtitle}
                onChange={(e) => updateHome({ subtitle: e.target.value })}
                className="text-xl font-medium bg-slate-800/80 text-gray-200 px-3 py-2 rounded border border-amber-500/40 w-full"
              />
            </div>
          ) : (
            <motion.h3 
              className="text-2xl md:text-3xl text-gray-300 font-medium mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {home.subtitle}
            </motion.h3>
          )}

          {isEditMode ? (
            <div className="mb-6">
              <label className="text-xs text-amber-400 font-mono">BIO DESCRIPTION:</label>
              <textarea
                value={home.bio}
                onChange={(e) => updateHome({ bio: e.target.value })}
                rows="3"
                className="bg-slate-800/80 text-gray-300 px-3 py-2 rounded border border-amber-500/40 w-full text-base"
              />
            </div>
          ) : (
            <motion.p 
              className="text-gray-400 max-w-lg mb-10 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {home.bio}
            </motion.p>
          )}
          
          <motion.div 
            className="flex flex-wrap gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <Link to="/projects">
              <button className="flex items-center gap-2 bg-accent/90 hover:bg-accent text-slate-950 px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] hover:-translate-y-1">
                {home.primaryBtnText || 'View Projects'}
                <ArrowRight size={20} />
              </button>
            </Link>
            
            <Link to="/contact">
              <button className="flex items-center gap-2 glass px-8 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 glow-border">
                {home.secondaryBtnText || 'Contact Me'}
                <Mail size={20} />
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Right side: 3D Canvas */}
      <motion.div 
        className="w-full md:w-1/2 h-[50vh] md:h-[calc(100vh-4rem)] relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <HeroCanvas />
      </motion.div>
    </div>
  );
};

export default Home;
