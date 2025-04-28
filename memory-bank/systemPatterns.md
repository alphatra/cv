# System Patterns

## Internationalization (i18n) Architecture

-   **Locale Detection:** Mechanism TBD (Needs investigation - could be URL path, state management, context, etc.).
-   **Translation Storage:** Content is stored as Markdown files organized by locale: `src/content/locales/{lang}/{section}.md`. Files contain frontmatter (likely parsed by `gray-matter`) and Markdown body.
-   **Component Integration:** Components receive localized content as props, likely loaded server-side (e.g., in `getStaticProps` or Server Components) by reading and parsing the appropriate Markdown file based on the determined locale.
-   **Language Switching:** A UI element likely updates the current locale state/route, causing the page to re-render with content loaded from the corresponding locale directory.

*(Note: The `src/locales/*.json` files appear to be unused.)* 