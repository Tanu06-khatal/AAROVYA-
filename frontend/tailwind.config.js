/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB', // Primary Blue
          light: '#3B82F6',   // Secondary Blue
          dark: '#1D4ED8',
          50: '#F5F9FF',      // Very Light Blue
          100: '#DBEAFE',     // Light Blue
          200: '#BFDBFE',
          300: '#93C5FD',
          500: '#3B82F6',     // Secondary Blue
          600: '#2563EB',     // Primary Blue
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',     // Dark Blue
        },
        navy: {
          DEFAULT: '#1E3A8A', // Dark Blue
          light: '#2563EB',
          dark: '#172554',    // Primary Text
        },
        background: '#F5F9FF', // Very Light Blue Background
        surface: '#FFFFFF',
        textPrimary: '#172554', // Primary Text
        textSecondary: '#64748B',
        borderLight: '#DBEAFE', // Border
        success: '#16A34A',
        warning: '#F59E0B',
        danger: '#DC2626',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(30, 58, 138, 0.05), 0 1px 2px 0 rgba(30, 58, 138, 0.03)',
        'card-hover': '0 10px 15px -3px rgba(30, 58, 138, 0.08), 0 4px 6px -2px rgba(30, 58, 138, 0.04)',
        'elevated': '0 20px 25px -5px rgba(30, 58, 138, 0.1), 0 10px 10px -5px rgba(30, 58, 138, 0.04)',
      },
      screens: {
        'xs': '420px',
      }
    },
  },
  plugins: [],
}
