import type { Config } from 'tailwindcss'

import { nextui } from '@nextui-org/react'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)'
      },
      maxWidth: {
        '8xl': '90rem'
      },
      fontFamily: {
        cinzel: ['var(--font-cinzel)', 'sans-serif']
      }
    }
  },
  darkMode: 'class',
  plugins: [
    typography,
    nextui({
      themes: {
        light: {
          colors: {
            primary: '#d5004f',
            secondary: '#b63c86'
          }
        },
        dark: {
          colors: {
            primary: '#d5004f',
            secondary: '#b63c86'
          }
        }
      }
    })
  ]
}
export default config
