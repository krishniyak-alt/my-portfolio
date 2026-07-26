import React, { createContext, useContext, useState, useEffect } from 'react';

const initialPortfolioData = {
  home: {
    greeting: "Welcome to my universe",
    name: "Krishniya k",
    subtitle: "Full-Stack Developer & UI/UX Enthusiast",
    bio: "I build interactive, modern, and visually stunning web applications with cutting-edge technologies. Let's create something extraordinary together.",
    primaryBtnText: "View Projects",
    secondaryBtnText: "Contact Me"
  },
  about: {
    title: "About Me",
    paragraphs: [
      "Hello! I'm an enthusiastic Software Engineer dedicated to crafting robust, scalable, and visually compelling digital experiences. My journey into tech began with a deep curiosity to understand how things work under the hood.",
      "Today, I specialize in full-stack web development, bringing ideas to life using React, Node.js, and modern styling architectures like Tailwind CSS and framer-motion. I thrive on translating complex problems into simple, beautiful, and intuitive interfaces.",
      "When I'm not coding, you can find me exploring new technologies, writing technical articles, or constantly optimizing my own setups to maximize efficiency."
    ],
    highlights: [
      { iconName: "Code2", title: "Clean Code", desc: "Writing maintainable and scalable architectures." },
      { iconName: "Cpu", title: "Modern Tech", desc: "Always adopting the latest bleeding-edge tooling." },
      { iconName: "Globe", title: "Web Performance", desc: "Optimizing load times to the absolute minimum." },
      { iconName: "Lightbulb", title: "UX Oriented", desc: "Putting the user's interactive experience first." }
    ]
  },
  skills: [
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
  ],
  projects: [],
  profiles: [
    {
      name: "GitHub",
      handle: "krishniya k",
      iconName: "FaGithub",
      color: "group-hover:text-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]",
      link: "https://github.com/krishniyak-alt",
      stats: "4 Repositories"
    },
    {
      name: "LeetCode",
      handle: "Krishniya k",
      iconName: "FaCode",
      color: "group-hover:text-yellow-500 group-hover:shadow-[0_0_20px_rgba(234,179,8,0.5)]",
      link: "https://leetcode.com/u/vymuia6BDb/",
      stats: "solving"
    },
    {
      name: "HackerRank",
      handle: "Krishniya k",
      iconName: "FaTerminal",
      color: "group-hover:text-green-500 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]",
      link: "https://www.hackerrank.com/profile/kkirithisrik",
      stats: "5 Star Coder"
    }
  ],
  resume: {
    fileName: "Krishniya k Resume.pdf",
    fileSize: "PDF formatting • 1.2 MB",
    downloadUrl: "/resume.pdf",
    downloadName: "My_Resume.pdf"
  }
};

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('my_portfolio_data_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved portfolio data", e);
      }
    }
    return initialPortfolioData;
  });

  useEffect(() => {
    localStorage.setItem('my_portfolio_data_v2', JSON.stringify(data));
  }, [data]);

  const updateHome = (fields) => {
    setData(prev => ({ ...prev, home: { ...prev.home, ...fields } }));
  };

  const updateAbout = (fields) => {
    setData(prev => ({ ...prev, about: { ...prev.about, ...fields } }));
  };

  const updateSkillLevel = (catIdx, skillIdx, level) => {
    setData(prev => {
      const newSkills = JSON.parse(JSON.stringify(prev.skills));
      newSkills[catIdx].skills[skillIdx].level = Number(level);
      return { ...prev, skills: newSkills };
    });
  };

  const updateSkillName = (catIdx, skillIdx, name) => {
    setData(prev => {
      const newSkills = JSON.parse(JSON.stringify(prev.skills));
      newSkills[catIdx].skills[skillIdx].name = name;
      return { ...prev, skills: newSkills };
    });
  };

  const addSkill = (catIdx) => {
    setData(prev => {
      const newSkills = JSON.parse(JSON.stringify(prev.skills));
      newSkills[catIdx].skills.push({ name: "New Skill", level: 50, color: "bg-accent" });
      return { ...prev, skills: newSkills };
    });
  };

  const deleteSkill = (catIdx, skillIdx) => {
    setData(prev => {
      const newSkills = JSON.parse(JSON.stringify(prev.skills));
      newSkills[catIdx].skills.splice(skillIdx, 1);
      return { ...prev, skills: newSkills };
    });
  };

  const updateProject = (idx, fields) => {
    setData(prev => {
      const newProjects = [...prev.projects];
      newProjects[idx] = { ...newProjects[idx], ...fields };
      return { ...prev, projects: newProjects };
    });
  };

  const addProject = (customProject) => {
    const newProj = customProject || {
      title: "My New Project",
      description: "Short description of what I built, the problem it solves, and key features.",
      tech: ["React", "JavaScript", "Tailwind CSS"],
      github: "https://github.com/krishniyak-alt",
      live: "https://my-portfolio-pearl-kappa-66.vercel.app",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
    };

    setData(prev => ({
      ...prev,
      projects: [...prev.projects, newProj]
    }));
  };

  const deleteProject = (idx) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== idx)
    }));
  };

  const updateProfile = (idx, fields) => {
    setData(prev => {
      const newProfiles = [...prev.profiles];
      newProfiles[idx] = { ...newProfiles[idx], ...fields };
      return { ...prev, profiles: newProfiles };
    });
  };

  const addProfile = () => {
    setData(prev => ({
      ...prev,
      profiles: [
        ...prev.profiles,
        {
          name: "Platform",
          handle: "yourusername",
          iconName: "FaGithub",
          color: "group-hover:text-accent",
          link: "#",
          stats: "Member"
        }
      ]
    }));
  };

  const deleteProfile = (idx) => {
    setData(prev => ({
      ...prev,
      profiles: prev.profiles.filter((_, i) => i !== idx)
    }));
  };

  const resetToDefault = () => {
    setData(initialPortfolioData);
    localStorage.removeItem('my_portfolio_data_v2');
  };

  return (
    <PortfolioContext.Provider value={{
      data,
      isEditMode,
      setIsEditMode,
      updateHome,
      updateAbout,
      updateSkillLevel,
      updateSkillName,
      addSkill,
      deleteSkill,
      updateProject,
      addProject,
      deleteProject,
      updateProfile,
      addProfile,
      deleteProfile,
      resetToDefault
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
