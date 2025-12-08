"use client"

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  liveUrl: string;
  techStack: string[];
  features: string[];
  index: number;
}

const ProjectCard = ({ 
  title, 
  description, 
  imageUrl, 
  liveUrl, 
  techStack, 
  features,
  index 
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="group relative bg-white dark:bg-gray-900/50 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700/50 hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-500"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Gradient overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
      />
      
      {/* Image Section */}
      <div className="relative h-64 w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
        <motion.div
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full h-full"
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
          />
        </motion.div>
        
        {/* Overlay on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center"
        >
          <motion.a 
            href={liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white text-gray-900 px-8 py-3 rounded-full font-bold shadow-2xl hover:bg-gray-100 transition-colors transform"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ delay: 0.1 }}
          >
            <span>View Live Project</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
      
      {/* Content Section */}
      <div className="p-8 relative z-20">
        <motion.h3 
          className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
          layoutId={`title-${index}`}
        >
          {title}
        </motion.h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed line-clamp-3">
          {description}
        </p>
        
        {/* Tech Stack */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider mb-3 text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, techIndex) => (
              <motion.span 
                key={techIndex} 
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: techIndex * 0.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
        
        {/* Key Features */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider mb-3 text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Key Features
          </h4>
          <ul className="space-y-2">
            {features.slice(0, 3).map((feature, featureIndex) => (
              <motion.li 
                key={featureIndex}
                className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: featureIndex * 0.1 }}
              >
                <svg className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10"
      />
    </motion.div>
  );
};

export default ProjectCard;