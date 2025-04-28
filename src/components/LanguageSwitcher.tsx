'use client';

import React from 'react';

interface LanguageSwitcherProps {
  currentLocale: string;
  setLocale: (locale: string) => void;
  supportedLocales: string[] | undefined;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLocale, setLocale, supportedLocales }) => {
  const safeLocales = Array.isArray(supportedLocales) ? supportedLocales : [];

  return (
    // Wrap buttons in a simple flex container to group them horizontally
    <div className="flex items-center gap-1.5"> 
      {safeLocales.map((locale) => {
        const isActive = currentLocale === locale;
        return (
          <button
            key={locale}
            onClick={() => setLocale(locale)}
            disabled={isActive}
            className={`
              w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950
              ${isActive
                ? 'bg-primary text-primary-foreground shadow-sm cursor-default' // Style for active button (primary color, round)
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground' // Style for inactive buttons (muted, round, no border)
              }
              disabled:opacity-70 disabled:cursor-not-allowed
            `}
            title={`Switch to ${locale.toUpperCase()}`}
            aria-label={`Switch to ${locale.toUpperCase()}`}
          >
            {locale.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher; 