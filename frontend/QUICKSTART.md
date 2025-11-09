# 🚀 Quick Start Guide

Get your GoWomen landing page up and running in minutes!

## Prerequisites

- **Node.js** 18.x or higher ([Download here](https://nodejs.org/))
- **npm**, **yarn**, or **pnpm** package manager

## Installation Steps

### Option 1: Automatic Setup (Linux/Mac)

```bash
# Make the script executable (if not already)
chmod +x setup.sh

# Run the setup script
./setup.sh
```

### Option 2: Manual Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## What You'll See

Your landing page includes:

✅ Navigation header with GoWomen branding  
✅ Hero section with compelling headline  
✅ Core Pillars section (Learning, Mentorship, Growth)  
✅ What We Offer section (4 key features)  
✅ Call-to-action section  
✅ Footer with links  

## Available Commands

```bash
# Development
npm run dev          # Start dev server at localhost:3000

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Next Steps

### 1. Customize Content

Edit these files to customize your content:

- **Navigation**: `src/components/Header.tsx`
- **Hero Section**: `src/components/Hero.tsx`
- **Core Pillars**: `src/components/CorePillars.tsx`
- **Offerings**: `src/components/Offerings.tsx`
- **CTA**: `src/components/CTA.tsx`
- **Footer**: `src/components/Footer.tsx`

### 2. Customize Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    DEFAULT: "#c026d3",  // Change this!
    dark: "#a21caf",
    light: "#e879f9",
  },
}
```

### 3. Add Images

1. Place images in `public/images/`
2. Reference them in your components:

```tsx
import Image from 'next/image';

<Image 
  src="/images/your-image.png" 
  alt="Description"
  width={500}
  height={300}
/>
```

### 4. Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy! 🎉

## Troubleshooting

### Port 3000 already in use?

```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Dependencies not installing?

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors?

```bash
# Check your TypeScript configuration
npx tsc --noEmit
```

## Project Structure Overview

```
gowomen-landing/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   └── types/            # TypeScript types
├── public/               # Static assets
└── Configuration files
```

## Support & Resources

- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **TypeScript**: [typescriptlang.org/docs](https://www.typescriptlang.org/docs/)

## Common Questions

**Q: Can I use Yarn or pnpm instead of npm?**  
A: Yes! Just replace `npm` with `yarn` or `pnpm` in all commands.

**Q: How do I add more pages?**  
A: Create new files in `src/app/` directory. For example, `src/app/about/page.tsx` creates an `/about` route.

**Q: How do I add a contact form?**  
A: Create a new component in `src/components/ContactForm.tsx` and add it to your page.

**Q: Can I use a different CSS framework?**  
A: Yes, but you'll need to remove Tailwind and install your preferred framework.

## Performance Tips

- Use Next.js Image component for optimized images
- Enable caching for static assets
- Use `loading="lazy"` for images below the fold
- Minimize bundle size by code splitting

## Security Notes

- Never commit `.env` files with sensitive data
- Use environment variables for API keys
- Keep dependencies updated: `npm audit fix`

---

**Need help?** Check the detailed documentation in `README.md` and `PROJECT_STRUCTURE.md`

Happy coding! 🎉
