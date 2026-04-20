import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projectsList = [
  {
    title: "Neon E-Commerce",
    description: "A fully functional e-commerce platform featuring a modern cyberpunk aesthetic, real-time inventory management, and Stripe payment integration.",
    tech: ["Next.js", "Tailwind CSS", "Stripe", "Prisma"],
    github: "#",
    live: "#",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "AI Image Generator",
    description: "An interactive web app that utilizes OpenAI's DALL-E API to generate customized images based on complex user text prompts.",
    tech: ["React.js", "Three.js", "Node.js", "OpenAI"],
    github: "#",
    live: "#",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Crypto Dashboard 3D",
    description: "A comprehensive cryptocurrency tracking dashboard visualizing market trends using immersive 3D charting tools and WebGL.",
    tech: ["React", "Three.js", "Framer Motion", "CoinGecko API"],
    github: "#",
    live: "#",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f4ec651?q=80&w=800&auto=format&fit=crop"
  }
];

const TiltCard = ({ project }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${mouseXSpring}deg) rotateY(${mouseYSpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate rotation (-15 to 15 degrees)
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
      style={{ transformStyle: "preserve-3d", transform }}
      className="relative w-full h-full rounded-2xl glass p-6 border border-white/10 hover:border-accent/50 group cursor-pointer transition-colors duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div style={{ transform: "translateZ(50px)" }} className="relative h-48 w-full mb-6 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      </div>
      
      <div style={{ transform: "translateZ(30px)" }}>
        <h3 className="text-2xl font-bold text-white mb-3 font-display drop-shadow-md">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t, i) => (
            <span key={i} className="text-xs font-semibold px-3 py-1 bg-white/5 text-accent rounded-full border border-white/5">
              {t}
            </span>
          ))}
        </div>
      </div>
      
      <div style={{ transform: "translateZ(40px)" }} className="flex justify-between items-center pt-4 border-t border-white/10 mt-auto">
        <a href={project.github} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
          <FaGithub size={18} /> Source Code
        </a>
        <a href={project.live} className="flex items-center gap-2 text-sm text-accent hover:text-white transition-colors group/link">
          Live Demo <FaExternalLinkAlt size={18} className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
        </a>
      </div>
    </motion.div>
  );
};

const Projects = () => {
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
          A selection of my best works. Hover over the cards to experience interactive 3D elements.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsList.map((project, idx) => (
          <TiltCard key={idx} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
