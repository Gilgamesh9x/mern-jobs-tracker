// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy API requests to the backend server
    proxy: {
      // what this code does is, in our app, any request made to /api will be directed to our target URL. And then we change the origin
      "/api": {
        target: "http://localhost:5100",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
