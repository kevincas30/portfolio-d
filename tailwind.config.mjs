/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        electric: {
          50:  '#e6eeff',
          100: '#c0d3ff',
          200: '#92b3ff',
          300: '#5e8fff',
          400: '#2d6dff',
          500: '#0052cc',
          600: '#0040a0',
          700: '#003080',
          800: '#002060',
          900: '#001040',
        },
      },
      fontFamily: {
        grandstander: ['Grandstander', 'cursive'],
        raleway: ['Raleway', 'sans-serif'],
        borel: ['Borel', 'cursive'],
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
        'grid-lines': "linear-gradient(rgba(0,82,204,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,82,204,0.04) 1px, transparent 1px)",
        'hero-gradient': 'linear-gradient(135deg, #001a4d 0%, #002a7a 30%, #0040a0 60%, #0052cc 100%)',
        'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 60%)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'drift': 'drift 15s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.7s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(0,82,204,0.4)' },
          '50%': { boxShadow: '0 0 35px rgba(0,82,204,0.8), 0 0 60px rgba(0,82,204,0.3)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '33%': { transform: 'translateX(12px) translateY(-8px)' },
          '66%': { transform: 'translateX(-8px) translateY(10px)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'electric': '0 0 20px rgba(0,82,204,0.5), 0 4px 24px rgba(0,82,204,0.3)',
        'electric-lg': '0 0 40px rgba(0,82,204,0.6), 0 8px 40px rgba(0,82,204,0.4)',
        'card': '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
        'card-hover': '0 20px 60px rgba(0,82,204,0.2), 0 8px 24px rgba(0,0,0,0.12)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
