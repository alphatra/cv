import { Github } from 'lucide-react';
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import GlobeCard from '@/components/GlobeCard'; // Enable GlobeCard import
import ContactBadges from '@/components/ContactBadges';
import Image from 'next/image';

// Define a basic type for the content data
interface ContentData {
  // Define known properties for better type safety
  title?: string;
  text?: string;
  name?: string;
  image_url?: string;
  job_title_line1?: string;
  job_title_line2?: string;
  tagline?: string;
  tagline_description?: string;
  skills?: { label: string; level: number }[];
  softSkills?: string[]; // Assuming soft-skills.md just has a list
  education?: { degree: string; institution: string; level?: string; period: string; tags: string[] }[];
  experience?: { role: string; company: string; type?: string; period: string; desc: string }[];
  languages?: { label: string; level: string }[];
  projects?: { title: string; stage?: string; tags: string[]; link?: string; desc: string }[];
  certificates?: { title: string; issuer: string; date: string }[];
  interests?: { title: string; subtitle: string; text: string }[];
  activities?: { title: string; text: string; intro?: string }[]; // Added intro based on usage
  github_label?: string;
  projects_label?: string;
  location?: string;
  phone?: string;
  email?: string;
  linkedin?: string;
  github_user?: string;
  github_link?: string;
  markdownContent?: string; // Added for the actual content part
  intro?: string; // Added intro from activities
  // Add other potential keys from your .md files if needed
}

// Helper function to read and parse a markdown file
const getContent = (filename: string): ContentData => {
  let filePath;
  let fileContents;
  
  // Try to read from src/content first (works in dev)
  try {
    filePath = path.join(process.cwd(), "src", "content", filename);
    fileContents = fs.readFileSync(filePath, "utf8");
  } catch (error) {
    // If that fails, try public/content (works in production)
    try {
      filePath = path.join(process.cwd(), "public", "content", filename);
      fileContents = fs.readFileSync(filePath, "utf8");
    } catch (secondError) {
      throw new Error(`Could not find ${filename} in either src/content or public/content directories`);
    }
  }
  
  const { data, content } = matter(fileContents);
  // Combine front matter data and markdown content (if any)
  return { ...data, markdownContent: content } as ContentData;
};

/**
 * Pixel‑perfect CV based on provided design (3 A4 pages)
 * TailwindCSS + shadcn/ui Cards + Framer Motion animations.
 * Content loaded from Markdown files in src/content.
 */
