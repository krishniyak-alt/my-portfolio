import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { Plus, Trash2, Sliders } from 'lucide-react';

const Skills = () => {
  const {
    data,
    isEditMode,
    updateSkillLevel,
    updateSkillName,
    addSkill,
    deleteSkill
  } = usePortfolio();

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] py-20 relative">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
          Tech <span className="text-gradient">Arsenal</span>
        </h2>
        <div className="w-24 h-1 bg-accent mx-auto rounded-full glow-border"></div>
        <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
          I'm constantly learning and expanding my skill set. Here's a breakdown of the technologies I use to build modern, interactive web applications.
        </p>

        {isEditMode && (
          <div className="mt-4 inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-4 py-2 rounded-xl border border-amber-500/30 text-sm font-medium">
            <Sliders size={16} /> Drag the percentage sliders below or edit skill names directly to update your level live!
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.skills.map((cat, catIdx) => (
          <motion.div 
            key={catIdx}
            className={`glass p-8 rounded-2xl flex flex-col transition-all duration-300 ${
              isEditMode ? 'border-amber-500/40 ring-1 ring-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.15)]' : ''
            }`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: catIdx * 0.2 }}
          >
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <h3 className="text-2xl font-bold font-display text-white">
                {cat.title}
              </h3>
              {isEditMode && (
                <button
                  onClick={() => addSkill(catIdx)}
                  className="flex items-center gap-1 text-xs bg-accent/20 hover:bg-accent text-accent hover:text-slate-950 font-bold px-3 py-1.5 rounded-lg border border-accent/40 transition-all"
                >
                  <Plus size={14} /> Add Skill
                </button>
              )}
            </div>
            
            <div className="space-y-6 flex-grow">
              {cat.skills.map((skill, skillIdx) => (
                <div key={skillIdx} className="w-full bg-slate-900/30 p-3 rounded-xl border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    {isEditMode ? (
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => updateSkillName(catIdx, skillIdx, e.target.value)}
                        className="bg-slate-800 text-white font-medium px-2 py-1 rounded border border-amber-500/40 focus:outline-none focus:ring-1 focus:ring-amber-400 text-sm"
                      />
                    ) : (
                      <span className="text-gray-200 font-medium">{skill.name}</span>
                    )}

                    <div className="flex items-center gap-2">
                      <span className="text-accent font-semibold text-sm">{skill.level}%</span>
                      {isEditMode && (
                        <button
                          onClick={() => deleteSkill(catIdx, skillIdx)}
                          className="text-red-400 hover:text-red-300 p-1 transition-colors"
                          title="Delete skill"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </div>

                  {isEditMode ? (
                    <div className="space-y-1">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={skill.level}
                        onChange={(e) => updateSkillLevel(catIdx, skillIdx, e.target.value)}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
                      />
                    </div>
                  ) : (
                    <div className="w-full bg-secondary rounded-full h-2.5 outline outline-1 outline-white/5 overflow-hidden">
                      <motion.div 
                        className={`h-2.5 rounded-full ${skill.color || 'bg-accent'} shadow-[0_0_10px_currentColor]`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + (skillIdx * 0.1), ease: "easeOut" }}
                      ></motion.div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
