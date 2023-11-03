import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // sets localhost port
    open: true, // opens browser on server start
  },
  resolve: {
    alias: {
      assets: "/src/assets",
      layouts: "/src/layouts",
      context: "/src/context",
      locales: "/src/locales",
    },
  },
});
