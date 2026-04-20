import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaCode, FaTerminal, FaCodeBranch } from 'react-icons/fa';

const profiles = [
  {
    name: "GitHub",
    handle: "krishniya k",
    icon: <FaGithub size={40} />,
    color: "group-hover:text-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]",
    link: "https://github.com/krishniyak-alt",
    stats: "4 Repositories"
  },
  {
    name: "LeetCode",
    handle: "Krishniya k",
    icon: <FaCode size={40} />,
    color: "group-hover:text-yellow-500 group-hover:shadow-[0_0_20px_rgba(234,179,8,0.5)]",
    link: "https://leetcode.com/u/vymuia6BDb/",
    stats: "solving"
  },
  {
    name: "HackerRank",
    handle: "Krishniya k",
    icon: <FaTerminal size={40} />,
    color: "group-hover:text-green-500 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]",
    link: "https://www.hackerrank.com/profile/kkirithisrik",
    stats: "5 Star Coder"
  },
  
];

const Profiles = () => {
  return (
    <div className="w-full min-h-[calc(100vh-4rem)] py-20 relative flex flex-col items-center justify-center">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
          Coding <span className="text-gradient">Profiles</span>
        </h2>
        <div className="w-24 h-1 bg-accent mx-auto rounded-full glow-border"></div>
        <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
          Passionate about problem-solving and open source. Catch my competitive programming journey here.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
        {profiles.map((profile, idx) => (
          <motion.a 
            key={idx}
            href={profile.link}
            className="glass rounded-2xl p-8 flex flex-col items-center justify-center text-center group cursor-pointer border border-white/5 hover:border-white/20 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -10 }}
          >
            <div className={`text-gray-400 transition-colors duration-300 mb-6 rounded-full ${profile.color}`}>
              {profile.icon}
            </div>
            <h3 className="text-xl font-bold font-display text-white mb-1">{profile.name}</h3>
            <span className="text-accent text-sm mb-4">{profile.handle}</span>
            <div className="px-4 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/10">
              {profile.stats}
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default Profiles;
