module.exports = {
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          o2: "var(--color-primary-o2)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          o2: "var(--color-accent-o2)",
        },
        text: {
          DEFAULT: "var(--color-text)",
          primary: "var(--color-text-primary)",
        },
        background: {
          DEFAULT: "var(--color-background)",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: "var(--color-text)",
            h1: {
              color: "var(--color-text)",
            },
            h2: {
              color: "var(--color-text)",
            },
            h3: {
              color: "var(--color-text)",
            },
            h4: {
              color: "var(--color-text)",
            },
            h5: {
              color: "var(--color-text)",
            },
            h6: {
              color: "var(--color-text)",
            },
            strong: {
              color: "var(--color-text)",
            },
            a: {
              color: "var(--color-primary)",
            },
            "ol > li::before": {
              color: "var(--color-primary)",
            },
            "ul > li::before": {
              background: "var(--color-primary)",
            },
            code: {
              color: "var(--color-text)",
              background: "var(--color-background)",
              borderRadius: "4px",
              padding: "2px 4px",
            },
            "code::before": {
              content: "",
            },
            "code::after": {
              content: "",
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {
      scale: ["group-hover"],
      transform: ["group-hover"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
