import { z } from 'zod';

export const HeroSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description should be at least 10 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number should be at least 10 digits"),
  linkedIn: z.string().url("Invalid LinkedIn URL"),
  profileImage: z.string().min(1, "Profile image is required"),
  profileImageUrl: z.string().optional(),
  profileImageAlt: z.string().optional(),
});

export type HeroData = z.infer<typeof HeroSchema>;

// Default data for the hero section
export const defaultHeroData: HeroData = {
  name: "Ravi Belpade",
  title: "Web Developer",
  description: "I specialize in building modern, responsive web applications using React, Next.js, and Tailwind CSS. With expertise in API integration and frontend development.",
  email: "ravi.belpade@example.com",
  phone: "+919876543210",
  linkedIn: "https://www.linkedin.com/in/ravi-belpade-690966218/",
  profileImage: "/profile-placeholder.jpg",
};