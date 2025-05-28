'use client';

import { motion } from 'framer-motion';
import { defaultExperienceData } from '@/schemas/experience';

interface ExperienceTimelineProps {
  experiences?: any[];
}

const ExperienceTimeline = ({ experiences }: ExperienceTimelineProps) => {
  const experienceData = experiences || defaultExperienceData;

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2"></div>

      {/* Experience items */}
      <div className="space-y-12">
        {experienceData.map((experience, index) => (
          <motion.div
            key={index}
            className={`relative flex flex-col md:flex-row ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Timeline dot */}
            <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-blue-600 rounded-full transform -translate-x-1/2 mt-1.5"></div>

            {/* Content */}
            <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} pl-8 md:pl-0`}>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-1">{experience.company}</h3>
                <h4 className="text-lg text-gray-600 dark:text-gray-400 mb-2">{experience.position}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">{experience.duration}</p>

                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1">
                  {experience.description.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
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
