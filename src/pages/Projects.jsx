import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import { Plus, Trash2 } from 'lucide-react';

const TiltCard = ({ project, idx, isEditMode, updateProject, deleteProject }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${mouseXSpring}deg) rotateY(${mouseYSpring}deg)`;

  const handleMouseMove = (e) => {
    if (isEditMode || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(yPct * -15);
    y.set(xPct * 15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", transform: isEditMode ? 'none' : transform }}
      className={`relative w-full h-full rounded-2xl glass p-6 border transition-all duration-300 ${
        isEditMode ? 'border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.15)]' : 'border-white/10 hover:border-accent/50 group cursor-pointer'
      }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {isEditMode && (
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-amber-500/30">
          <span className="text-amber-400 text-xs font-mono font-bold">PROJECT #{idx + 1}</span>
          <button
            onClick={() => deleteProject(idx)}
            className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 bg-red-500/10 px-2.5 py-1 rounded border border-red-500/30"
          >
            <Trash2 size={13} /> Delete Project
          </button>
        </div>
      )}

      <div style={{ transform: isEditMode ? 'none' : "translateZ(50px)" }} className="relative h-48 w-full mb-6 rounded-xl overflow-hidden">
        {!isEditMode && <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />}
        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      </div>

      {isEditMode && (
        <div className="mb-4 space-y-2">
          <label className="text-xs text-amber-400 font-mono">IMAGE URL:</label>
          <input
            type="text"
            value={project.image}
            onChange={(e) => updateProject(idx, { image: e.target.value })}
            className="w-full bg-slate-800 text-white text-xs px-2.5 py-1.5 rounded border border-amber-500/40"
          />
        </div>
      )}
      
      <div style={{ transform: isEditMode ? 'none' : "translateZ(30px)" }}>
        {isEditMode ? (
          <div className="mb-3 space-y-1">
            <label className="text-xs text-amber-400 font-mono">TITLE:</label>
            <input
              type="text"
              value={project.title}
              onChange={(e) => updateProject(idx, { title: e.target.value })}
              className="w-full bg-slate-800 text-white font-bold text-lg px-2.5 py-1.5 rounded border border-amber-500/40"
            />
          </div>
        ) : (
          <h3 className="text-2xl font-bold text-white mb-3 font-display drop-shadow-md">{project.title}</h3>
        )}

        {isEditMode ? (
          <div className="mb-3 space-y-1">
            <label className="text-xs text-amber-400 font-mono">DESCRIPTION:</label>
            <textarea
              value={project.description}
              onChange={(e) => updateProject(idx, { description: e.target.value })}
              rows="3"
              className="w-full bg-slate-800 text-gray-300 text-xs px-2.5 py-1.5 rounded border border-amber-500/40"
            />
          </div>
        ) : (
          <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>
        )}
        
        {isEditMode ? (
          <div className="mb-4 space-y-1">
            <label className="text-xs text-amber-400 font-mono">TECH STACK (comma separated):</label>
            <input
              type="text"
              value={project.tech ? project.tech.join(', ') : ''}
              onChange={(e) => updateProject(idx, { tech: e.target.value.split(',').map(s => s.trim()) })}
              className="w-full bg-slate-800 text-accent text-xs px-2.5 py-1.5 rounded border border-amber-500/40"
            />
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t, i) => (
              <span key={i} className="text-xs font-semibold px-3 py-1 bg-white/5 text-accent rounded-full border border-white/5">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div style={{ transform: isEditMode ? 'none' : "translateZ(40px)" }} className="flex flex-col gap-2 pt-4 border-t border-white/10 mt-auto">
        {isEditMode ? (
          <div className="space-y-2">
            <div>
              <label className="text-xs text-amber-400 font-mono">GITHUB LINK:</label>
              <input
                type="text"
                value={project.github}
                onChange={(e) => updateProject(idx, { github: e.target.value })}
                className="w-full bg-slate-800 text-white text-xs px-2 py-1 rounded border border-amber-500/40"
              />
            </div>
            <div>
              <label className="text-xs text-amber-400 font-mono">LIVE DEMO LINK:</label>
              <input
                type="text"
                value={project.live}
                onChange={(e) => updateProject(idx, { live: e.target.value })}
                className="w-full bg-slate-800 text-accent text-xs px-2 py-1 rounded border border-amber-500/40"
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center w-full">
            <a href={project.github} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
              <FaGithub size={18} /> Source Code
            </a>
            <a href={project.live} className="flex items-center gap-2 text-sm text-accent hover:text-white transition-colors group/link">
              Live Demo <FaExternalLinkAlt size={18} className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { data, isEditMode, updateProject, addProject, deleteProject } = usePortfolio();

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] py-20 relative perspective-[1000px]">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-4">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </div>
        <div className="w-24 h-1 bg-accent mx-auto rounded-full glow-border"></div>
        <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
          A selection of my best works. Hover over the cards to experience interactive 3D elements.
        </p>

        {isEditMode && (
          <div className="mt-6">
            <button
              onClick={addProject}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all"
            >
              <Plus size={18} /> Add New Project Card
            </button>
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.projects.map((project, idx) => (
          <TiltCard
            key={idx}
            idx={idx}
            project={project}
            isEditMode={isEditMode}
            updateProject={updateProject}
            deleteProject={deleteProject}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
