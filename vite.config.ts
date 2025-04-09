import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import sitemap from "vite-plugin-sitemap";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({  
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    sitemap({
      hostname: "https://www.central-unamar.com.br",
      outDir: "dist",
      dynamicRoutes: [
        "/register",
        "/businesses",
        "/news",
        "/about",
        "/contact",
        "/plans",
      ]
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        dir: "dist", // Garante que o build cria o diretório
      },
    },
  },
}));