export default function Cv() {
  // Load content from Markdown files
  const profile: ContentData = getContent("profile.md");
  const skillsData: ContentData = getContent("skills.md");
  const softSkillsData: ContentData = getContent("soft-skills.md");
  const educationData: ContentData = getContent("education.md");
  const experienceData: ContentData = getContent("experience.md");
  const languagesData: ContentData = getContent("languages.md");
  const projectsData: ContentData = getContent("projects.md");
  const certificatesData: ContentData = getContent("certificates.md");
  const interestsData: ContentData = getContent("interests.md");
  const activitiesData: ContentData = getContent("activities.md");
  // const contact: ContentData = getContent("contact.md"); // Comment out if contact is truly unused now

  // Extract typed data (add type safety as needed)
  const skills: { label: string; level: number }[] = skillsData.skills || [];
  const softSkills: string[] = softSkillsData.softSkills || [];
  const languages: { label: string; level: string }[] = languagesData.languages || [];
  const projects: { title: string; stage?: string; tags: string[]; link?: string; desc: string }[] = projectsData.projects || [];
  const certificates: { title: string; issuer: string; date: string }[] = certificatesData.certificates || [];
  const interests: { title: string; subtitle: string; text: string }[] = interestsData.interests || [];
  const activities: { title: string; text: string }[] = activitiesData.activities || [];
  const educationItems: { degree: string; institution: string; level?: string; period: string; tags: string[] }[] = educationData.education || [];
  const experienceItems: { role: string; company: string; type?: string; period: string; desc: string }[] = experienceData.experience || [];


  /* === Helpers === */
  // Re-defined Badge locally for easier styling override specific to this page if needed
  const CustomBadge = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span className={`px-2 py-1 rounded-full text-xs uppercase tracking-wide ${className || 'bg-gray-950 text-white'}`}>
      {children}
    </span>
  );

  // Simple pulsing animation for smileys
  const Smiley = ({ filled }: { filled: boolean }) => (
    <span className={`inline-block ${filled ? "opacity-100 text-yellow-400 animate-pulse" : "opacity-30 text-gray-600"}`}>😊</span>
  );

  const AccentText = ({ children }: { children: React.ReactNode }) => (
    <span className="text-[#570EFF] font-semibold">{children}</span>
  );

  const shortenUrl = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.hostname.replace(/^www\./, ''); // Remove www.
    } catch /* (e) - removed unused */ {
      return url; // Return original if parsing fails
    }
  };

  /* === Render === */
  return (
    // Apply Oxygen font globally for this page
    <div className="w-[210mm] mx-auto bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50 font-[Oxygen,sans-serif] leading-snug">
      {/* === PAGE 1 ===================================================== */}
      <section className="relative p-6">
        {/* Header - Simplified structure with divs */}
        <div className="flex gap-[1%] mb-8"> {/* Main flex container with 1% gap */}

          {/* Block 1: Image Placeholder (26%) */}
          <div className="w-[26%] flex-shrink-0 bg-gray-300 dark:bg-gray-800 rounded-lg overflow-hidden"> {/* Adjusted light bg */}
            <Image
              src={profile.image_url || "/avatar.jpg"} // Use profile image or a fallback
              alt={profile.name || "Profile Picture"} // Use profile name or fallback alt text
              className="w-full h-full object-cover" // Fill container, cover aspect ratio
              width={148} // Provide width hint (can be approximate based on design)
              height={172} // Provide height hint (can be approximate based on design)
              priority // Load image eagerly as it's likely in the initial viewport
            />
          </div>

          {/* Block 2: Text Placeholder (35%) */}
          <div className="w-[35%] flex-shrink-0 bg-gray-100 text-black dark:bg-white rounded-lg p-6 flex flex-col"> {/* Adjusted light bg */}
            <h2 className="text-3xl font-bold leading-tight text-[#570EFF]">
              {profile.job_title_line1 || 'FULL-STACK'}
              <br />
              {profile.job_title_line2 || 'DEVELOPER'}
            </h2>
            <p className="mt-3 text-lg uppercase text-black">
              {profile.tagline || 'CREATIVE & AMBITIOUS'}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              {profile.tagline_description || 'Challenges drive me to achieve ambitious goals.'}
            </p>
          </div>

          {/* Block 3: Nested Grid Placeholder (37%) */}
          <div className="w-[37%] flex-shrink-0 rounded-lg"> {/* Container for grid */}
            <div className="grid grid-cols-5 grid-rows-2 gap-[3%] h-full">

              {/* Top Cell */}
              <div className="col-span-5 row-span-1 bg-purple-100 text-black dark:bg-purple-300 dark:text-black rounded-lg p-4 flex flex-col justify-between"> {/* Adjusted light bg/text */}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{projectsData.github_label || 'GITHUB'}</span>
                  <Github className="w-5 h-5" /> {/* Color inherited */}
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-black underline decoration-2 underline-offset-2">
                    {projectsData.projects_label || 'MY PROJECTS'}
                  </span>
                </div>
              </div>

              {/* Bottom-Left Cell */}
              <div className="col-span-3 row-span-1 bg-purple-100 text-black dark:bg-purple-300 dark:text-purple-800 border-2 border-purple-100 dark:border-purple-300 rounded-lg flex items-center justify-center"> {/* Adjusted light bg/text/border */}
                <div className="w-full h-full bg-gray-500 animate-pulse"></div> {/* Placeholder */}
              </div>

              {/* Bottom-Right Cell */}
              <div className="col-span-2 row-span-1 bg-purple-100 dark:bg-purple-300 rounded-lg overflow-hidden"> {/* Adjusted light bg */}
                <GlobeCard /> {/* Enable GlobeCard usage */}
                {/* <div className="w-full h-full bg-gray-500 animate-pulse"></div> */} {/* Comment out placeholder */}
              </div>

            </div>
          </div>

        </div>

        {/* Name */}
        <h1 className="mt-8 text-5xl font-bold tracking-wide">GRACJAN ZIEMIAŃSKI</h1> {/* Placeholder */}

        {/* Contact badges - Use the client component */}
        <ContactBadges contact={profile} />
        {/* <div>Contact Placeholder</div> */} {/* Placeholder */}

        {/* Profile + Education + Soft skills + Programming skills */}
        <div className="grid grid-cols-2 gap-6 mt-8">
          {/* Column 1: Profile + Education */}
          <div className="flex flex-col gap-6">
            {/* Profile */}
            <div className="bg-blue-600 text-white dark:bg-[#570EFF] shadow-inner border-purple-500/50 p-4 rounded-lg">
              <h3 className="text-xl font-normal mb-3">{profile.title}</h3> {/* Color inherited */}
              <p className="text-sm text-gray-200 dark:text-gray-200 leading-relaxed whitespace-pre-line">
                {profile.text}
              </p>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-xl font-normal text-black dark:text-white mb-4">{educationData.title}</h3> {/* font-normal */}
              {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
              {educationItems.map((item, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="bg-white border border-gray-300 text-black p-4 rounded-lg">
                    <p className="text-lg font-semibold mb-1"> 
                      {item.degree}
                    </p>
                    <p className="text-sm">
                      <AccentText>{item.institution}</AccentText>
                      {item.level && <span className="text-xs text-gray-500 ml-2">{item.level}</span>}
                    </p>
                    <p className="text-xs text-gray-700 mt-1 mb-2">
                      {item.period}
                    </p>
                    {/* Tags at the bottom */}
                    {item.tags && item.tags.length > 0 && (
                       <div className="flex flex-wrap gap-2 mt-2">
                        {item.tags.map((tag) => (
                          // Restored base badge styles along with the smaller font size
                          <CustomBadge key={tag} className="bg-gray-950 text-white text-[8px]">{tag}</CustomBadge>
                        ))}
                       </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Soft + Skills */}
          <div className="flex flex-col gap-6">
            {/* Soft skills */}
            <div className="bg-purple-50 text-black dark:text-black dark:bg-purple-300 border border-purple-200 dark:border-purple-300 p-4 rounded-lg">
              <h3 className="text-xl font-normal mb-3">{softSkillsData.title}</h3> {/* Color inherited */}
              <div className="flex flex-wrap gap-2">
                {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
                {softSkills.map((skill, index) => (
                  <CustomBadge key={skill} className="uppercase border-transparent bg-purple-100 text-purple-900 dark:bg-gray-950 dark:text-gray-100">
                    {skill}
                  </CustomBadge>
                ))}
              </div>
            </div>

            {/* Programming skills */}
            <div className="bg-gray-100 text-black dark:text-white dark:bg-gray-900 p-4 rounded-lg">
              <h3 className="text-xl font-normal mb-3">{skillsData.title}</h3> {/* Color inherited */}
              <ul className="space-y-2">
                {skills.map(({ label, level }) => (
                  <li key={label} className="flex items-center justify-between text-sm text-gray-300">
                    <CustomBadge className="bg-[#570EFF] text-white border border-white">{label}</CustomBadge> {/* Styled Badge */}
                    <span className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Smiley key={i} filled={i < level} /> // Using animated Smiley
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
            <h3 className="text-xl font-normal text-white mb-4">{experienceData.title}</h3> {/* font-normal */}
            {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
            {experienceItems.map(({ role, company, period, desc, type }, index) => (
              <div key={`${role}-${company}-${index}`} className="mb-4 last:mb-0">
                <div className="bg-white border border-gray-300 text-black p-4 rounded-lg">
                  <p className="font-semibold">
                    {role}
                  </p>
                   <p className="text-sm mt-1">
                    <AccentText>{company}</AccentText> {/* Highlighted company */}
                    {type && <span className="text-xs ml-2 text-gray-600">{type}</span>} {/* Smaller type */}
                   </p>
                  <p className="font-normal text-xs text-gray-700 mt-1"> {period}</p>
                  <p className="text-sm mt-1 text-gray-700">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-xl font-normal mb-4 text-gray-100">{languagesData.title}</h3> {/* font-normal */}
            <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg">
              <ul className="space-y-3"> {/* Increased spacing */}
                {languages.map(({ label, level }) => (
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
            <h3 className="text-xl font-normal mb-4">{projectsData.title}</h3> {/* font-normal */}
            {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
            {projects.map(({ title, stage, tags, link, desc }, index) => (
              <div key={title} className="mb-4 last:mb-0">
                <div className="bg-white border border-gray-300 text-black p-4 rounded-lg">
                  <p className="font-semibold">
                    {title}
                    {stage && <span className="ml-2 text-xs text-gray-400">{stage}</span>}
                  </p>
                  {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
                      {tags.map((t, tagIndex) => (
                        <CustomBadge key={t} className="uppercase text-[10px]">{t}</CustomBadge>
                      ))}
                    </div>
                  )}
                   {link && (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-xs text-[#570EFF] hover:underline mt-2 truncate" // Accent color link, truncate added
                      title={link} // Show full link on hover
                    >
                      {shortenUrl(link)} {/* Shortened URL */}
                    </a>
                  )}
                  <p className="text-sm text-gray-700 mt-2">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Certificates */}
          <div>
            <h3 className="text-xl font-normal mb-4">{certificatesData.title}</h3> {/* font-normal */}
            {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
            {certificates.map(({ title, issuer, date }, index) => (
              <div key={title} className="mb-4 last:mb-0">
                <div className="bg-purple-100 border border-purple-200 text-black p-4 rounded-lg">
                  <p className="font-semibold">
                    {title}
                  </p>
                  <p className="text-xs text-gray-700"><AccentText>{issuer}</AccentText></p> {/* Highlighted issuer */}
                  <p className="text-xs mt-1 text-gray-700">{date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === PAGE 3 ===================================================== */}
      <section className="relative p-6 break-before-page">
        <div className="grid grid-cols-2 gap-6">
          {/* Interests */}
          <div>
            <h3 className="text-xl font-normal text-white mb-4">{interestsData.title}</h3> {/* White text, font-normal */}
            {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
            {interests.map(({ title, subtitle, text }, index) => (
              <div key={title} className="mb-4 last:mb-0">
                <div className="bg-white border border-gray-300 text-black p-4 rounded-lg">
                  <p className="font-semibold">{title}</p>
                  <p className="text-xs text-[#570EFF] mb-2">{subtitle}</p> {/* Accent color */}
                  <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">{text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Other activities */}
          <div>
             {/* Wrap the title/intro card in a div for margin control */}
             <div className="mb-4">
               <div className="bg-[#1E1E1E] p-4 rounded-lg">
                    <h3 className="text-xl font-normal text-white mb-2">{activitiesData.title}</h3> {/* White text, font-normal */}
                    {activitiesData.intro && <p className="text-sm text-gray-300">{activitiesData.intro}</p>}
               </div>
             </div>
            {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
            {activities.map(({ title, text }, index) => (
              <div key={title} className="mb-4 last:mb-0">
                <div className="bg-white border border-gray-300 text-black p-4 rounded-lg">
                  <p className="font-semibold mb-2">{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GDPR footer */}
        <p className="text-[10px] leading-snug text-gray-400 mt-8">
          I consent to the processing of my personal data contained in this CV for recruitment purposes by the companies I apply to, in accordance with the Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data, and repealing Directive 95/46/EC (General Data Protection Regulation) (OJ EU L 119 of 04.05.2016, p. 1).
        </p>
      </section>
    </div>
  );
}
