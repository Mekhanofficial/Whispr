import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        secondarylight: "var(--secondary-light)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
    darkMode: "class",
    theme: {
      extend: {
        animation: {
          swing: "swing 2.5s ease-in-out infinite",
          "swing-child": "swing-child 2.5s ease-in-out infinite",
        },
        keyframes: {
          swing: {
            "0%, 100%": { transform: "rotate(-10deg)" },
            "50%": { transform: "rotate(10deg)" },
          },
          "swing-child": {
            "0%, 100%": {
              transform: "translateX(-8px) rotate(-3deg)",
              animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            },
            "50%": {
              transform: "translateX(8px) rotate(3deg)",
              animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            },
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
