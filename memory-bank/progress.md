# Progress

## Current Status

-   **Core CV Structure:** In place.
-   **Deployment:** Hosted on Vercel.
-   **Internationalization (i18n):**
    -   Implemented using a custom content-based approach (`src/content/locales/{lang}/{section}.md`).
    -   English (en) language functional.
    -   Polish (pl), Italian (it), German (de) languages were **not working** due to missing content files.
    -   **Fix Applied:** Copied `en` content files to `pl`, `it`, `de` directories (`src/content/locales/*`). These languages should now load content (initially English), pending actual translation.
    -   The `src/locales/*.json` files seem unused.

## What's Left

-   **Translate Content:** Manually translate the Markdown files in `src/content/locales/pl/`, `src/content/locales/it/`, and `src/content/locales/de/`.
-   **Verify Loading:** Confirm how content is loaded in components (e.g., `src/app/page.tsx`) and how language switching works.
-   **Cleanup (Optional):** Delete the unused `src/locales/` directory and its JSON files after confirmation.

## Known Issues

-   Content for pl, it, de is currently English placeholder content and needs translation. 