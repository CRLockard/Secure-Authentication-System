import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite needs this plugin so React JSX files are processed correctly.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
