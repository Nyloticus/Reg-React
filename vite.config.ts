import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";

export default (mode: string) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
    resolve: {
      alias: {
        src: "/src",
      },
    },
    server: {
      proxy: {
        "/api": {
          target: process.env.VITE_APP_BASE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),      
        },
      },
    },
  });
};
