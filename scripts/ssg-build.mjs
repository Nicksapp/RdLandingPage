#!/usr/bin/env node
/**
 * SSG (Static Site Generation) Build Script
 * 预渲染所有路由为静态 HTML
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { execSync } from "node:child_process";
import { fetchCloudbaseContent } from "./cloudbaseContentService.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");
const distDir = path.join(rootDir, "dist");

// 加载 .env.local
const envPath = path.join(rootDir, ".env.local");
try {
  const envContent = readFileSync(envPath, "utf8");
  for (const line of envContent.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;
    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  }
} catch (error) {
  console.warn("Failed to load .env.local:", error.message);
}

const SITE_URL = process.env.SITE_URL || "https://your-domain.com";

/**
 * 从 Vite 构建的 index.html 中提取模板
 */
function extractViteTemplate() {
  const indexPath = path.join(distDir, "index.html");
  if (!existsSync(indexPath)) {
    throw new Error("dist/index.html not found. Please run vite build first.");
  }
  
  const html = readFileSync(indexPath, "utf8");
  
  // 查找 root div 的内容（应该是空的或包含 vite 的占位符）
  const rootMatch = html.match(/<div id="root">(.*?)<\/div>/s);
  if (!rootMatch) {
    throw new Error("Could not find #root div in dist/index.html");
  }
  
  // 创建模板：将 root 内容替换为占位符
  const template = html.replace(
    /<div id="root">.*?<\/div>/s,
    '<div id="root"><!--SSR_CONTENT--></div>'
  );
  
  return template;
}

/**
 * 生成静态 HTML
 */
function generateHTML(template, content, { title, description, lang, preloadData, path: pagePath }) {
  let html = template;
  
  // 替换 SSR 内容
  html = html.replace("<!--SSR_CONTENT-->", content);
  
  // 设置 lang 属性
  html = html.replace(/<html[^>]*>/, `<html lang="${lang}">`);
  
  // 替换或添加 title
  if (title) {
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  }
  
  // 替换或添加 meta description（移除所有现有的 description 标签）
  const descTag = `<meta name="description" content="${description}">`;
  html = html.replace(/<meta name="description" content="[^"]*">/g, "");
  // 在 </head> 前插入新的 description
  html = html.replace("</head>", `  ${descTag}\n</head>`);
  
  // 添加预加载数据脚本（在 </head> 前）
  if (preloadData) {
    const dataScript = `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadData).replace(/</g, '\\u003c')};</script>`;
    html = html.replace("</head>", `  ${dataScript}\n</head>`);
  }
  
  // 添加 SEO meta 标签
  const seoTags = `
  <!-- Open Graph -->
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${SITE_URL}${pagePath || ""}">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  
  <!-- Canonical -->
  <link rel="canonical" href="${SITE_URL}${pagePath || ""}">
  `;
  
  html = html.replace("</head>", `${seoTags}\n</head>`);
  
  return html;
}

/**
 * 生成简单的页面内容（用于 SEO 爬虫可见内容）
 */
function generatePageContent(page, data, lang) {
  const copy = data.copy;
  
  switch (page) {
    case "home":
      return `
        <div class="page-home">
          <section class="hero">
            <h1>${copy.heroTitle || "广东嵘德"}</h1>
            <p>${copy.heroTagline || ""}</p>
          </section>
          <section class="capabilities">
            <h2>${copy.capabilitiesTitle || "核心业务"}</h2>
            <p>${copy.capabilitiesLead || ""}</p>
          </section>
        </div>
      `;
    case "products":
      return `
        <div class="page-products">
          <h1>${copy.productsPageTitle || "产品中心"}</h1>
          <p>${copy.productsPageLead || ""}</p>
          <div class="product-groups">
            ${(copy.productGroups || []).map(g => `
              <div class="group">
                <h2>${g.title}</h2>
                <p>${g.lead || ""}</p>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    case "productDetail":
      const product = data.product;
      if (!product) return `<div class="page-product"><h1>产品未找到</h1></div>`;
      return `
        <div class="page-product">
          <h1>${product.title}</h1>
          <p>${product.text || ""}</p>
          <div class="specs">
            ${(product.specs || []).map(s => `<span>${s}</span>`).join("")}
          </div>
        </div>
      `;
    default:
      return `<div><h1>页面加载中...</h1></div>`;
  }
}

