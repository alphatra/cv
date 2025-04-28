'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const router = useRouter();
  const [activeLanguage, setActiveLanguage] = React.useState<string>('en');

  // Languages available in the application
  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'pl', label: 'PL' },
    { code: 'de', label: 'DE' },
    { code: 'it', label: 'IT' },
  ];

  const changeLanguage = (lang: string) => {
    setActiveLanguage(lang);
    // Here you would update the language in your i18n setup
    // For now, we're just setting state
    // router.push(`/${lang}`);
  };

  return (
    <motion.div 
      className={`flex items-center gap-2 ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`px-2 py-1 rounded-md text-xs font-semibold transition-colors ${
            activeLanguage === lang.code
              ? 'bg-[#570EFF] text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
          aria-label={`Switch to ${lang.label} language`}
        >
          {lang.label}
        </button>
      ))}
    </motion.div>
  );
};

export default LanguageSwitcher; 