'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { 
  SiReact, SiNextdotjs, SiTailwindcss, SiBootstrap, 
  SiMui, SiFramer, SiGit, SiFirebase, SiGithubactions, 
  SiHubspot, SiWebpack, SiNpm, SiJavascript, SiTypescript, 
  SiHtml5, SiCss3, SiPhp, SiMysql, SiNodedotjs, SiMongodb,
  SiDocker, SiFigma, SiPostman
} from 'react-icons/si';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { getSkills } from '@/lib/sanity';

interface Skill {
  _id: string;
  name: string;
  icon: string;
  category: string;
  proficiency: number;
  description?: string;
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
  SiMysql: <SiMysql />,
  SiNodedotjs: <SiNodedotjs />,
  SiMongodb: <SiMongodb />,
  SiDocker: <SiDocker />,
  SiFigma: <SiFigma />,
  SiPostman: <SiPostman />
};

// Fallback data with enhanced skills
const fallbackSkills: Skill[] = [
  // Frontend
  { _id: '1', name: "React.js", icon: "SiReact", category: "frontend", proficiency: 90, description: "Building dynamic UIs" },
  { _id: '2', name: "Next.js", icon: "SiNextdotjs", category: "frontend", proficiency: 85, description: "Server-side rendering" },
  { _id: '3', name: "Tailwind CSS", icon: "SiTailwindcss", category: "frontend", proficiency: 90, description: "Utility-first CSS" },
  { _id: '4', name: "Bootstrap", icon: "SiBootstrap", category: "frontend", proficiency: 85, description: "Responsive design" },
  { _id: '5', name: "Material UI", icon: "SiMui", category: "frontend", proficiency: 80, description: "Component library" },
  { _id: '6', name: "Framer Motion", icon: "SiFramer", category: "frontend", proficiency: 75, description: "Animation library" },
  
  // Backend
  { _id: '19', name: "Node.js", icon: "SiNodedotjs", category: "backend", proficiency: 80, description: "Server-side JavaScript" },
  { _id: '20', name: "MongoDB", icon: "SiMongodb", category: "backend", proficiency: 75, description: "NoSQL database" },
  { _id: '17', name: "PHP", icon: "SiPhp", category: "backend", proficiency: 70, description: "Server scripting" },
  { _id: '18', name: "MySQL", icon: "SiMysql", category: "backend", proficiency: 75, description: "Relational database" },
  
  // Languages
  { _id: '13', name: "JavaScript", icon: "SiJavascript", category: "languages", proficiency: 90, description: "Core programming" },
  { _id: '14', name: "TypeScript", icon: "SiTypescript", category: "languages", proficiency: 85, description: "Type-safe JS" },
  { _id: '15', name: "HTML5", icon: "SiHtml5", category: "languages", proficiency: 95, description: "Markup language" },
  { _id: '16', name: "CSS3", icon: "SiCss3", category: "languages", proficiency: 90, description: "Styling" },
  
  // Tools
  { _id: '7', name: "Git", icon: "SiGit", category: "tools", proficiency: 85, description: "Version control" },
  { _id: '8', name: "Firebase", icon: "SiFirebase", category: "tools", proficiency: 80, description: "Backend services" },
  { _id: '9', name: "CI/CD", icon: "SiGithubactions", category: "tools", proficiency: 75, description: "Automation" },
  { _id: '21', name: "Docker", icon: "SiDocker", category: "tools", proficiency: 70, description: "Containerization" },
  { _id: '22', name: "Figma", icon: "SiFigma", category: "tools", proficiency: 80, description: "Design tool" },
  { _id: '23', name: "Postman", icon: "SiPostman", category: "tools", proficiency: 85, description: "API testing" },
];

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>(fallbackSkills);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const fetchedSkills = await getSkills();
        if (fetchedSkills && fetchedSkills.length > 0) {
          setSkills(fetchedSkills);
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = ['all', ...Array.from(new Set(skills.map(s => s.category)))];
  
  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

  const groupedSkills = filteredSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <ParticleBackground />
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Skills & Expertise
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Technologies I use to craft exceptional digital experiences
            </motion.p>
            
            {/* Category Filter */}
            <motion.div 
              className="flex flex-wrap justify-center gap-3 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/50'
                      : 'bg-white dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Grid Section */}
      <section ref={containerRef} className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <motion.div
                className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          ) : (
            <motion.div style={{ opacity, scale }}>
              {activeCategory === 'all' ? (
                // Grouped by category
                <div className="space-y-16">
                  {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                    >
                      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white capitalize">
                        {category}
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {categorySkills.map((skill, index) => (
                          <SkillCard key={skill._id} skill={skill} index={index} />
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                // Single category view
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredSkills.map((skill, index) => (
                    <SkillCard key={skill._id} skill={skill} index={index} />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Technologies", value: skills.length },
              { label: "Years Experience", value: "5+" },
              { label: "Projects Completed", value: "50+" },
              { label: "Happy Clients", value: "30+" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-600 dark:text-gray-400 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Scroll to top"
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 10l7-7m0 0l7 7m-7-7v18" 
          />
        </svg>
      </motion.button>
    </div>
  );
}

// Skill Card Component
function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <div className="relative bg-white dark:bg-gradient-to-br dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 overflow-hidden shadow-lg dark:shadow-none">
        {/* Animated gradient background on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={isHovered ? { scale: [1, 1.5, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className="w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-4xl"
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-blue-400 group-hover:text-blue-300 transition-colors">
              {iconMap[skill.icon as keyof typeof iconMap] || skill.icon.charAt(0)}
            </span>
          </motion.div>

          {/* Skill Name */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {skill.name}
          </h3>

          {/* Description */}
          {skill.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{skill.description}</p>
          )}

          {/* Proficiency Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Proficiency</span>
              <span className="text-blue-400 font-semibold">{skill.proficiency}%</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.proficiency}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.05, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>

        {/* Glow effect on hover */}
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"
          animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}
