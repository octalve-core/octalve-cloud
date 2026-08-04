import forms from "@tailwindcss/forms";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cloud: {
          blue: "#0064E0",
          blueDark: "#004FB3",
          soft: "#E5ECFF",
          mist: "#F6F8FF",
          navy: "#000A16",
          ash: "#334155",
          border: "#DDE6F6"
        },
        octalve: {
          red: "#E61525",
          blue: "#0064E0",
          green: "#29BE3E",
          orange: "#FC7E24",
          purple: "#2A006D"
        }
      },
      boxShadow: {
        cloud: "0 24px 80px rgba(0, 42, 112, 0.12)",
        soft: "0 14px 40px rgba(15, 23, 42, 0.08)"
      },
      borderRadius: {
        cloud: "1.5rem"
      },
      backgroundImage: {
        "cloud-radial": "radial-gradient(circle at top left, rgba(0, 100, 224, 0.18), transparent 38%), radial-gradient(circle at 70% 20%, rgba(41, 190, 62, 0.10), transparent 28%), linear-gradient(180deg, #ffffff 0%, #f6f8ff 100%)"
      }
    }
  },
  plugins: [forms]
};

export default config;