/**
 * 获取 SEO 标题和描述
 */
function getSEOMeta(page, data, lang) {
  const copy = data.copy;
  
  const defaults = {
    zh: {
      home: { title: "广东嵘德 - 高端钢管与阀门解决方案", desc: "广东嵘德专注于高端钢管、工业阀门及配套流体控制部件的研发、集成与交付" },
      products: { title: "产品中心 - 广东嵘德", desc: "查看广东嵘德的钢管、阀门与配套产品" },
      productDetail: { title: "产品详情 - 广东嵘德", desc: "了解产品规格与应用" },
    },
    en: {
      home: { title: "Guangdong Rongde - Premium Steel Pipe & Valve Solutions", desc: "Focused on premium steel pipes, industrial valves, and fluid control components" },
      products: { title: "Products - Guangdong Rongde", desc: "Browse steel pipes, valves and accessories" },
      productDetail: { title: "Product Detail - Guangdong Rongde", desc: "Product specifications and applications" },
    }
  };

  if (page === "productDetail" && data.product) {
    const title = lang === "zh" 
      ? `${data.product.title} - 广东嵘德`
      : `${data.product.title} - Guangdong Rongde`;
    return { title, desc: data.product.text || defaults[lang].productDetail.desc };
  }

  return defaults[lang][page] || defaults[lang].home;
}

/**
 * 清空目录内容但保留目录
 */
function cleanDirectory(dir) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
    return;
  }
  
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // 递归删除子目录
      deleteDirectory(fullPath);
    } else {
      // 删除文件，但保留原始的 index.html（Vite 构建的）
      if (entry.name !== "index.html") {
        // unlinkSync(fullPath);
      }
    }
  }
}

function deleteDirectory(dir) {
  if (!existsSync(dir)) return;
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      deleteDirectory(fullPath);
    } else {
      // unlinkSync(fullPath);
    }
  }
  // rmdirSync(dir);
}

/**
 * 生成静态页面
 */
async function generateStaticPages(template) {
  console.log("\n📦 开始生成静态页面...\n");

  // 获取中英文数据
  console.log("🌐 从 CloudBase 获取数据...");
  const zhData = await fetchCloudbaseContent("zh");
  const enData = await fetchCloudbaseContent("en");
  console.log("✅ 数据获取完成\n");

  const locales = [
    { lang: "zh", data: zhData, prefix: "" },
    { lang: "en", data: enData, prefix: "/en" },
  ];

  for (const { lang, data, prefix } of locales) {
    console.log(`📝 生成 ${lang.toUpperCase()} 页面...`);

    // 首页
    const homeMeta = getSEOMeta("home", { copy: data }, lang);
    const homeContent = generatePageContent("home", { copy: data }, lang);
    const homeHTML = generateHTML(template, homeContent, {
      title: homeMeta.title,
      description: homeMeta.desc,
      lang,
      preloadData: { lang, copy: data, path: `${prefix}/` },
      path: `${prefix}/`,
    });
    const homeDir = path.join(distDir, prefix || ".");
    if (!existsSync(homeDir)) mkdirSync(homeDir, { recursive: true });
    writeFileSync(path.join(homeDir, "index.html"), homeHTML);
    console.log(`  ✓ ${prefix || "/"}index.html`);

    // 产品列表页
    const productsMeta = getSEOMeta("products", { copy: data }, lang);
    const productsContent = generatePageContent("products", { copy: data }, lang);
    const productsHTML = generateHTML(template, productsContent, {
      title: productsMeta.title,
      description: productsMeta.desc,
      lang,
      preloadData: { lang, copy: data, path: `${prefix}/products` },
      path: `${prefix}/products`,
    });
    const productsDir = path.join(distDir, prefix, "products");
    if (!existsSync(productsDir)) mkdirSync(productsDir, { recursive: true });
    writeFileSync(path.join(productsDir, "index.html"), productsHTML);
    console.log(`  ✓ ${prefix}/products/index.html`);

    // 产品详情页
    for (const product of data.products || []) {
      const productMeta = getSEOMeta("productDetail", { copy: data, product }, lang);
      const productContent = generatePageContent("productDetail", { copy: data, product }, lang);
      const productHTML = generateHTML(template, productContent, {
        title: productMeta.title,
        description: productMeta.desc,
        lang,
        preloadData: { 
          lang, 
          copy: data, 
          product,
          path: `${prefix}/products/${product.slug}` 
        },
        path: `${prefix}/products/${product.slug}`,
      });
      const productDir = path.join(distDir, prefix, "products", product.slug);
      if (!existsSync(productDir)) mkdirSync(productDir, { recursive: true });
      writeFileSync(path.join(productDir, "index.html"), productHTML);
    }
    console.log(`  ✓ ${prefix}/products/* (${data.products?.length || 0} 个产品)`);
  }

  console.log("\n✅ 静态页面生成完成\n");
  return { zhData, enData };
}

