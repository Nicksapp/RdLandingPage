import cloudbase from "@cloudbase/node-sdk";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

// 加载 .env.local 文件
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, "..", ".env.local");

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
  console.log("Loaded .env.local successfully");
} catch (error) {
  console.warn("Failed to load .env.local:", error.message);
}

const env = process.env.CLOUDBASE_ENV_ID ?? "tx-base-cloud-0giy45il8f83ce7e";
const accessKey = process.env.CLOUDBASE_ACCESS_KEY;

if (!accessKey) {
  console.error("Missing CLOUDBASE_ACCESS_KEY");
  process.exit(1);
}

const app = cloudbase.init({
  env,
  accessKey,
});

const db = app.database();

// 保留的分类（中英文）
const KEEP_CATEGORIES = ["红色沟槽管件", "衬塑产品", "Red Grooved Fittings", "Lined Products", "Lined Fittings"];
const KEEP_GROUP_IDS = ["red-grooved-fittings", "lined-grooved-fittings"];

async function cleanupProducts() {
  console.log("\n=== 清理产品数据 ===");
  
  // 获取所有产品
  const result = await db.collection("products").get();
  const allProducts = result.data || [];
  
  console.log(`总产品数: ${allProducts.length}`);
  
  // 找出需要删除的产品
  const toDelete = allProducts.filter(p => !KEEP_CATEGORIES.includes(p.category));
  console.log(`需要删除的产品: ${toDelete.length}`);
  
  // 删除不需要的产品
  for (const product of toDelete) {
    try {
      await db.collection("products").doc(product._id).remove();
      console.log(`  删除: ${product.title} (${product.category})`);
    } catch (error) {
      console.error(`  删除失败 ${product._id}:`, error.message);
    }
  }
  
  // 统计剩余产品
  const remaining = await db.collection("products").get();
  console.log(`剩余产品数: ${remaining.data?.length || 0}`);
}

async function cleanupProductGroups() {
  console.log("\n=== 清理产品组数据 ===");
  
  // 获取所有产品组
  const result = await db.collection("product_groups").get();
  const allGroups = result.data || [];
  
  console.log(`总产品组数: ${allGroups.length}`);
  
  // 找出需要删除的产品组
  const toDelete = allGroups.filter(g => !KEEP_GROUP_IDS.includes(g.groupId));
  console.log(`需要删除的产品组: ${toDelete.length}`);
  
  // 删除不需要的产品组
  for (const group of toDelete) {
    try {
      await db.collection("product_groups").doc(group._id).remove();
      console.log(`  删除: ${group.title} (${group.groupId})`);
    } catch (error) {
      console.error(`  删除失败 ${group._id}:`, error.message);
    }
  }
  
  // 统计剩余产品组
  const remaining = await db.collection("product_groups").get();
  console.log(`剩余产品组数: ${remaining.data?.length || 0}`);
}

async function main() {
  try {
    await cleanupProducts();
    await cleanupProductGroups();
    console.log("\n=== 清理完成 ===");
    process.exit(0);
  } catch (error) {
    console.error("清理失败:", error);
    process.exit(1);
  }
}

main();
