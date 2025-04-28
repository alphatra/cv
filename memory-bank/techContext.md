# Tech Context

## Technologies

-   **Framework:** Next.js (Assumption - based on Vercel deployment)
-   **UI Library:** React (Assumption - standard with Next.js)
-   **Styling:** Tailwind CSS (Assumption - modern common choice)
-   **Deployment:** Vercel

## Internationalization (i18n)

-   **Library/Method:** Custom content-based approach. Localized content is stored in Markdown files within `src/content/locales/{lang}/` (e.g., `src/content/locales/en/profile.md`). Content is likely loaded using `gray-matter` or similar based on the current locale.
-   **Languages:** English (en), Polish (pl), Italian (it), German (de)

## Development Setup

-   Standard Node.js environment (`npm` or `yarn`).
-   Code editor (e.g., VS Code).
-   Git for version control. 