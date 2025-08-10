/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["media"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        christine: "oklch(68.739% 0.16396 56.807)",
        christine50: "oklch(100% 0 none)",
        christine100: "oklch(98.292% 0.00758 48.656)",
        christine200: "oklch(93.978% 0.03149 53.485)",
        christine300: "oklch(89.667% 0.05522 54.509)",
        christine400: "oklch(85.747% 0.08009 55.322)",
        christine500: "oklch(82.231% 0.10344 57.578)",
        christine600: "oklch(79.152% 0.12637 58.692)",
        christine700: "oklch(76.129% 0.14616 58.678)",
        christine800: "oklch(73.754% 0.16239 57.892)",
        christine900: "oklch(71.593% 0.1726 55.909)",
        christine950: "oklch(68.739% 0.16396 56.807)",

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar-hide")],
};
