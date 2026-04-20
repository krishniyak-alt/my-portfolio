import React from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: "Programming Languages",
    skills: [
      { name: "JavaScript", level: 70, color: "bg-yellow-400" },
      { name: "TypeScript", level: 30, color: "bg-blue-500" },
      { name: "Python", level: 80, color: "bg-green-500" },
      { name: "C++", level: 70, color: "bg-purple-600" }
    ]
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "React.js", level: 30, color: "bg-cyan-400" },
      { name: "Next.js", level: 30, color: "bg-slate-100" },
      { name: "Three.js", level: 30, color: "bg-white" },
      { name: "Tailwind CSS", level: 40, color: "bg-teal-400" }
    ]
  },
  {
    title: "Tools & Technologies",
    skills: [
      { name: "Git & GitHub", level: 40, color: "bg-orange-600" },
      { name: "Docker", level: 20, color: "bg-blue-600" },
      { name: "Figma", level: 50, color: "bg-pink-500" },
      { name: "Firebase", level: 30, color: "bg-yellow-500" }
    ]
  }
];

const Skills = () => {
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
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((cat, catIdx) => (
          <motion.div 
            key={catIdx}
            className="glass p-8 rounded-2xl flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: catIdx * 0.2 }}
          >
            <h3 className="text-2xl font-bold font-display text-white mb-6 border-b border-white/10 pb-4">
              {cat.title}
            </h3>
            
            <div className="space-y-6 flex-grow">
              {cat.skills.map((skill, skillIdx) => (
                <div key={skillIdx} className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-200 font-medium">{skill.name}</span>
                    <span className="text-gray-400 text-sm">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2.5 outline outline-1 outline-white/5 overflow-hidden">
                    <motion.div 
                      className={`h-2.5 rounded-full ${skill.color} shadow-[0_0_10px_currentColor]`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + (skillIdx * 0.1), ease: "easeOut" }}
                    ></motion.div>
                  </div>
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
