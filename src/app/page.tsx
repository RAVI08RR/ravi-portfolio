import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import { getHeroData, getAboutData, getExperienceData } from "@/lib/sanity";
import { defaultHeroData } from "@/schemas/hero";
import { defaultAboutData } from "@/schemas/about";
import { defaultExperienceData } from "@/schemas/experience";

export const revalidate = 3600; // Revalidate the data at most every hour

export default async function Home() {
  // Fetch data from Sanity
  // Use hardcoded data directly
  const heroData = defaultHeroData;
  const aboutData = await getAboutData().catch(() => null) || defaultAboutData;
  const experienceData = await getExperienceData().catch(() => null) || defaultExperienceData;
  
  // Process the profile image URL if it exists
  const profileImageUrl = heroData.profileImageUrl 
    ? heroData.profileImageUrl 
    : defaultHeroData.profileImage;
  return (
    <>
      <Navbar />

      <HeroSection heroData={heroData} profileImageUrl={profileImageUrl} />
      
      {/* About Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center">{aboutData.title || "About Me"}</h2>
            <div className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400 space-y-4">
              {aboutData.paragraphs.map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Work Experience</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              My professional journey in web development across different companies.
            </p>
          </div>
          
          <ExperienceTimeline experiences={experienceData} />
        </div>
      </section>
      
      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Skills & Expertise</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Technologies and tools I work with to bring ideas to life.
            </p>
          </div>
          
          <SkillsSection />
        </div>
      </section>
      
      {/* Education Section */}
      <section id="education" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Education</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              My academic background and qualifications.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <EducationSection />
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have a project in mind or want to discuss opportunities? Get in touch!
            </p>
          </div>
          
          <ContactSection />
        </div>
      </section>
 
      <Footer />
    </>
  );
}
