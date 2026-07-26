import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import { Plus, Trash2, X, Image as ImageIcon, Sparkles, FolderPlus } from 'lucide-react';

const presetImages = [
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1639762681485-074b7f4ec651?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
];

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
      <div className="flex justify-between items-center mb-3">
        <span className="text-accent text-xs font-mono font-bold">PROJECT #{idx + 1}</span>
        <button
          onClick={() => deleteProject(idx)}
          className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/30 px-2.5 py-1 rounded-lg border border-red-500/30 transition-colors"
          title="Delete this project"
        >
          <Trash2 size={13} /> Delete
        </button>
      </div>

      <div style={{ transform: isEditMode ? 'none' : "translateZ(50px)" }} className="relative h-48 w-full mb-6 rounded-xl overflow-hidden">
        {!isEditMode && <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />}
        <img src={project.image || presetImages[0]} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      </div>

      {isEditMode && (
        <div className="mb-4 space-y-1">
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
            {project.tech && project.tech.map((t, i) => (
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
            <a href={project.github || '#'} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
              <FaGithub size={18} /> Source Code
            </a>
            <a href={project.live || '#'} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-accent hover:text-white transition-colors group/link">
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
  const [showModal, setShowModal] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTech, setNewTech] = useState('');
  const [newGithub, setNewGithub] = useState('');
  const [newLive, setNewLive] = useState('');
  const [newImage, setNewImage] = useState(presetImages[0]);

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addProject({
      title: newTitle.trim(),
      description: newDesc.trim() || 'A modern web project built with React and cutting-edge tech.',
      tech: newTech.trim() ? newTech.split(',').map(s => s.trim()) : ['React', 'JavaScript'],
      github: newGithub.trim() || '#',
      live: newLive.trim() || '#',
      image: newImage || presetImages[0]
    });

    // Reset Form
    setNewTitle('');
    setNewDesc('');
    setNewTech('');
    setNewGithub('');
    setNewLive('');
    setShowModal(false);
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] py-20 relative perspective-[1000px]">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
          Featured <span className="text-gradient">Projects</span>
        </h2>
        <div className="w-24 h-1 bg-accent mx-auto rounded-full glow-border"></div>
        <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
          Explore my latest projects and applications. Click below to add your own projects directly to your live website!
        </p>

        {/* Add Project Button */}
        <div className="mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-slate-950 font-bold px-8 py-3.5 rounded-full shadow-[0_0_30px_rgba(56,189,248,0.5)] hover:shadow-[0_0_40px_rgba(56,189,248,0.8)] transition-all duration-300"
          >
            <FolderPlus size={20} />
            + Add Your Project
          </motion.button>
        </div>
      </motion.div>

      {/* Projects Grid or Empty State */}
      {data.projects.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-12 text-center max-w-xl mx-auto border border-white/10"
        >
          <Sparkles size={48} className="text-accent mx-auto mb-4 animate-bounce" />
          <h3 className="text-2xl font-bold text-white mb-2 font-display">No Projects Added Yet!</h3>
          <p className="text-gray-400 mb-6 text-sm">
            Click the button below to add your first real project with title, description, tech stack, and GitHub links!
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-accent hover:bg-sky-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl transition-colors"
          >
            + Add My First Project
          </button>
        </motion.div>
      ) : (
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
      )}

      {/* Add Project Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-sky-500/30 rounded-3xl p-6 md:p-8 max-w-xl w-full text-left shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-white font-bold text-xl font-display">
                  <FolderPlus className="text-accent" size={24} /> Add New Project
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateProject} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1 font-medium">Project Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. My E-Commerce App"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-slate-800 text-white rounded-xl px-4 py-2.5 outline-none border border-white/10 focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1 font-medium">Description</label>
                  <textarea
                    rows="3"
                    placeholder="Short description of what your project does..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full bg-slate-800 text-white rounded-xl px-4 py-2.5 outline-none border border-white/10 focus:border-accent resize-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1 font-medium">Tech Stack (Comma Separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. React, Tailwind CSS, Node.js, Python"
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    className="w-full bg-slate-800 text-white rounded-xl px-4 py-2.5 outline-none border border-white/10 focus:border-accent text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1 font-medium">GitHub Repository Link</label>
                    <input
                      type="text"
                      placeholder="https://github.com/username/repo"
                      value={newGithub}
                      onChange={(e) => setNewGithub(e.target.value)}
                      className="w-full bg-slate-800 text-white rounded-xl px-4 py-2.5 outline-none border border-white/10 focus:border-accent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1 font-medium">Live Demo Link</label>
                    <input
                      type="text"
                      placeholder="https://myproject.vercel.app"
                      value={newLive}
                      onChange={(e) => setNewLive(e.target.value)}
                      className="w-full bg-slate-800 text-white rounded-xl px-4 py-2.5 outline-none border border-white/10 focus:border-accent text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1 font-medium">Project Cover Image</label>
                  <input
                    type="text"
                    placeholder="Custom Image URL (https://...)"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="w-full bg-slate-800 text-white rounded-xl px-4 py-2.5 outline-none border border-white/10 focus:border-accent text-sm mb-2"
                  />
                  <div className="flex gap-2 items-center">
                    <span className="text-xs text-gray-400">Or pick preset cover:</span>
                    <div className="flex gap-2 overflow-x-auto py-1">
                      {presetImages.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt="Preset"
                          onClick={() => setNewImage(img)}
                          className={`w-10 h-10 rounded-lg object-cover cursor-pointer border-2 transition-all ${
                            newImage === img ? 'border-accent scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="w-1/2 bg-slate-800 hover:bg-slate-700 text-gray-300 font-semibold py-3 rounded-xl transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 bg-accent hover:bg-sky-400 text-slate-950 font-bold py-3 rounded-xl transition-colors shadow-[0_0_20px_rgba(56,189,248,0.4)] text-sm"
                  >
                    Save Project
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
