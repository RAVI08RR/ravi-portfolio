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
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
          variants={itemVariants}
        >
          <h3 className="text-xl font-bold mb-4">{category.name}</h3>
          <div className="flex flex-wrap gap-3">
            {category.skills.map((skill) => (
              <motion.div 
                key={skill._id}
                className="flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full mb-2 text-xl text-blue-600 dark:text-blue-400">
                  {iconMap[skill.icon as keyof typeof iconMap] || skill.icon.charAt(0)}
                </div>
                <span className="text-sm text-center">{skill.name}</span>
                
                {/* Skill proficiency bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 mt-1">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full" 
                    style={{ width: `${skill.proficiency}%` }}
                  ></div>
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