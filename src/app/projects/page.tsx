"use client"

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
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
      <div className="pt-16 min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
        {/* Background Pattern */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px]"></div>
          <div className="absolute right-0 bottom-0 -z-10 h-[310px] w-[310px] rounded-full bg-purple-500 opacity-20 blur-[100px]"></div>
        </div>

        {/* Projects Header */}
        <section className="relative z-10 py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                My Projects
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                A showcase of my recent web development work, featuring projects built with React, Next.js, and other modern technologies.
              </p>
              <div className="mt-4">
                <a 
                  href="/studio" 
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Manage Projects
                </a>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Projects Grid */}
        <section className="relative z-10 pb-24">
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
        <section className="relative z-10 py-16 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Interested in working together?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              <Link 
                href="/#contact" 
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Get In Touch
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}