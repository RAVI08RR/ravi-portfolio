'use client';

import { motion } from 'framer-motion';
import { defaultExperienceData } from '@/schemas/experience';

interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string[];
}

interface ExperienceTimelineProps {
  experiences?: Experience[];
}

const ExperienceTimeline = ({ experiences }: ExperienceTimelineProps) => {
  const experienceData = experiences || defaultExperienceData;

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Vertical line with gradient */}
      <div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform -translate-x-1/2 opacity-30"></div>

      {/* Experience items */}
      <div className="space-y-16">
        {experienceData.map((experience, index) => (
          <motion.div
            key={index}
            className={`relative flex flex-col md:flex-row ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.1 }}
          >
            {/* Timeline dot */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
              className="absolute left-0 md:left-1/2 w-5 h-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transform -translate-x-1/2 mt-1.5 border-4 border-white dark:border-gray-900 z-10 shadow-lg"
            ></motion.div>

            {/* Content */}
            <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} pl-10 md:pl-0`}>
              <motion.div 
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 overflow-hidden"
              >
                {/* Gradient glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase bg-blue-100/50 dark:bg-blue-900/30 rounded-full">
                    {experience.duration}
                  </span>
                  <h3 className="text-2xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
                    {experience.company}
                  </h3>
                  <h4 className="text-lg font-medium text-purple-600 dark:text-purple-400 mb-4">
                    {experience.position}
                  </h4>

                  <ul className="space-y-3">
                    {experience.description.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start text-gray-600 dark:text-gray-300">
                        <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Empty space */}
            <div className="hidden md:block md:w-1/2"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline;
