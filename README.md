# African Education Framework

A comprehensive digital transformation framework for K-12 schools across Africa, built with Astro and designed to showcase strategies for advancing education in the digital space.

## Overview

This website showcases the K-12 Digital Experience Campus Framework - a blueprint for transforming African schools into digitally-enabled learning ecosystems that prepare students for the 2050 job market.

## Features

- **Comprehensive Framework Documentation**: Detailed implementation guide covering infrastructure, digital literacy, AI/analytics, and more
- **Blog**: Insights and updates on digital transformation in education
- **Mobile-First Design**: Responsive layout optimized for all devices
- **Fast & Modern**: Built with Astro for optimal performance
- **SEO Optimized**: Sitemap and meta tags for discoverability

## Tech Stack

- **Astro** - Static site generator
- **TypeScript** - Type safety
- **MDX** - Enhanced markdown for blog posts
- **Vercel** - Deployment platform

## Project Structure

```
/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable components
│   ├── layouts/     # Page layouts
│   ├── pages/       # Site pages and blog posts
│   │   ├── index.astro
│   │   ├── framework.astro
│   │   ├── about.astro
│   │   └── blog/
│   └── styles/      # Global styles
├── astro.config.mjs # Astro configuration
└── package.json     # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The site will be available at `http://localhost:4321`

## Deployment

This site is configured for deployment on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect Astro and configure the build settings
4. Deploy!

Alternatively, you can deploy to any static hosting provider:

```bash
npm run build
# Upload the 'dist' folder to your hosting provider
```

## Core Framework Principles

1. **Universal Access** - Digital tools for all students
2. **Digital Literacy** - Critical thinking paired with technology skills
3. **Mobile-First** - Optimized for smartphones as primary devices
4. **Cost Efficient** - Open-source solutions maximizing limited budgets
5. **Data-Driven** - Analytics informing decisions
6. **Community-Centered** - Seamless experience for students, staff, and parents

## Contributing

This framework is designed to evolve. Feedback and contributions are welcome to help improve digital education across Africa.

## License

See [LICENSE](LICENSE) file for details.
