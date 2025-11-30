"use client"

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import Image from 'next/image';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full bg-background/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold">

          <Image src="/logoravi.png" className='!md:w-[0px] lg:w-[250px] h-full ' alt="Ravi Portfolio Logo" width={200} height={40} />

          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/projects" className="hover:text-blue-600 transition-colors">
              Projects
            </Link>
            <Link href="/blog" className="hover:text-blue-600 transition-colors">
              Blog
            </Link>
            <Link href="/skills" className="hover:text-blue-600 transition-colors">
              Skills
            </Link>
            <Link href="/#experience" className="hover:text-blue-600 transition-colors">
              Experience
            </Link>
            <Link href="/#education" className="hover:text-blue-600 transition-colors">
              Education
            </Link>
            <Link href="/#contact" className="hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Theme toggle and mobile menu button */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            <button 
              className="md:hidden flex items-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-background border-t border-gray-200 dark:border-gray-800"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/" 
              className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/projects" 
              className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </Link>
            <Link 
              href="/blog" 
              className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link 
              href="/skills" 
              className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              Skills
            </Link>
            <Link 
              href="/#experience" 
              className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              Experience
            </Link>
            <Link 
              href="/#education" 
              className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              Education
            </Link>
            <Link 
              href="/#contact" 
              className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;