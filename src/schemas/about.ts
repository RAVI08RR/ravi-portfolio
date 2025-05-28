import { z } from 'zod';

export const AboutSchema = z.object({
  title: z.string().optional(),
  paragraphs: z.array(
    z.string().min(10, "Each paragraph should be at least 10 characters")
  ).min(1, "At least one paragraph is required"),
});

export type AboutData = z.infer<typeof AboutSchema>;

// Default data for the about section
export const defaultAboutData: AboutData = {
  title: "About Me",
  paragraphs: [
    "I'm a passionate Web Developer based in Hyderabad with expertise in building modern, responsive web applications. My journey in web development started during my college years, and I've been honing my skills ever since.",
    "I specialize in frontend development using React.js and Next.js, creating intuitive user interfaces with Tailwind CSS, Bootstrap, and Material UI. I'm experienced in integrating RESTful APIs and managing application state efficiently.",
    "My goal is to create web experiences that are not only visually appealing but also performant, accessible, and user-friendly. I'm constantly learning new technologies and best practices to stay at the forefront of web development."
  ],
};