import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This is equivalent to --host 0.0.0.0
    port: 5173, // The port Vite will listen on
    // The following is the key to making HMR work in Docker
    watch: {
      usePolling: true
    }
  }
});
