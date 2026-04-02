import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fetchCloudbaseContent } from "./scripts/cloudbaseContentService.mjs";

function cloudbaseContentApi() {
  const handler = async (req, res, next) => {
    if (!req.url?.startsWith("/api/cloudbase/content")) {
      next();
      return;
    }

    try {
      const url = new URL(req.url, "http://localhost");
      const locale = url.searchParams.get("locale") ?? "zh";
      const copy = await fetchCloudbaseContent(locale);

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(JSON.stringify({ source: "cloudbase-server", copy }));
    } catch (error) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(
        JSON.stringify({
          source: "fallback",
          error: error?.message ?? "CloudBase server fetch failed",
        }),
      );
    }
  };

  return {
    name: "cloudbase-content-api",
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
}

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));
  
  const base = process.env.BASE_URL || "/";

  return {
    base,
    plugins: [react(), cloudbaseContentApi()],
    build: {
      // SSG 构建配置
      rollupOptions: {
        output: {
          // 确保资源路径正确
          entryFileNames: "assets/[name]-[hash].js",
          chunkFileNames: "assets/[name]-[hash].js",
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split(".");
            const ext = info[info.length - 1];
            if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(assetInfo.name)) {
              return "assets/images/[name]-[hash][extname]";
            }
            return "assets/[name]-[hash][extname]";
          },
        },
      },
    },
  };
});
