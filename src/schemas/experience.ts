import { z } from 'zod';

export const ExperienceItemSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  duration: z.string().min(1, "Duration is required"),
  description: z.array(
    z.string().min(5, "Each description item should be at least 5 characters")
  ).min(1, "At least one description item is required"),
});

export const ExperienceSchema = z.array(ExperienceItemSchema).min(1, "At least one experience item is required");

export type ExperienceItem = z.infer<typeof ExperienceItemSchema>;
export type ExperienceData = z.infer<typeof ExperienceSchema>;

// Default data for the experience section
export const defaultExperienceData: ExperienceData = [
  {
    company: "Travash Software Solutions",
    position: "Web Developer",
    duration: "03/2023 – Present",
    description: [
      "Developed responsive web applications using React.js and Next.js",
      "Implemented UI designs using Tailwind CSS and Material UI",
      "Integrated RESTful APIs and managed state with Redux",
      "Collaborated with cross-functional teams to deliver high-quality products"
    ]
  },
  {
    company: "NJ Design Park",
    position: "Frontend Developer",
    duration: "09/2022 – 02/2023",
    description: [
      "Built interactive user interfaces with React.js",
      "Created responsive layouts using Bootstrap and CSS",
      "Optimized website performance and loading times",
      "Participated in code reviews and implemented feedback"
    ]
  },
  {
    company: "Crowndnix Technology",
    position: "Junior Web Developer",
    duration: "03/2022 – 08/2022",
    description: [
      "Assisted in developing web applications using JavaScript and PHP",
      "Maintained and updated existing websites",
      "Implemented responsive designs for mobile compatibility",
      "Collaborated with senior developers on various projects"
    ]
  }
];