import React from "react";
import { Timeline } from "@/components/ui/timeline";
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

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const experienceData = experiences || defaultExperienceData;
  
  const data = experienceData.map((experience) => ({
    title: experience.duration,
    content: (
      <div>
        <h3 className="text-2xl font-bold mb-1 text-neutral-800 dark:text-neutral-200">
          {experience.company}
        </h3>
        <h4 className="text-lg font-medium text-purple-600 dark:text-purple-400 mb-4">
          {experience.position}
        </h4>
        <ul className="space-y-3 mb-8">
          {experience.description.map((item, idx) => (
            <li key={idx} className="flex items-start text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
              <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  }));

  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
