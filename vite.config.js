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

  return {
    plugins: [react(), cloudbaseContentApi()],
  };
});
