'use client';

import React, { useState } from 'react';
import { Github } from 'lucide-react';
import Image from 'next/image';
import GlobeCard from '@/components/GlobeCard';
import ContactBadges from '@/components/ContactBadges';
import LanguageSwitcher from '@/components/LanguageSwitcher'; // Import the switcher

// Define the structure for a single locale's content
interface LocaleContent {
  profile?: ContentData;
  skills?: ContentData; // Changed from skillsData to match key generation
  softskills?: ContentData; // Changed from softSkillsData
  education?: ContentData;
  experience?: ContentData;
  languages?: ContentData;
  projects?: ContentData;
  certificates?: ContentData;
  interests?: ContentData;
  activities?: ContentData;
  contact?: ContentData;
  [key: string]: ContentData | undefined; // Index signature for flexibility
}

// Define the structure for all loaded content
interface AllContent {
  [locale: string]: LocaleContent;
}

// Re-define ContentData locally or import from page.tsx if shared
// Basic version for CvDisplay props:
interface ContentData {
  title?: string;
  text?: string;
  name?: string;
  image_url?: string;
  job_title_line1?: string;
  job_title_line2?: string;
  tagline?: string;
  tagline_description?: string;
  skills?: { label: string; level: number }[] | string[];
  softSkills?: string[]; // Note: key in markdown might just be `skills`
  education?: { degree: string; institution: string; level?: string; period: string; tags: string[] }[];
  experience?: { role: string; company: string; type?: string; period: string; desc: string }[];
  languages?: { label: string; level: string }[];
  projects?: { title: string; stage?: string; tags: string[]; link?: string; desc: string }[];
  certificates?: { title: string; issuer: string; date: string }[];
  interests?: { title: string; subtitle: string; text: string }[];
  activities?: { title: string; text: string; intro?: string }[];
  github_label?: string;
  projects_label?: string;
  location?: string;
  phone?: string;
  email?: string;
  linkedin?: string;
  github_user?: string;
  github_link?: string;
  markdownContent?: string;
  intro?: string;
}

interface CvDisplayProps {
  allContent: AllContent;
  supportedLocales: string[]; // Add supportedLocales prop
}