/**
 * 生成 sitemap.xml
 */
function generateSitemap(zhData, enData) {
  console.log("🗺️  生成 sitemap.xml...");

  const urls = [];
  const today = new Date().toISOString().split("T")[0];

  // 中文页面
  urls.push({ loc: `${SITE_URL}/`, lastmod: today, priority: "1.0" });
  urls.push({ loc: `${SITE_URL}/products`, lastmod: today, priority: "0.8" });
  
  for (const product of zhData.products || []) {
    urls.push({ 
      loc: `${SITE_URL}/products/${product.slug}`, 
      lastmod: today, 
      priority: "0.6" 
    });
  }

  // 英文页面
  urls.push({ loc: `${SITE_URL}/en/`, lastmod: today, priority: "0.9" });
  urls.push({ loc: `${SITE_URL}/en/products`, lastmod: today, priority: "0.7" });
  
  for (const product of enData.products || []) {
    urls.push({ 
      loc: `${SITE_URL}/en/products/${product.slug}`, 
      lastmod: today, 
      priority: "0.5" 
    });
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <priority>${u.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

  writeFileSync(path.join(distDir, "sitemap.xml"), sitemap);
  console.log("✅ sitemap.xml 生成完成\n");
}

/**
 * 生成 robots.txt
 */
function generateRobots() {
  console.log("🤖 生成 robots.txt...");
  
  const robots = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

  writeFileSync(path.join(distDir, "robots.txt"), robots);
  console.log("✅ robots.txt 生成完成\n");
}

/**
 * 复制数据文件供客户端 hydrate 使用
 */
function copyDataFiles(zhData, enData) {
  console.log("📋 复制数据文件...");
  
  const dataDir = path.join(distDir, "data");
  if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
  
  writeFileSync(
    path.join(dataDir, "content.zh.json"), 
    JSON.stringify({ copy: zhData, source: "ssg-static" }, null, 2)
  );
  writeFileSync(
    path.join(dataDir, "content.en.json"), 
    JSON.stringify({ copy: enData, source: "ssg-static" }, null, 2)
  );
  console.log("✅ 数据文件复制完成\n");
}

/**
 * 主函数
 */
async function main() {
  try {
    console.log("\n🚀 SSG 构建开始\n");
    console.log("=" .repeat(50));

    // 1. 先执行 Vite 构建
    console.log("\n📦 执行 Vite 构建...\n");
    execSync("npm run build", { 
      cwd: rootDir, 
      stdio: "inherit",
      env: { ...process.env, BASE_URL: "/" }
    });

    // 2. 提取 Vite 模板
    console.log("\n📄 提取 Vite 模板...");
    const template = extractViteTemplate();
    console.log("✅ 模板提取完成\n");

    // 3. 生成静态页面
    const { zhData, enData } = await generateStaticPages(template);

    // 4. 生成 SEO 文件
    generateSitemap(zhData, enData);
    generateRobots();

    // 5. 复制数据文件
    copyDataFiles(zhData, enData);

    console.log("=" .repeat(50));
    console.log("\n✨ SSG 构建完成！");
    console.log(`\n输出目录: ${distDir}`);
    console.log(`\n部署建议:`);
    console.log(`  - 将 ${distDir} 目录内容上传到静态托管服务`);
    console.log(`  - 确保所有路由都能访问到对应的 index.html`);
    console.log(`  - 配置重定向规则: /* -> /index.html (SPA fallback)`);
    console.log(`  - 测试所有页面能正确 hydrate（控制台无 hydration 错误）`);
    console.log("\n");

  } catch (error) {
    console.error("\n❌ SSG 构建失败:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
