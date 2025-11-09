# GoWomen Landing Page - Project Structure

## Complete Folder Structure

```
gowomen-landing/
│
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles with Tailwind directives
│   │   ├── layout.tsx            # Root layout with metadata
│   │   └── page.tsx              # Main home page component
│   │
│   ├── components/
│   │   ├── Header.tsx            # Navigation header with logo and menu
│   │   ├── Hero.tsx              # Hero section with headline and CTA
│   │   ├── CorePillars.tsx       # Three core pillars section
│   │   ├── Offerings.tsx         # Four offerings cards section
│   │   ├── CTA.tsx               # Call-to-action section
│   │   └── Footer.tsx            # Footer with links
│   │
│   ├── types/
│   │   └── index.ts              # TypeScript type definitions
│   │
│   └── styles/                   # (Optional) Additional styles
│
├── public/
│   ├── images/                   # Image assets
│   └── icons/                    # Icon assets
│
├── .eslintrc.json                # ESLint configuration
├── .gitignore                    # Git ignore file
├── next.config.mjs               # Next.js configuration
├── package.json                  # Dependencies and scripts
├── postcss.config.js             # PostCSS configuration
├── README.md                     # Project documentation
├── tailwind.config.ts            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

## Component Breakdown

### 1. Header Component (`Header.tsx`)
- Fixed navigation bar
- Logo with GoWomen branding
- Navigation links: Home, Membership, Resources, Why Join Us?
- "Join Now" CTA button
- Responsive design with mobile menu consideration

### 2. Hero Component (`Hero.tsx`)
- Large headline: "Everything you need to excel in Go programming"
- Descriptive subtext
- "Join the Community" CTA button
- Purple gradient visual element
- Two-column layout (text + visual)

### 3. CorePillars Component (`CorePillars.tsx`)
- Section title: "Our Core Pillars"
- Three cards with icons:
  - Curated Learning (Book icon)
  - Expert Mentorship (Users icon)
  - Career Growth (Chart icon)
- Hover effects on cards

### 4. Offerings Component (`Offerings.tsx`)
- Section title: "What We Offer"
- Four offering cards:
  - Monthly Virtual Meetups (Calendar icon)
  - Hands-on Projects (Code icon)
  - Community Forum (Message icon)
  - Conference Access (Ticket icon)
- Responsive grid layout

### 5. CTA Component (`CTA.tsx`)
- "Ready to Start?" headline
- Encouraging subtext
- "Join GoWomen Today" button
- Purple gradient background

### 6. Footer Component (`Footer.tsx`)
- GoWomen logo
- Copyright notice
- Footer links: Terms, Privacy, Contact

## Styling Details

### Color Scheme
- Primary Purple: `#c026d3`
- Primary Dark: `#a21caf`
- Primary Light: `#e879f9`
- Secondary: `#581c87`
- Gradients: Purple to pink variations

### Typography
- Font Family: Inter (Google Fonts)
- Headings: Bold, large sizes (4xl to 6xl)
- Body: Regular weight, medium gray colors

### Spacing
- Consistent padding: py-16 (sections)
- Max width container: 7xl (1280px)
- Gap spacing: 6-12 units

### Effects
- Hover shadows on cards
- Smooth transitions (duration-200, duration-300)
- Border radius: 2xl, 3xl for modern look
- Backdrop blur on header

## Key Features

1. **Responsive Design**
   - Mobile-first approach
   - Grid layouts adapt to screen size
   - Flexible typography scaling

2. **Accessibility**
   - Semantic HTML structure
   - Proper heading hierarchy
   - Alt text considerations for images

3. **Performance**
   - Next.js App Router for optimal performance
   - Static generation where possible
   - Optimized images (when added)

4. **Modern UI/UX**
   - Clean, minimalist design
   - Purple gradient theme matching Women Who Go branding
   - Smooth animations and transitions
   - Clear visual hierarchy

## Setup Instructions

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Development Server:**
   ```bash
   npm run dev
   ```

3. **Build for Production:**
   ```bash
   npm run build
   ```

4. **Start Production Server:**
   ```bash
   npm start
   ```

## Customization Guide

### Adding Images
Place images in the `public/images/` directory and reference them:
```tsx
<Image src="/images/your-image.png" alt="Description" />
```

### Modifying Colors
Edit `tailwind.config.ts` to change the color scheme:
```typescript
colors: {
  primary: {
    DEFAULT: "#your-color",
  },
}
```

### Adding New Sections
1. Create a new component in `src/components/`
2. Import and add it to `src/app/page.tsx`
3. Follow the existing component patterns

### Updating Content
- Navigation: Edit the `navItems` array in `Header.tsx`
- Pillars: Edit the `pillars` array in `CorePillars.tsx`
- Offerings: Edit the `offerings` array in `Offerings.tsx`

## Technology Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Font:** Inter (via next/font)

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
Build first: `npm run build`
Then deploy the `.next` folder according to platform instructions.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimization

- Server-side rendering with Next.js
- Automatic code splitting
- Optimized font loading
- CSS purging via Tailwind

## Future Enhancements

- Add animation library (Framer Motion)
- Implement actual navigation routing
- Add form validation for sign-ups
- Integrate with backend API
- Add testimonials section
- Add team/speakers section
- Implement dark mode toggle
- Add internationalization (i18n)
