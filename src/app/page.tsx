import { Github } from 'lucide-react';
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import GlobeCard from '@/components/GlobeCard'; // Enable GlobeCard import
import ContactBadges from '@/components/ContactBadges';
import Image from 'next/image';
import { headers } from 'next/headers'; // Import headers
import CvDisplay from '@/components/CvDisplay'; // Import the new client component

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
  skills?: { label: string; level: number }[] | string[];
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

// Helper function to read and parse a markdown file for a specific locale
const getContent = (filename: string, locale: string): ContentData => {
  const defaultLocale = 'en';
  let filePath;
  let fileContents;

  // Construct paths for locale-specific and fallback files
  const localeFilePath = path.join(process.cwd(), "src", "content", "locales", locale, filename);
  const fallbackFilePath = path.join(process.cwd(), "src", "content", "locales", defaultLocale, filename);

  // Try to read the locale-specific file first
  try {
    fileContents = fs.readFileSync(localeFilePath, "utf8");
    filePath = localeFilePath;
  } catch (error) {
    // If locale-specific file not found, try the fallback (English)
    console.warn(`Content file not found for locale '${locale}': ${filename}. Falling back to '${defaultLocale}'.`);
    try {
      fileContents = fs.readFileSync(fallbackFilePath, "utf8");
      filePath = fallbackFilePath;
    } catch (fallbackError) {
      // If fallback also fails, throw an error
      console.error(`Fallback content file not found for locale '${defaultLocale}': ${filename}`);
      // Return empty data or throw, depending on desired behavior
      // Returning empty object to avoid crashing the build if English is missing temporarily
      return {} as ContentData;
      // throw new Error(`Could not find ${filename} in locale '${locale}' or fallback '${defaultLocale}' directory`);
    }
  }

  const { data, content } = matter(fileContents);
  // Combine front matter data and markdown content (if any)
  return { ...data, markdownContent: content } as ContentData;
};

// Define supported locales
const supportedLocales = ['en', 'pl', 'it', 'de'];
// const defaultLocale = 'en'; // No longer needed here

/**
 * CV Page Server Component
 * Loads all localized content and passes it to the CvDisplay client component.
 */
export default function CvPage() {
  // Load content for all locales
  const allContent: Record<string, Record<string, any>> = {}; // Use 'any' for simplicity or refine LocaleContent type

  const contentFiles = [
    "profile.md", "skills.md", "soft-skills.md", "education.md",
    "experience.md", "languages.md", "projects.md", "certificates.md",
    "interests.md", "activities.md", "contact.md"
  ];

  supportedLocales.forEach(locale => {
    allContent[locale] = {};
    contentFiles.forEach(filename => {
      const baseName = filename.replace('.md', '');
      const contentKey = baseName.includes('-') ? baseName.split('-').join('') : baseName;
      allContent[locale][contentKey] = getContent(filename, locale);
    });
  });

  // Render the Client Component, passing all loaded content and supported locales
  return <CvDisplay allContent={allContent} supportedLocales={supportedLocales} />;
}

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
// ... existing render code ...
