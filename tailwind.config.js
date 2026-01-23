/* global module */
// Tailwind config locked to UMV Modern Corporate tokens
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        umv: {
          primary: '#0B1E3B', // Deep Navy (Headlines, Backgrounds)
          accent: '#00C2CB',  // Electric Cyan (Buttons, Highlights)
          surface: '#F8FAFC', // Pale Grey (Alternative Backgrounds)
          dark:   '#008ba3',  // Darker Teal (For Gradients)
        }
        ,
        // Portal-specific design tokens (Crystal Light / Zero Grey)
        portal: {
          navy: '#0B1E3B',      // Brand Navy (header, dark text)
          navyInk: '#1e293b',   // Navy ink for headings/content
          ice: '#F0F7FF',       // Brand Ice (page background / boxed hero)
          teal: '#00C2CB',      // Brand Teal (accent / CTA)
          tealDark: '#0090C0',  // Darker teal for gradients
          muted: '#475569',     // Muted blue / body text
          subtitle: '#E0F2FE',  // Subtitle tint for navy header
          surface: '#FFFFFF',   // Card surfaces
        }
      },
      backgroundImage: {
        'gradient-energy': 'linear-gradient(90deg, #00C2CB 0%, #0090C0 100%)',
        'gradient-editorial': 'linear-gradient(to bottom right, #00E5FF, #00C2CB, #008ba3)',
        'tech-grid': "linear-gradient(to right, rgba(11, 30, 59, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(11, 30, 59, 0.03) 1px, transparent 1px)"
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.05em', // For that "Editorial" headline look
      }
    },
  },
  plugins: [],
}
