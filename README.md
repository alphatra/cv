# CV Web

<div align="center">
  <h1>Interactive CV Web Application</h1>
  <p>A modern, interactive curriculum vitae built with Next.js and TailwindCSS</p>
  
  <p>
    <a href="#features">Features</a> •
    <a href="#multilingual">Multilingual</a> •
    <a href="#installation">Installation</a> •
    <a href="#usage">Usage</a> •
    <a href="#contributing">Contributing</a>
  </p>
</div>

## Overview

CV Web is a modern, interactive curriculum vitae application that presents professional information in a visually appealing format inspired by traditional A4 CV layouts while leveraging the interactive capabilities of the web.

## Features

- **Elegant Design** - Pixel-perfect CV design optimized for both web viewing and PDF printing
- **Dark/Light Mode** - Toggle between dark and light themes for better readability
- **Interactive Elements** - Animated components enhance the user experience
- **Static Export** - Built as a static site for fast loading and easy deployment
- **Responsive Layout** - Optimized for various screen sizes while maintaining A4 proportions
- **Markdown Content** - Easy content management with Markdown files
- **PDF Export** - Generate a printable PDF version

## Multilingual

The application supports multiple languages:

- 🇬🇧 English (EN)
- 🇵🇱 Polish (PL)
- 🇩🇪 German (DE)
- 🇮🇹 Italian (IT)

The language system allows for seamless switching between languages while maintaining the same layout and design.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Content**: Markdown with [gray-matter](https://github.com/jonschlinkert/gray-matter)
- **Illustrations**: Custom components
- **QR Code**: Generated with [qrcode](https://github.com/soldair/node-qrcode)

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/cv_web.git

# Navigate to the project directory
cd cv_web

# Install dependencies
npm install
```

## Usage

```bash
# Development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Content Management

All CV content is stored in Markdown files in the `src/content/` directory:

- `profile.md` - Personal information and bio
- `skills.md` - Programming and technical skills
- `soft-skills.md` - Soft skills and personal attributes
- `education.md` - Educational background
- `experience.md` - Work history and experience
- `languages.md` - Language proficiency
- `projects.md` - Portfolio projects
- `certificates.md` - Professional certifications
- `interests.md` - Personal interests
- `activities.md` - Other activities and achievements
- `contact.md` - Contact information

The content from these files is automatically loaded during build time and used to generate the CV pages.

## Project Structure

```
cv_web/
├── public/          # Static assets and build artifacts
├── src/
│   ├── app/         # Next.js app router pages
│   ├── components/  # Reusable React components
│   ├── content/     # Markdown content files
│   ├── lib/         # Utility functions
│   └── locales/     # Language translations
└── ...
```

## Deployment

The project is configured for static exports, which makes it easy to deploy to any static hosting service like Vercel, Netlify, or GitHub Pages.

```bash
# Build for static export
npm run build
```

The static output will be available in the `out` directory.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">
  <p>Made with ❤️ by Gracjan Ziemiański</p>
</div>
