import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fetchCloudbaseContent } from "./scripts/cloudbaseContentService.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, "dist");
const envFiles = [".env", ".env.local"];

function loadLocalEnvFiles() {
  for (const name of envFiles) {
    const filepath = path.join(__dirname, name);

    try {
      const content = readFileSync(filepath, "utf8");

      for (const line of content.split(/\r?\n/)) {
        const trimmed = line.trim();

        if (!trimmed || trimmed.startsWith("#")) {
          continue;
        }

        const separatorIndex = trimmed.indexOf("=");

        if (separatorIndex === -1) {
          continue;
        }

        const key = trimmed.slice(0, separatorIndex).trim();
        const value = trimmed.slice(separatorIndex + 1).trim();

        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    } catch {}
  }
}

loadLocalEnvFiles();

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

async function serveStaticFile(res, pathname) {
  const normalizedPath = pathname === "/" ? "/index.html" : pathname;
  const filepath = path.join(distDir, normalizedPath);
  const ext = path.extname(filepath).toLowerCase();

  try {
    const file = await readFile(filepath);
    res.statusCode = 200;
    res.setHeader("Content-Type", mimeTypes[ext] ?? "application/octet-stream");
    res.end(file);
    return true;
  } catch {
    return false;
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");

  if (req.method === "GET" && url.pathname === "/api/health") {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/cloudbase/content") {
    try {
      const locale = url.searchParams.get("locale") ?? "zh";
      const copy = await fetchCloudbaseContent(locale);
      sendJson(res, 200, { source: "cloudbase-server", copy });
    } catch (error) {
      sendJson(res, 500, {
        source: "fallback",
        error: error?.message ?? "CloudBase server fetch failed",
      });
    }

    return;
  }

  if (await serveStaticFile(res, url.pathname)) {
    return;
  }

  try {
    const indexHtml = await readFile(path.join(distDir, "index.html"));
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(indexHtml);
  } catch {
    res.statusCode = 500;
    res.end("Missing build output. Run `npm run build` first.");
  }
});

const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? "0.0.0.0";

server.listen(port, host, () => {
  console.log(`Production server listening on http://${host}:${port}`);
});
