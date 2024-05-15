import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  // main theme
  theme: {
    extend: {
      tokens: {
        colors: {
          text: { value: "green" },
        },
      },
      semanticTokens: {
        colors: {
          body: {
            value: {
              base: "{colors.green.600}",
              _osDark: "{colors.green.400}",
            },
          },
        },
      },
    },
  },
  themes: {
    primary: {
      tokens: {
        colors: {
          text: { value: "red" },
        },
      },
      semanticTokens: {
        colors: {
          muted: { value: "{colors.purple.600}" },
          body: {
            value: {
              base: "{colors.red.600}",
              _osDark: "{colors.red.400}",
            },
          },
          bodyBg: {
            value: {
              base: "{colors.purple.100}",
            },
          },
        },
      },
    },
    secondary: {
      tokens: {
        colors: {
          text: { value: "green" },
        },
      },
      semanticTokens: {
        colors: {
          muted: { value: "{colors.green.200}" },
          body: {
            value: {
              base: "{colors.green.600}",
              _osDark: "{colors.green.400}",
            },
          },
          bodyBg: {
            value: {
              base: "#2C2C2C",
            },
          },
        },
      },
    },
  },
  staticCss: {
    themes: ["primary", "secondary"],
  },
  globalCss: {
    html: {
      h: "full",
    },
  },
  jsxFramework: "react",
  validation: "error",
  // The output directory for your css system
  outdir: "styled-system",
});
