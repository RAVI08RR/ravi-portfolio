"use client"

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getProjects } from "@/lib/sanity";

// Metadata is moved to a separate layout.tsx file since this is a client component
// and metadata can only be exported from server components

interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  liveUrl: string;
  techStack: string[];
  features: string[];
}

// Fallback project data
const fallbackProjects = [
  {
    _id: "1",
    title: "Kalsi Estate",
    description: "A real estate platform for property listings and management with user authentication and advanced search capabilities.",
    imageUrl: "/projects/project1.jpg",
    liveUrl: "https://kalsi-estate.example.com",
    techStack: ["React", "Redux", "Firebase Auth", "Elastic Search"],
    features: [
      "User authentication and profile management",
      "Advanced property search with filters",
      "Real-time notifications for price changes",
      "Interactive property maps and virtual tours",
      "Saved properties and search history"
    ]
  },
  {
    _id: "2",
    title: "Arabian Hills",
    description: "A tourism website for showcasing destinations in the Arabian Hills with smooth animations and responsive design.",
    imageUrl: "/projects/project2.jpg",
    liveUrl: "https://arabian-hills.example.com",
    techStack: ["React", "Framer Motion", "Tailwind CSS"],
    features: [
      "Smooth page transitions and scroll animations",
      "Interactive destination maps",
      "Photo galleries with zoom functionality",
      "Tour booking system with availability calendar",
      "Multi-language support"
    ]
  },
  {
    _id: "3",
    title: "Indispare",
    description: "An e-commerce platform for spare parts with comprehensive product catalog and order management.",
    imageUrl: "/projects/project3.jpg",
    liveUrl: "https://indispare.example.com",
    techStack: ["Next.js", "API Integration", "Bootstrap"],
    features: [
      "Product catalog with advanced filtering",
      "User accounts and order history",
      "Real-time inventory tracking",
      "Secure payment gateway integration",
      "Order tracking and notifications"
    ]
  },
  {
    _id: "4",
    title: "Casa Serene",
    description: "A luxury home decor and interior design website with elegant UI and seamless user experience.",
    imageUrl: "/projects/project4.jpg",
    liveUrl: "https://casa-serene.example.com",
    techStack: ["Next.js", "Tailwind CSS"],
    features: [
      "Product showcase with 3D visualization",
      "Interior design inspiration gallery",
      "Design consultation booking system",
      "Customer reviews and testimonials",
      "Newsletter subscription with personalized recommendations"
    ]
  }
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        if (data && data.length > 0) {
          setProjects(data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Fallback to hardcoded data
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen"> {/* Add padding to account for fixed navbar */}
        {/* Projects Header */}
        <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">My Projects</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                A showcase of my recent web development work, featuring projects built with React, Next.js, and other modern technologies.
              </p>
              <div className="mt-4">
                <a 
                  href="/studio" 
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Admin: Manage Projects
                </a>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Projects Grid */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project._id}
                    title={project.title}
                    description={project.description}
                    imageUrl={project.imageUrl}
                    liveUrl={project.liveUrl}
                    techStack={project.techStack}
                    features={project.features}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-6">Interested in working together?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              <a 
                href="/#contact" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Get In Touch
              </a>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}