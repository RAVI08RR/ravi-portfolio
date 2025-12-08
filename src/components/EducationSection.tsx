'use client';

import { motion } from 'framer-motion';

interface Education {
  degree: string;
  institution: string;
  duration: string;
  description?: string;
}

const educationData: Education[] = [
  {
    degree: "B.Tech in Computer Science",
    institution: "People's University, Bhopal",
    duration: "2017 – 2021",
    description: "Graduated with honors, focusing on web development and software engineering principles."
  },
  {
    degree: "12th Standard",
    institution: "G.H.S. School Bhanegone",
    duration: "2015 – 2017",
    description: "Completed higher secondary education with focus on science and mathematics."
  }
];

const EducationSection = () => {
  return (
    <div className="space-y-6">
      {educationData.map((item, index) => (
        <motion.div 
          key={index}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{item.degree}</h3>
          <h4 className="text-lg text-gray-600 dark:text-gray-400 mb-2">{item.institution}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">{item.duration}</p>
          {item.description && (
            <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default EducationSection;
