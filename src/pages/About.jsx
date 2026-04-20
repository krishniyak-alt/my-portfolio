import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Globe, Lightbulb } from 'lucide-react';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
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
          About <span className="text-gradient">Me</span>
        </h2>
        <div className="w-24 h-1 bg-accent mx-auto rounded-full glow-border"></div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-12 items-center w-full">
        {/* Left: Text Content */}
        <motion.div 
          className="w-full lg:w-1/2 text-gray-300 space-y-6 text-lg leading-relaxed glass p-8 rounded-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.p variants={itemVariants}>
            Hello! I'm an enthusiastic Software Engineer dedicated to crafting robust, scalable, and visually compelling digital experiences. My journey into tech began with a deep curiosity to understand how things work under the hood.
          </motion.p>
          <motion.p variants={itemVariants}>
            Today, I specialize in full-stack web development, bringing ideas to life using React, Node.js, and modern styling architectures like Tailwind CSS and framer-motion. I thrive on translating complex problems into simple, beautiful, and intuitive interfaces.
          </motion.p>
          <motion.p variants={itemVariants}>
            When I'm not coding, you can find me exploring new technologies, writing technical articles, or constantly optimizing my own setups to maximize efficiency.
          </motion.p>
        </motion.div>

        {/* Right: Highlights / Goals grid */}
        <motion.div 
          className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {[
            { icon: <Code2 size={32} />, title: "Clean Code", desc: "Writing maintainable and scalable architectures." },
            { icon: <Cpu size={32} />, title: "Modern Tech", desc: "Always adopting the latest bleeding-edge tooling." },
            { icon: <Globe size={32} />, title: "Web Performance", desc: "Optimizing load times to the absolute minimum." },
            { icon: <Lightbulb size={32} />, title: "UX Oriented", desc: "Putting the user's interactive experience first." },
          ].map((item, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="glass p-6 rounded-xl hover:-translate-y-2 transition-transform duration-300 border border-white/5 hover:border-accent/40 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]"
            >
              <div className="text-accent mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2 font-display">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default About;
