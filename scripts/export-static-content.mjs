import { mkdir, writeFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { content as fallbackContent } from "../src/data/siteContent.js";
import { fetchCloudbaseContent } from "./cloudbaseContentService.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.join(__dirname, "..", "public", "data");
const locales = ["zh", "en"];
const envFiles = [".env", ".env.local"];

function loadLocalEnvFiles() {
  for (const name of envFiles) {
    const filepath = path.join(__dirname, "..", name);

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

async function exportLocale(locale) {
  try {
    const copy = await fetchCloudbaseContent(locale);
    return { copy, source: "cloudbase-static-export" };
  } catch (error) {
    console.warn(`Static export fallback for locale "${locale}": ${error?.message ?? "unknown error"}`);
    return { copy: fallbackContent[locale], source: "local-fallback-export" };
  }
}

async function main() {
  loadLocalEnvFiles();
  await mkdir(outputDir, { recursive: true });

  for (const locale of locales) {
    const payload = await exportLocale(locale);
    const filepath = path.join(outputDir, `content.${locale}.json`);

    await writeFile(filepath, JSON.stringify(payload, null, 2), "utf8");
    console.log(`Exported static content: public/data/content.${locale}.json (${payload.source})`);
  }
}

main().catch((error) => {
  console.error("Static content export failed");
  console.error(error);
  process.exit(1);
});
