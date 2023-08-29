import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
  ],
  theme: {
    extend: {
      
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide'),
    require("daisyui"),

  ],
  daisyui: {
    themes: [{
      wireframe: {
        ...require("daisyui/src/theming/themes")["[data-theme=wireframe]"],
        "accent": "#cbd5e1",
      },
      black: {
        ...require("daisyui/src/theming/themes")["[data-theme=black]"],
        "accent": "#374151",
      },
   },
  
    ],
    styled: false
  },
}
export default config
