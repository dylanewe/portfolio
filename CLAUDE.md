# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Dylan Ewe's portfolio website - a React-based single-page application built with Vite, featuring a cyberpunk/neon aesthetic with dark/light theme support. Originally designed in Figma: https://www.figma.com/design/zQqACkGUgkLccFd1odtUic/Dylan-Ewe-Portfolio-Website

## Development Commands

- `npm i` - Install dependencies
- `npm run dev` - Start development server (runs on port 3000, auto-opens browser)
- `npm run build` - Build for production (outputs to `build/` directory)

## Tech Stack

- **Build Tool**: Vite 6.3.5 with SWC plugin for fast React compilation
- **Framework**: React 18.3.1 (with TypeScript via JSX)
- **Animation**: Motion (formerly Framer Motion) for all animations and transitions
- **UI Components**: Radix UI primitives + custom components (shadcn/ui style)
- **Styling**: Tailwind CSS v4 with custom CSS variables for theming
- **Icons**: Lucide React

## Architecture

### Application Structure

**Single-page application with client-side view switching** (not using React Router):
- `App.tsx` manages global state: `activeView` ("home" | "projects") and `isDark` theme state
- Theme persistence handled via localStorage
- Navigation between views uses state + smooth scrolling, not routing

### Key Components

**Main sections** (in `src/components/`):
- `Navigation.tsx` - Fixed header with logo, nav links, theme toggle
- `Hero.tsx` - Landing section with profile image and animated title
- `About.tsx` - About section
- `Skills.tsx` - Skills showcase
- `Experience.tsx` - Work experience timeline
- `ProjectsGrid.tsx` - Project cards with expand/collapse functionality (no routing)
- `Footer.tsx` - Footer section

**Supporting components** (in `src/components/figma/` and `src/components/ui/`):
- Reusable UI primitives based on shadcn/ui patterns
- `ImageWithFallback.tsx` for handling image loading

### Data Location

- Static data embedded directly in components (see `ProjectsGrid.tsx` lines 21-55 for projects array)
- Profile image stored in `data/profile.JPG`

## Theming System

**CSS Variables approach** (defined in `src/index.css`):
- Light theme: `:root` (lines 932-975)
- Dark theme: `.dark` class (lines 977-1016)
- Custom color variables:
  - `--neon-cyan`: Primary accent (light: #09c, dark: #00d9ff)
  - `--neon-purple`: Secondary accent (light: #72c, dark: #b833ff)
  - `--glitch-pink`: #ff0080
  - `--glitch-green`: #0f8

**Theme toggle**:
- Controlled in `App.tsx` via `isDark` state
- Applies/removes `.dark` class on `document.documentElement`
- Persists to localStorage with key "theme"

## Styling Conventions

- **Fonts**: JetBrains Mono for headers/buttons/monospace, Inter for body text (loaded via Google Fonts in `App.tsx`)
- **Spacing**: Uses Tailwind's spacing scale via CSS variables
- **Animations**: All animations use Motion, not CSS transitions
- **Layout**: Flexbox and Grid preferred, responsive design with Tailwind breakpoints

## Path Aliases

Vite config includes `@` alias pointing to `./src` (line 49 in `vite.config.ts`), plus numerous package version aliases for dependencies.

## Important Implementation Details

1. **No TypeScript config file** - Types inferred from `.tsx` extensions
2. **Image imports** - Static assets imported directly (e.g., `import profileImage from "../data/profile.JPG"`)
3. **Motion layout animations** - Use `layoutId` for shared element transitions (see Navigation active indicator)
4. **Inline styles for theme colors** - Many components use `style={{ color: "var(--neon-cyan)" }}` to reference CSS variables
5. **Project data** - Currently hardcoded in `ProjectsGrid.tsx`. To add projects, modify the `projects` array
6. **View switching** - Handled by conditional rendering in `App.tsx`, not React Router

## Attribution

- Uses shadcn/ui components under MIT license
- Uses Unsplash photos in project thumbnails
