'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { 
  SiReact, SiNextdotjs, SiTailwindcss, SiBootstrap, 
  SiMui, SiFramer, SiGit, SiFirebase, SiGithubactions, 
  SiHubspot, SiWebpack, SiNpm, SiJavascript, SiTypescript, 
  SiHtml5, SiCss3, SiPhp, SiMysql 
} from 'react-icons/si';
import { getSkills } from '@/lib/sanity';

interface Skill {
  _id: string;
  name: string;
  icon: string;
  category: string;
  proficiency: number;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

// Icon mapping
const iconMap: Record<string, React.ReactNode> = {
  SiReact: <SiReact />,
  SiNextdotjs: <SiNextdotjs />,
  SiTailwindcss: <SiTailwindcss />,
  SiBootstrap: <SiBootstrap />,
  SiMui: <SiMui />,
  SiFramer: <SiFramer />,
  SiGit: <SiGit />,
  SiFirebase: <SiFirebase />,
  SiGithubactions: <SiGithubactions />,
  SiHubspot: <SiHubspot />,
  SiWebpack: <SiWebpack />,
  SiNpm: <SiNpm />,
  SiJavascript: <SiJavascript />,
  SiTypescript: <SiTypescript />,
  SiHtml5: <SiHtml5 />,
  SiCss3: <SiCss3 />,
  SiPhp: <SiPhp />,
  SiMysql: <SiMysql />
};

// Fallback data
const fallbackSkillCategories: SkillCategory[] = [
  {
    name: "Front-End",
    skills: [
      { _id: '1', name: "React.js", icon: "SiReact", category: "frontend", proficiency: 90 },
      { _id: '2', name: "Next.js", icon: "SiNextdotjs", category: "frontend", proficiency: 85 },
      { _id: '3', name: "Tailwind CSS", icon: "SiTailwindcss", category: "frontend", proficiency: 90 },
      { _id: '4', name: "Bootstrap", icon: "SiBootstrap", category: "frontend", proficiency: 85 },
      { _id: '5', name: "Material UI", icon: "SiMui", category: "frontend", proficiency: 80 },
      { _id: '6', name: "Framer Motion", icon: "SiFramer", category: "frontend", proficiency: 75 }
    ]
  },
  {
    name: "Tools",
    skills: [
      { _id: '7', name: "Git", icon: "SiGit", category: "tools", proficiency: 85 },
      { _id: '8', name: "Firebase", icon: "SiFirebase", category: "tools", proficiency: 80 },
      { _id: '9', name: "CI/CD", icon: "SiGithubactions", category: "tools", proficiency: 75 },
      { _id: '10', name: "HubSpot CMS", icon: "SiHubspot", category: "tools", proficiency: 70 },
      { _id: '11', name: "Webpack", icon: "SiWebpack", category: "tools", proficiency: 65 },
      { _id: '12', name: "npm/yarn", icon: "SiNpm", category: "tools", proficiency: 90 }
    ]
  },
  {
    name: "Languages",
    skills: [
      { _id: '13', name: "JavaScript", icon: "SiJavascript", category: "languages", proficiency: 90 },
      { _id: '14', name: "TypeScript", icon: "SiTypescript", category: "languages", proficiency: 85 },
      { _id: '15', name: "HTML", icon: "SiHtml5", category: "languages", proficiency: 95 },
      { _id: '16', name: "CSS", icon: "SiCss3", category: "languages", proficiency: 90 },
      { _id: '17', name: "PHP", icon: "SiPhp", category: "languages", proficiency: 70 },
      { _id: '18', name: "MySQL", icon: "SiMysql", category: "languages", proficiency: 75 }
    ]
  }
];

const SkillsSection = () => {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(fallbackSkillCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skills = await getSkills();
        
        if (skills && skills.length > 0) {
          // Group skills by category
          const groupedSkills: Record<string, Skill[]> = {};
          
          skills.forEach((skill: Skill) => {
            const category = skill.category.charAt(0).toUpperCase() + skill.category.slice(1);
            if (!groupedSkills[category]) {
              groupedSkills[category] = [];
            }
            groupedSkills[category].push(skill);
          });
          
          // Convert to array of categories
          const categories: SkillCategory[] = Object.keys(groupedSkills).map(name => ({
            name,
            skills: groupedSkills[name]
          }));
          
          setSkillCategories(categories);
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
        // Fallback to hardcoded data
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {skillCategories.map((category, index) => (
        <motion.div 
          key={index}
          className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 overflow-hidden relative group"
          variants={itemVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          {/* Gradient glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <h3 className="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 relative z-10">
            {category.name}
          </h3>
          
          <div className="flex flex-wrap gap-4 relative z-10">
            {category.skills.map((skill) => (
              <motion.div 
                key={skill._id}
                className="flex flex-col items-center w-[calc(33.333%-11px)]"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center justify-center w-14 h-14 bg-white dark:bg-gray-600 rounded-xl mb-2 text-2xl text-blue-600 dark:text-white shadow-sm group-hover/skill:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-500">
                  {iconMap[skill.icon as keyof typeof iconMap] || skill.icon.charAt(0)}
                </div>
                <span className="text-sm font-semibold text-center text-gray-700 dark:text-white">{skill.name}</span>
                
                {/* Skill proficiency bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-2 overflow-hidden">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full" 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SkillsSection;