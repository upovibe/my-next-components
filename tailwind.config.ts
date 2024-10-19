import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Enable class-based dark mode
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light theme colors (default)
        primary: "#f9f9f9", // Primary background
        secondary: "#f0f0f0", // Secondary background
        tertiary: "#e0e0e0", // Tertiary background (panels, cards)
        gold: "#b8860b", // Dark accent (buttons, links, golden)
        highlight: "#1e90ff", // Highlight color (active items)
        alert: "#ff6347", // Alert messages, errors
        border: "#dcdcdc", // Light border color
        deep: "#333333", // Deep text color
        soft: "#666666", // Soft text color
        muted: "#999999", // Muted text color

        // Dark theme colors (using distinct single-word names)
        shade: "#1a1a1a", // Dark primary background
        dim: "#2a2a2a", // Dark secondary background
        shadow: "#3a3a3a", // Dark tertiary background
        accent: "#ffd700", // Accent color (buttons, links, yellow)
        ocean: "#104e8b", // Dark highlight color (active items)
        crimson: "#8b0000", // Dark alert (error messages)
        coal: "#4a4a4a", // Dark border color
        light: "#f5f5f5", // Light text in dark mode
        pale: "#cccccc", // Soft text in dark mode
        faint: "#666666", // Muted text in dark mode
      },
      animation: {
        shiny: "shiny 1.5s infinite linear", // Shiny animation
        bounce: "bounce 1s infinite", // Bounce animation
        pulse: "pulse 2s infinite", // Pulse animation
        swing: "swing 1s infinite", // Swing animation
        shake: "shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite", // Shake animation

        // Slide-in/out animations
        slideInLeft: "slideInLeft 0.5s ease-out", // Slide-in from left
        slideInRight: "slideInRight 0.5s ease-out", // Slide-in from right
        slideInUp: "slideInUp 0.5s ease-out", // Slide-in from top
        slideInDown: "slideInDown 0.5s ease-out", // Slide-in from bottom
        slideOutLeft: "slideOutLeft 0.5s ease-out", // Slide-out to left
        slideOutRight: "slideOutRight 0.5s ease-out", // Slide-out to right
        slideOutUp: "slideOutUp 0.5s ease-out", // Slide-out to top
        slideOutDown: "slideOutDown 0.5s ease-out", // Slide-out to bottom

        // Fade-in/out animations
        fadeInUp: "fadeInUp 0.5s ease-in", // Fade in from bottom
        fadeInDown: "fadeInDown 0.5s ease-in", // Fade in from top
        fadeInLeft: "fadeInLeft 0.5s ease-in", // Fade in from left
        fadeInRight: "fadeInRight 0.5s ease-in", // Fade in from right
        fadeOutUp: "fadeOutUp 0.5s ease-out", // Fade out to top
        fadeOutDown: "fadeOutDown 0.5s ease-out", // Fade out to bottom
        fadeOutLeft: "fadeOutLeft 0.5s ease-out", // Fade out to left
        fadeOutRight: "fadeOutRight 0.5s ease-out", // Fade out to right

        // Bounce in/out animations
        bounceInUp: "bounceInUp 0.5s ease-in", // Bounce in from bottom
        bounceInDown: "bounceInDown 0.5s ease-in", // Bounce in from top
        bounceInLeft: "bounceInLeft 0.5s ease-in", // Bounce in from left
        bounceInRight: "bounceInRight 0.5s ease-in", // Bounce in from right
        bounceOutUp: "bounceOutUp 0.5s ease-out", // Bounce out to top
        bounceOutDown: "bounceOutDown 0.5s ease-out", // Bounce out to bottom
        bounceOutLeft: "bounceOutLeft 0.5s ease-out", // Bounce out to left
        bounceOutRight: "bounceOutRight 0.5s ease-out", // Bounce out to right

        // Enter animations
        iconEnter: "iconEnter 0.3s ease-in-out", // Scale-in animation for entering icons
        iconFadeIn: "iconFadeIn 0.5s ease-in-out", // Fade-in animation
        iconSlideIn: "iconSlideIn 0.5s ease-in-out", // Slide-in animation
        iconFlipIn: "iconFlipIn 0.6s ease-in-out", // Flip-in animation
        iconZoomIn: "iconZoomIn 0.4s ease-in-out", // Zoom-in animation
        iconSwingIn: "iconSwingIn 0.5s ease-in-out", // Swing-in animation

        // Exit animations
        iconExit: "iconExit 0.3s ease-in-out", // Scale-out animation for exiting icons
        iconFadeOut: "iconFadeOut 0.5s ease-in-out", // Fade-out animation
        iconSlideOut: "iconSlideOut 0.5s ease-in-out", // Slide-out animation
        iconFlipOut: "iconFlipOut 0.6s ease-in-out", // Flip-out animation
        iconZoomOut: "iconZoomOut 0.4s ease-in-out", // Zoom-out animation
        iconSwingOut: "iconSwingOut 0.5s ease-in-out", // Swing-out animation
      },
      keyframes: {
        shiny: {
          "0%": { backgroundPosition: "200%" },
          "50%": { backgroundPosition: "0%" },
          "100%": { backgroundPosition: "-200%" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15%)" },
        },
        pulse: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        swing: {
          "20%": { transform: "rotate(15deg)" },
          "50%": { transform: "rotate(-10deg)" },
          "80%": { transform: "rotate(5deg)" },
          "100%": { transform: "rotate(0)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-10px)" },
          "50%": { transform: "translateX(10px)" },
          "75%": { transform: "translateX(-10px)" },
        },

        // Slide-in/out keyframes
        slideInLeft: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInUp: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInDown: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideOutLeft: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(-100%)", opacity: "0" },
        },
        slideOutRight: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
        slideOutUp: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-100%)", opacity: "0" },
        },
        slideOutDown: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },

        // Fade-in/out keyframes
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInLeft: {
          "0%": { opacity: "0", transform: "translateX(-100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeInRight: {
          "0%": { opacity: "0", transform: "translateX(100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeOutUp: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-100%)" },
        },
        fadeOutDown: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(100%)" },
        },
        fadeOutLeft: {
          "0%": { opacity: "1", transform: "translateX(0)" },
          "100%": { opacity: "0", transform: "translateX(-100%)" },
        },
        fadeOutRight: {
          "0%": { opacity: "1", transform: "translateX(0)" },
          "100%": { opacity: "0", transform: "translateX(100%)" },
        },

        // Bounce in/out keyframes
        bounceInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "60%": { opacity: "1", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        bounceInDown: {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "60%": { opacity: "1", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        bounceInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "60%": { opacity: "1", transform: "translateX(10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        bounceInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "60%": { opacity: "1", transform: "translateX(-10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        bounceOutUp: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-30px)" },
        },
        bounceOutDown: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(30px)" },
        },
        bounceOutLeft: {
          "0%": { opacity: "1", transform: "translateX(0)" },
          "100%": { opacity: "0", transform: "translateX(-30px)" },
        },
        bounceOutRight: {
          "0%": { opacity: "1", transform: "translateX(0)" },
          "100%": { opacity: "0", transform: "translateX(30px)" },
        },

        // Enter keyframes
        iconEnter: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        iconFadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        iconSlideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        iconFlipIn: {
          '0%': { transform: 'rotateY(-90deg)', opacity: '0' },
          '100%': { transform: 'rotateY(0)', opacity: '1' },
        },
        iconZoomIn: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        iconSwingIn: {
          '0%': { transform: 'rotate(-30deg)', opacity: '0' },
          '100%': { transform: 'rotate(0)', opacity: '1' },
        },

        // Exit keyframes
        iconExit: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0)', opacity: '0' },
        },
        iconFadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        iconSlideOut: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        iconFlipOut: {
          '0%': { transform: 'rotateY(0)', opacity: '1' },
          '100%': { transform: 'rotateY(90deg)', opacity: '0' },
        },
        iconZoomOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.5)', opacity: '0' },
        },
        iconSwingOut: {
          '0%': { transform: 'rotate(0)', opacity: '1' },
          '100%': { transform: 'rotate(30deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