const CvDisplay: React.FC<CvDisplayProps> = ({ allContent, supportedLocales }) => {
  const defaultLocale = 'en';
  // Remove inference: const supportedLocales = Object.keys(allContent);
  
  // Ensure supportedLocales is an array before using it
  const locales = Array.isArray(supportedLocales) ? supportedLocales : [defaultLocale];
  const initialLocale = locales.includes(defaultLocale) ? defaultLocale : locales[0] || 'en'; // Safer default

  const [locale, setLocale] = useState<string>(initialLocale);

  // Get content for the currently selected locale
  const currentContent = allContent[locale] || allContent[defaultLocale] || {}; // Fallback

  // Extract typed data from the current locale's content
  // Use optional chaining and nullish coalescing for safety
  const profile = currentContent.profile ?? {};
  const skillsData = currentContent.skills ?? {};
  const softSkillsData = currentContent.softskills ?? {}; // Use corrected key
  const educationData = currentContent.education ?? {};
  const experienceData = currentContent.experience ?? {};
  const languagesData = currentContent.languages ?? {};
  const projectsData = currentContent.projects ?? {};
  const certificatesData = currentContent.certificates ?? {};
  const interestsData = currentContent.interests ?? {};
  const activitiesData = currentContent.activities ?? {};
  const contact = currentContent.contact ?? {};

  // Extract specific arrays/values, ensuring fallbacks
  const skillsList: { label: string; level: number }[] = skillsData.skills as { label: string; level: number }[] || [];
  // Assuming soft skills are under the 'skills' key in softskills.md based on original code
  const softSkillsList: string[] = softSkillsData.skills as string[] || [];
  const languagesList: { label: string; level: string }[] = languagesData.languages || [];
  const projectsList: { title: string; stage?: string; tags: string[]; link?: string; desc: string }[] = projectsData.projects || [];
  const certificatesList: { title: string; issuer: string; date: string }[] = certificatesData.certificates || [];
  const interestsList: { title: string; subtitle: string; text: string }[] = interestsData.interests || [];
  const activitiesList: { title: string; text: string }[] = activitiesData.activities || [];
  const educationItems: { degree: string; institution: string; level?: string; period: string; tags: string[] }[] = educationData.education || [];
  const experienceItems: { role: string; company: string; type?: string; period: string; desc: string }[] = experienceData.experience || [];

  /* === Helpers (Copied from page.tsx) === */
  const CustomBadge = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span className={`px-2 py-1 rounded-full text-xs uppercase tracking-wide ${className || 'bg-gray-950 text-white'}`}>
      {children}
    </span>
  );

  const Smiley = ({ filled }: { filled: boolean }) => (
    <span className={`inline-block ${filled ? "opacity-100 text-yellow-400 animate-pulse" : "opacity-30 text-gray-600"}`}>😊</span>
  );

  const AccentText = ({ children }: { children: React.ReactNode }) => (
    <span className="text-[#570EFF] font-semibold">{children}</span>
  );

  const shortenUrl = (url: string | undefined): string => {
    if (!url) return '';
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.hostname.replace(/^www\./, '');
    } catch {
      return url;
    }
  };

  /* === Render (Copied and adapted from page.tsx) === */
  return (
    <div className="w-[210mm] mx-auto bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50 font-[Oxygen,sans-serif] leading-snug relative">
      {/* Language Switcher */}
      <LanguageSwitcher
        currentLocale={locale}
        setLocale={setLocale}
        supportedLocales={locales} // Pass the prop down
      />

      {/* === PAGE 1 ===================================================== */}
      <section className="relative p-6">
         {/* Header */}
         <div className="flex gap-[1%] mb-8">
            {/* Block 1: Image */}
            <div className="w-[26%] flex-shrink-0 bg-gray-300 dark:bg-gray-800 rounded-lg overflow-hidden">
              <Image
                src={profile.image_url || "/avatar.jpg"}
                alt={profile.name || "Profile Picture"}
                className="w-full h-full object-cover"
                width={148}
                height={172}
                priority
              />
            </div>
            {/* Block 2: Title/Tagline */}
            <div className="w-[35%] flex-shrink-0 bg-gray-100 text-black dark:bg-white rounded-lg p-6 flex flex-col">
              <h2 className="text-3xl font-bold leading-tight text-[#570EFF]">
                {profile.job_title_line1 || 'FULL-STACK'}
                <br />
                {profile.job_title_line2 || 'DEVELOPER'}
              </h2>
              <p className="mt-3 text-lg uppercase text-black">
                {profile.tagline || 'CREATIVE & AMBITIOUS'}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                {profile.tagline_description || 'Challenges drive me...'}
              </p>
            </div>
            {/* Block 3: GitHub/QR/Globe */}
            <div className="w-[37%] flex-shrink-0 rounded-lg">
               <div className="grid grid-cols-5 grid-rows-2 gap-[3%] h-full">
                  {/* Top Cell */}
                  <div className="col-span-5 row-span-1 bg-purple-100 text-black dark:bg-purple-300 dark:text-black rounded-lg p-4 flex flex-col justify-between">
                     <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{projectsData.github_label || 'GITHUB'}</span>
                        <Github className="w-5 h-5" />
                     </div>
                     <div className="text-center">
                        <span className="text-2xl font-bold text-black underline decoration-2 underline-offset-2">
                        {projectsData.projects_label || 'MY PROJECTS'}
                        </span>
                     </div>
                  </div>
                  {/* Bottom-Left Cell */}
                  <div className="col-span-3 row-span-1 bg-purple-100 text-black dark:bg-purple-300 dark:text-purple-800 border-2 border-purple-100 dark:border-purple-300 rounded-lg flex items-center justify-center">
                     <a href={contact.github_link || '#'} target="_blank" rel="noopener noreferrer">
                        <Image src="/qr.png" alt="GitHub QR Code" width={100} height={100} className="w-full h-full rounded-md" />
                     </a>
                  </div>
                  {/* Bottom-Right Cell */}
                  <div className="col-span-2 row-span-1 bg-purple-100 dark:bg-purple-300 rounded-lg overflow-hidden">
                     <GlobeCard />
                  </div>
               </div>
            </div>
         </div>
         {/* Name */}
         <h1 className="mt-8 text-5xl font-bold tracking-wide">{profile.name || "NAME"}</h1>
         {/* Contact */}
         <ContactBadges contact={contact} />

         {/* Main Grid: Profile/Edu/Soft/Skills */}
         <div className="grid grid-cols-2 gap-6 mt-8">
            {/* Col 1 */}
            <div className="flex flex-col gap-6">
               {/* Profile */}
               <div className="bg-blue-600 text-white dark:bg-[#570EFF] shadow-inner border-purple-500/50 p-4 rounded-lg">
                  <h3 className="text-xl font-normal mb-3">{profile.title || 'Profile'}</h3>
                  <p className="text-sm text-gray-200 dark:text-gray-200 leading-relaxed whitespace-pre-line">
                     {profile.text}
                  </p>
               </div>
               {/* Education */}
               <div>
                  <h3 className="text-xl font-normal text-black dark:text-white mb-4">{educationData.title || 'Education'}</h3>
                  {educationItems.map((item, index) => (
                     <div key={index} className="mb-4 last:mb-0">
                        <div className="bg-white border border-gray-300 text-black p-4 rounded-lg">
                           <p className="text-lg font-semibold mb-1">{item.degree}</p>
                           <p className="text-sm">
                              <AccentText>{item.institution}</AccentText>
                              {item.level && <span className="text-xs text-gray-500 ml-2">{item.level}</span>}
                           </p>
                           <p className="text-xs text-gray-700 mt-1 mb-2">{item.period}</p>
                           {item.tags && item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                 {item.tags.map((tag) => (
                                    <CustomBadge key={tag} className="bg-gray-950 text-white text-[8px]">{tag}</CustomBadge>
                                 ))}
                              </div>
                           )}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            {/* Col 2 */}
            <div className="flex flex-col gap-6">
               {/* Soft skills */}
               <div className="bg-purple-50 text-black dark:text-black dark:bg-purple-300 border border-purple-200 dark:border-purple-300 p-4 rounded-lg">
                  <h3 className="text-xl font-normal mb-3">{softSkillsData.title || 'Soft Skills'}</h3>
                  <div className="flex flex-wrap gap-2">
                     {softSkillsList.map((skill) => (
                        <CustomBadge key={skill} className="uppercase border-transparent bg-purple-100 text-purple-900 dark:bg-gray-950 dark:text-gray-100">
                           {skill}
                        </CustomBadge>
                     ))}
                  </div>
               </div>
               {/* Programming skills */}
               <div className="bg-gray-100 text-black dark:text-white dark:bg-gray-900 p-4 rounded-lg">
                  <h3 className="text-xl font-normal mb-3">{skillsData.title || 'Programming Skills'}</h3>
                  <ul className="space-y-2">
                     {skillsList.map(({ label, level }) => (
                        <li key={label} className="flex items-center justify-between text-sm text-gray-300">
                           <CustomBadge className="bg-[#570EFF] text-white border border-white">{label}</CustomBadge>
                           <span className="flex gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                 <Smiley key={i} filled={i < level} />
                              ))}
                           </span>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </div>
      </section>

      {/* === PAGE 2 ===================================================== */}
      <section className="relative p-6 break-before-page">
         {/* Work experience & Languages */}
         <div className="grid grid-cols-3 gap-6">
            {/* Work experience */}
            <div className="col-span-2">
               <h3 className="text-xl font-normal text-white mb-4">{experienceData.title || 'Experience'}</h3>
               {experienceItems.map(({ role, company, period, desc, type }, index) => (
                  <div key={`${role}-${company}-${index}`} className="mb-4 last:mb-0">
                     <div className="bg-white border border-gray-300 text-black p-4 rounded-lg">
                        <p className="font-semibold">{role}</p>
                        <p className="text-sm mt-1">
                           <AccentText>{company}</AccentText>
                           {type && <span className="text-xs ml-2 text-gray-600">{type}</span>}
                        </p>
                        <p className="font-normal text-xs text-gray-700 mt-1">{period}</p>
                        <p className="text-sm mt-1 text-gray-700">{desc}</p>
                     </div>
                  </div>
               ))}
            </div>
            {/* Languages */}
            <div>
               <h3 className="text-xl font-normal mb-4 text-gray-100">{languagesData.title || 'Languages'}</h3>
               <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg">
                  <ul className="space-y-3">
                     {languagesList.map(({ label, level }) => (
                        <li key={label} className="text-sm text-gray-300 flex flex-col items-start">
                           <CustomBadge className="bg-[#570EFF] text-white border border-white">{label}</CustomBadge>
                           <span className="mt-1">{level}</span>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </div>

         {/* Projects & Certificates */}
         <div className="grid grid-cols-2 gap-6 mt-10">
            {/* Projects */}
            <div>
               <h3 className="text-xl font-normal mb-4">{projectsData.title || 'Projects'}</h3>
               {projectsList.map(({ title, stage, tags, link, desc }) => (
                  <div key={title} className="mb-4 last:mb-0">
                     <div className="bg-white border border-gray-300 text-black p-4 rounded-lg">
                        <p className="font-semibold">
                           {title}
                           {stage && <span className="ml-2 text-xs text-gray-400">{stage}</span>}
                        </p>
                        {tags && tags.length > 0 && (
                           <div className="flex flex-wrap gap-2 mt-2">
                              {tags.map((t) => (
                                 <CustomBadge key={t} className="uppercase text-[10px]">{t}</CustomBadge>
                              ))}
                           </div>
                        )}
                        {link && (
                           <a href={link} target="_blank" rel="noopener noreferrer" className="block text-xs text-[#570EFF] hover:underline mt-2 truncate" title={link}>
                              {shortenUrl(link)}
                           </a>
                        )}
                        <p className="text-sm text-gray-700 mt-2">{desc}</p>
                     </div>
                  </div>
               ))}
            </div>
            {/* Certificates */}
            <div>
               <h3 className="text-xl font-normal mb-4">{certificatesData.title || 'Certificates'}</h3>
               {certificatesList.map(({ title, issuer, date }) => (
                  <div key={title} className="mb-4 last:mb-0">
                     <div className="bg-purple-100 border border-purple-200 text-black p-4 rounded-lg">
                        <p className="font-semibold">{title}</p>
                        <p className="text-xs text-gray-700"><AccentText>{issuer}</AccentText></p>
                        <p className="text-xs mt-1 text-gray-700">{date}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* === PAGE 3 ===================================================== */}
      <section className="relative p-6 break-before-page">
         {/* Interests & Activities */}
         <div className="grid grid-cols-2 gap-6">
            {/* Interests */}
            <div>
               <h3 className="text-xl font-normal text-white mb-4">{interestsData.title || 'Interests'}</h3>
               {interestsList.map(({ title, subtitle, text }) => (
                  <div key={title} className="mb-4 last:mb-0">
                     <div className="bg-white border border-gray-300 text-black p-4 rounded-lg">
                        <p className="font-semibold">{title}</p>
                        <p className="text-xs text-[#570EFF] mb-2">{subtitle}</p>
                        <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">{text}</p>
                     </div>
                  </div>
               ))}
            </div>
            {/* Activities */}
            <div>
               <div className="mb-4">
                  <div className="bg-[#1E1E1E] p-4 rounded-lg">
                     <h3 className="text-xl font-normal text-white mb-2">{activitiesData.title || 'Activities'}</h3>
                     {activitiesData.intro && <p className="text-sm text-gray-300">{activitiesData.intro}</p>}
                  </div>
               </div>
               {activitiesList.map(({ title, text }) => (
                  <div key={title} className="mb-4 last:mb-0">
                     <div className="bg-white border border-gray-300 text-black p-4 rounded-lg">
                        <p className="font-semibold mb-2">{title}</p>
                        <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">{text}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* GDPR footer (Example - needs localization) */}
         <p className="text-[10px] leading-snug text-gray-400 mt-8">
            {/* TODO: Localize GDPR text - maybe load from contact.md? */}
            I consent to the processing of my personal data... (GDPR)
         </p>
      </section>
    </div>
  );
};

export default CvDisplay; 