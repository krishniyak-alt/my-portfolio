import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const socials = [
    { icon: <FaLinkedin size={20} />, link: "https://www.linkedin.com/in/krishniya-karuppusamy-01a22a329?utm_source=share_via&utm_content=profile&utm_medium=member_android", color: "hover:text-blue-500 hover:shadow-[0_0_10px_rgba(59,130,246,0.8)]" },
    { icon: <FaGithub size={20} />, link: "https://github.com/krishniyak-alt", color: "hover:text-white hover:shadow-[0_0_10px_rgba(255,255,255,0.8)]" },
  ];

  return (
    <footer className="w-full mt-auto py-8 glass-panel border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-gray-400 text-sm font-medium">
          © {new Date().getFullYear()} Krishniya k. All rights reserved.
        </div>
        
        <div className="flex gap-4">
          {socials.map((social, idx) => (
            <a 
              key={idx} 
              href={social.link} 
              className={`text-gray-400 transition-all duration-300 p-2 rounded-full border border-transparent hover:border-white/10 glass ${social.color}`}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
