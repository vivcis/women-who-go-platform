# GoWomen Landing Page

A modern, responsive landing page for GoWomen community built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern UI with purple gradient theme
- 📱 Fully responsive design
- ⚡ Built with Next.js 14 App Router
- 🔷 TypeScript for type safety
- 🎭 Tailwind CSS for styling
- 🎯 Lucide React icons
- ✨ Smooth animations and transitions

## Project Structure

```
gowomen-landing/
├── src/
│   ├── app/
│   │   ├── globals.css       # Global styles with Tailwind
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/
│   │   ├── Header.tsx         # Navigation header
│   │   ├── Hero.tsx           # Hero section
│   │   ├── CorePillars.tsx    # Core pillars section
│   │   ├── Offerings.tsx      # What we offer section
│   │   ├── CTA.tsx            # Call to action section
│   │   └── Footer.tsx         # Footer
│   └── types/
│       └── index.ts           # TypeScript type definitions
├── public/                    # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── next.config.mjs
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository or navigate to the project directory:

```bash
cd gowomen-landing
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Customization

### Colors

The primary color scheme can be customized in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    DEFAULT: "#c026d3",  // Main purple
    dark: "#a21caf",     // Darker purple
    light: "#e879f9",    // Lighter purple
  },
}
```

### Content

- **Navigation**: Edit `src/components/Header.tsx`
- **Hero Section**: Edit `src/components/Hero.tsx`
- **Core Pillars**: Edit the `pillars` array in `src/components/CorePillars.tsx`
- **Offerings**: Edit the `offerings` array in `src/components/Offerings.tsx`
- **CTA**: Edit `src/components/CTA.tsx`
- **Footer**: Edit `src/components/Footer.tsx`

## Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository to Vercel
3. Vercel will automatically detect Next.js and deploy

### Other Platforms

You can also deploy to:
- Netlify
- AWS Amplify
- Digital Ocean
- Railway

Build the application first:

```bash
npm run build
```

Then follow the hosting provider's deployment instructions.

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **React 18** - JavaScript library for building user interfaces

## License

MIT License - feel free to use this project for your own purposes.

## Support

For support, create an issue in the repository or contact the maintainers.
